import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';

export class VariationDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  nameProduct: string;

  @Expose()
  @IsNotEmpty()
  size: string;

  @Expose()
  @IsNotEmpty()
  nameVariation: string;

  @Expose()
  @IsNotEmpty()
  quantity: number;

  @Expose()
  @IsNotEmpty()
  product_image: string;

  @Expose()
  @IsNotEmpty()
  price: number;
}
