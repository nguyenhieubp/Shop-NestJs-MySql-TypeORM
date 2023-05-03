interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  purchase: number;
  price: number;
  image: string;
  name: string;
  description: string;
  categoryId: string;
}

export interface Variation {
  id: string;
  created_at: string;
  updated_at: string;
  nameVariation: string;
  quantity: number;
  product_image: string;
  price: number;
  size: string;
}

export interface ProductWithVariations {
  product: Product;
  variations: Variation[];
}
