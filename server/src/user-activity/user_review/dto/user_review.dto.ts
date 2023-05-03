import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { OrderLineEntity } from 'src/order/order_line/entity/order_line.entity';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';

export class UserReviewDto extends BaseDto {
  @Expose()
  userId: SiteUserEntity;

  @Expose()
  @IsNotEmpty()
  orderLineId: OrderLineEntity;

  @Expose()
  ratting_value: number;

  @Expose()
  comment: string;
}
