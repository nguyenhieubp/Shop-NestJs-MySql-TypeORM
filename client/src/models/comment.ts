interface User {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  avatar: string;
}

export interface CommentInTerface {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  orderLineId: string;
  ratting_value: number;
  comment: string;
  user: User;
}
