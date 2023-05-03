import { Column, Entity, OneToMany } from 'typeorm';
import { BaseDatabase } from './../../../config/comon/baseDatabase';
import { AddressUserEntity } from 'src/user/address_user/entity/addressUser.entity';
import { ShopOrderEntity } from 'src/order/shop_order/entity/shop_order.entity';

@Entity({ name: 'address' })
export class AddressEntity extends BaseDatabase {
  @Column()
  address_line: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @OneToMany(() => AddressUserEntity, (addressUser) => addressUser.address)
  addressUser: AddressUserEntity[];

  @OneToMany(() => ShopOrderEntity, (shopOrder) => shopOrder.shipping_address)
  shop_order: ShopOrderEntity[];
}
