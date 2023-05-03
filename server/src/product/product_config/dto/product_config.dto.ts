import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { ProductEntity } from 'src/product/product_item/entity/product.entity';
import { VariationEntity } from 'src/product/variation/entity/variation.entity';

export class ProductConfigDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  productId: ProductEntity;

  @Expose()
  @IsNotEmpty()
  variationId: VariationEntity;
}
