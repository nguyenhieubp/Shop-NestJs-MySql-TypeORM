import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDto } from 'src/config/comon/baseDto';

export class AddressDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  address_line: string;

  @Expose()
  @IsNotEmpty()
  street: string;

  @Expose()
  @IsNotEmpty()
  district: string;

  @Expose()
  @IsNotEmpty()
  city: string;
}
