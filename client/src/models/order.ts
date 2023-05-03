export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  isConfirm: boolean;
  shopOrderId: string;
  productConfigId: string;
  quantity: number;
  shop_order: Shoporder;
  productConfig: ProductConfig;
}

interface ProductConfig {
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

interface Shoporder {
  id: string;
  created_at: string;
  updated_at: string;
  shippingAddressId: string;
  siteUserId: string;
  site_user: Siteuser;
  shipping_address: Address;
}

interface Siteuser {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  avatar: string;
}

interface Address {
  id: string;
  created_at: string;
  updated_at: string;
  address_line: string;
  street: string;
  district: string;
  city: string;
}
