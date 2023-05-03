import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';

export class ProductCategoryDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  category_name: string;
}
