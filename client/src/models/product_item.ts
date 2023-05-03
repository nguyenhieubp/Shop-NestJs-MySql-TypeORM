interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
}

export interface Product {
  id: string;
  created_at?: string;
  updated_at?: string;
  purchase: number;
  price: number;
  image: string;
  name: string;
  description?: string;
  categoryId?: string;
  category?: Category;
}
