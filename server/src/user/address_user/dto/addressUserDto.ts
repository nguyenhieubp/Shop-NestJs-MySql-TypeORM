import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDto } from 'src/config/comon/baseDto';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';
import { AddressEntity } from 'src/user/address/entity/address.entity';

export class AddressUserDto extends BaseDto {
  @Expose()
  siteUserId: SiteUserEntity;

  @Expose()
  @IsNotEmpty()
  addressId: AddressEntity;
}
