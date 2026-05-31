export type Category = {
  slug: string;
  name: string;
  description?: string;
};

export type Gender = "kiz" | "erkek" | "unisex";

export const GENDER_LABELS: Record<Gender, string> = {
  kiz: "Kız",
  erkek: "Erkek",
  unisex: "Unisex",
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string; // category slug
  stock: number;
  sizes: string[]; // age/size options, e.g. "0-3 ay", "2 yaş", "5-6 yaş"
  gender: Gender;
  featured?: boolean;
  createdAt: string;
};
