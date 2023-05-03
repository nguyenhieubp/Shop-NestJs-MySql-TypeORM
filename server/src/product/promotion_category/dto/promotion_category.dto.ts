import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { ProductCategoryEntity } from 'src/product/product_category/entity/product_category.entity';
import { PromotionEntity } from 'src/product/promotion/entity/promotion.entity';
import { Entity } from 'typeorm';

export class PromotionCategoryDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  promotionId: PromotionEntity;

  @Expose()
  @IsNotEmpty()
  categoryId: ProductCategoryEntity;
}
