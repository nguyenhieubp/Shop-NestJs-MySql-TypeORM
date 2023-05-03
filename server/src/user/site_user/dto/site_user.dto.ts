import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { AddressUserEntity } from 'src/user/address_user/entity/addressUser.entity';

export class SiteUserDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  phone: number;

  @Expose()
  @IsNotEmpty()
  addressUser: AddressUserEntity;
}
