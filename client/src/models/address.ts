export interface Address {
  id: string;
  created_at: Date;
  updated_at: Date;
  addressId: string;
  siteUserId: string;
  address: AddressClass;
  site_user: SiteUser;
}

export interface AddressClass {
  id: string;
  created_at: Date;
  updated_at: Date;
  address_line: string;
  street: string;
  district: string;
  city: string;
}

export interface SiteUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  avatar: string;
}
