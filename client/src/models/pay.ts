export interface CreateOrderLine {
  status: string;
  id: string;
}

interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  productId: string;
  variationId: string;
  variation: Variation;
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

interface ShoppingCart {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
}

export interface ProductOrderLine {
  id: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  shoppingCartId: string;
  productId: string;
  shopping_cart: ShoppingCart;
  product: Product;
}
