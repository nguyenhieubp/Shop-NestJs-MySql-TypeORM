import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ShopOrderEntity } from 'src/order/shop_order/entity/shop_order.entity';
import { UserReviewEntity } from 'src/user-activity/user_review/entity/user_review.entity';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';
import { ShoppingCartEntity } from 'src/user-activity/shopping_cart/entity/shopping_cart.entity';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';

@Entity({ name: 'order_line' })
export class OrderLineEntity extends BaseDatabase {
  @Column({ default: false })
  isConfirm: boolean;

  @Column('uuid')
  shopOrderId: ShopOrderEntity;

  @Column('uuid')
  productConfigId: ProductConfigEntity;

  @Column()
  quantity: number;

  @ManyToOne(() => ShopOrderEntity, (order) => order.order_line, {
    onDelete: 'CASCADE',
  })
  shop_order: ShopOrderEntity;

  @ManyToOne(
    () => ProductConfigEntity,
    (productConfig) => productConfig.order_line,
  )
  productConfig: ProductConfigEntity;

  @OneToMany(() => UserReviewEntity, (userReview) => userReview.orderLine)
  userReview: UserReviewEntity;
}
