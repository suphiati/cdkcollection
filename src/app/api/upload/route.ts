import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { isAuthenticatedFromCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "products");

  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
  } catch {
    return NextResponse.json(
      { error: "Yüklenemedi (dosya sistemi salt okunur olabilir)" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/products/${filename}` });
}
