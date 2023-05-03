export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  avatar: string;
}

export interface UserRecord {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  user: User;
}

interface ShoppingCart {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
}

export interface ProductVariation {
  id: string;
  created_at: string;
  updated_at: string;
  size: string;
  nameVariation: string;
  quantity: number;
  product_image: string;
  price: number;
  nameProduct: string;
}

interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  productId: string;
  variationId: string;
  variation: ProductVariation;
}

export interface ShoppingCartItem {
  id: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  shoppingCartId: string;
  productId: string;
  shopping_cart: ShoppingCart;
  product: Product;
}

export interface ProductUpdate {
  id: string;
  created_at: Date;
  updated_at: Date;
  quantity: number;
  shoppingCartId: string;
  productId: string;
}
