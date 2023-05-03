import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { AddressEntity } from 'src/user/address/entity/address.entity';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';

export class ShopOrderDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  shippingAddressId: AddressEntity;

  @Expose()
  siteUserId: SiteUserEntity;
}
