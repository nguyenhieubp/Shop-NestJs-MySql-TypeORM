import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { ProductCategoryEntity } from 'src/product/product_category/entity/product_category.entity';

export class ProductDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  categoryId: ProductCategoryEntity;

  @Expose()
  @IsNotEmpty()
  price: number;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  image: string;

  @Expose()
  @IsNotEmpty()
  description: string;
}
