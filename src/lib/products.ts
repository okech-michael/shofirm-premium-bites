import garri from "@/assets/garri.jpg";
import semo from "@/assets/semo.jpg";
import yam from "@/assets/yam.jpg";
import plantain from "@/assets/plantain.jpg";
import cassava from "@/assets/cassava.jpg";

export type Product = {
  slug: string;
  name: string;
  category: "Swallow" | "Flour" | "Specialty" | "Baby";
  short: string;
  description: string;
  image: string;
  benefits: string[];
};

export const products: Product[] = [
  {
    slug: "semo",
    name: "Semo",
    category: "Swallow",
    short: "Premium semolina swallow.",
    description:
      "Finely milled semolina that delivers a smooth, satisfying swallow. Sourced from quality wheat and processed under strict hygiene standards.",
    image: semo,
    benefits: ["Smooth texture", "Long shelf life", "Energy rich"],
  },
  {
    slug: "pupuru",
    name: "Pupuru",
    category: "Swallow",
    short: "Traditional fermented cassava.",
    description:
      "Authentic fermented cassava swallow with a rich earthy flavor — a southwestern Nigerian staple.",
    image: cassava,
    benefits: ["Authentic flavor", "Naturally fermented", "Gluten-free"],
  },
  {
    slug: "garri",
    name: "Garri",
    category: "Swallow",
    short: "Premium yellow garri.",
    description:
      "Sun-finished, palm-oil enriched garri with a fine grain and clean taste. Perfect for eba or as a snack.",
    image: garri,
    benefits: ["Fine grain", "Long lasting", "Rich color"],
  },
  {
    slug: "fufu-powder",
    name: "Fufu Powder",
    category: "Swallow",
    short: "Instant fufu, traditional taste.",
    description: "Convenient fufu powder that brings authentic flavor to your table in minutes.",
    image: cassava,
    benefits: ["Quick prep", "Authentic taste", "Stretchy texture"],
  },
  {
    slug: "cassava-flour",
    name: "Cassava Flour",
    category: "Flour",
    short: "Versatile gluten-free flour.",
    description:
      "Premium cassava flour for baking, swallow, and traditional dishes — naturally gluten-free.",
    image: cassava,
    benefits: ["Gluten-free", "Versatile", "Smooth blend"],
  },
  {
    slug: "plantain-flour",
    name: "Plantain Flour",
    category: "Flour",
    short: "Nutritious plantain swallow.",
    description:
      "Made from carefully selected unripe plantains for a low-sugar, fiber-rich swallow.",
    image: plantain,
    benefits: ["Low sugar", "High fiber", "Diabetic friendly"],
  },
  {
    slug: "yam-flour",
    name: "Yam Flour",
    category: "Flour",
    short: "Classic Amala flour.",
    description:
      "Stone-ground yam flour for that classic amala flavor — smooth, satisfying, and authentic.",
    image: yam,
    benefits: ["Authentic", "Rich aroma", "Smooth blend"],
  },
  {
    slug: "cocoyam-flour",
    name: "Cocoyam Flour",
    category: "Flour",
    short: "Smooth achicha flour.",
    description:
      "Premium cocoyam flour with a fine texture, ideal for soups and traditional swallow.",
    image: yam,
    benefits: ["Rich nutrients", "Fine texture", "Versatile"],
  },
  {
    slug: "sweet-potato-flour",
    name: "Sweet Potato Flour",
    category: "Specialty",
    short: "Naturally sweet, naturally nutritious.",
    description:
      "Sweet potato flour packed with vitamins — perfect for baking, porridge, and swallow.",
    image: yam,
    benefits: ["Vitamin A rich", "Natural sweetness", "Kid friendly"],
  },
  {
    slug: "pando-yam",
    name: "Pando Yam",
    category: "Specialty",
    short: "Premium pounded yam blend.",
    description: "Smooth pounded yam blend that delivers the traditional taste without the labor.",
    image: yam,
    benefits: ["Smooth texture", "Quick prep", "Traditional taste"],
  },
  {
    slug: "wheat-flour",
    name: "Wheat Flour",
    category: "Flour",
    short: "Premium milled wheat flour.",
    description: "High-quality wheat flour for swallow and culinary applications.",
    image: semo,
    benefits: ["High quality", "Fine mill", "Versatile"],
  },
  {
    slug: "baby-foods",
    name: "Baby Foods",
    category: "Baby",
    short: "Wholesome nutrition for little ones.",
    description:
      "Lovingly formulated baby foods made with premium ingredients and rigorous safety standards.",
    image: semo,
    benefits: ["Fortified", "Easy digest", "Safety certified"],
  },
];

export const productCategories = ["All", "Swallow", "Flour", "Specialty", "Baby"] as const;
