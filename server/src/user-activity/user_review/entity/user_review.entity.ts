import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { OrderLineEntity } from 'src/order/order_line/entity/order_line.entity';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_review' })
export class UserReviewEntity extends BaseDatabase {
  @Column('uuid')
  userId: SiteUserEntity;

  @Column('uuid')
  orderLineId: OrderLineEntity;

  @ManyToOne(() => SiteUserEntity, (user) => user.user_review)
  user: SiteUserEntity;

  @ManyToOne(() => OrderLineEntity, (order) => order.userReview, {
    onDelete: 'CASCADE',
  })
  orderLine: OrderLineEntity;

  @Column()
  ratting_value: number;

  @Column()
  comment: string;
}
