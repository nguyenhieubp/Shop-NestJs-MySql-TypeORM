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

interface Variation {
  id: string;
  created_at: string;
  updated_at: string;
  nameProduct: string;
  size: string;
  nameVariation: string;
  quantity: number;
  product_image: string;
  price: number;
}

export interface Purchase {
  id: string;
  created_at: string;
  updated_at: string;
  productId: string;
  variationId: string;
  product: Product;
  variation: Variation;
}
