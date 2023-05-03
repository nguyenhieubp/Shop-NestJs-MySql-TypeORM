import { Expose } from 'class-transformer';
import { BaseDto } from 'src/config/comon/baseDto';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';

export class ShoppingCartDto extends BaseDto {
  @Expose()
  userId: SiteUserEntity;
}
