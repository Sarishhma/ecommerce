export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  inStock: boolean;
  artisan: string;
  origin: string;
  materials: string[];
  dimensions?: string;
  weight?: string;
  features: string[];
  tags: string[];
}

export interface Collection {
  name: string;
  slug: string;
  count: string;
  image: string;
  blurb: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
  avatar: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content?: string;
  date: string;
}

export interface CraftStep {
  icon: string;
  step: string;
  title: string;
  text: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
}
