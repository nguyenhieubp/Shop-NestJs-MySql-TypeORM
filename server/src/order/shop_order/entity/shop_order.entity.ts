import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { OrderLineEntity } from 'src/order/order_line/entity/order_line.entity';
import { AddressEntity } from 'src/user/address/entity/address.entity';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'shop_order' })
export class ShopOrderEntity extends BaseDatabase {
  @Column('uuid')
  shippingAddressId: AddressEntity;

  @Column('uuid')
  siteUserId: SiteUserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.shop_order)
  shipping_address: AddressEntity;

  @ManyToOne(() => SiteUserEntity, (user) => user.shop_order)
  site_user: SiteUserEntity;

  @OneToMany(() => OrderLineEntity, (order) => order.shop_order)
  order_line: OrderLineEntity[];
}
