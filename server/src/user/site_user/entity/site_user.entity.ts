import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ShopOrderEntity } from 'src/order/shop_order/entity/shop_order.entity';
import { ShoppingCartEntity } from 'src/user-activity/shopping_cart/entity/shopping_cart.entity';
import { UserReviewEntity } from 'src/user-activity/user_review/entity/user_review.entity';
import { AddressUserEntity } from 'src/user/address_user/entity/addressUser.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'site_users' })
export class SiteUserEntity extends BaseDatabase {
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 0 })
  phone: number;

  @Column({
    type: 'varchar',
    default: '',
  })
  avatar: string;

  @OneToMany(() => AddressUserEntity, (addressUser) => addressUser.site_user)
  addressUser: AddressUserEntity[];

  @OneToMany(() => UserReviewEntity, (userReview) => userReview.user)
  user_review: UserReviewEntity[];

  @OneToMany(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.user)
  shopping_cart: ShoppingCartEntity[];

  @OneToMany(() => ShopOrderEntity, (shopOrder) => shopOrder.site_user)
  shop_order: ShopOrderEntity[];
}
