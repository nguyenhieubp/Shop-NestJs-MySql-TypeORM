import { Expose } from 'class-transformer';
import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ProductCategoryDto } from 'src/product/product_category/dto/product_category.dto';
import { ProductCategoryEntity } from 'src/product/product_category/entity/product_category.entity';
import { PromotionEntity } from 'src/product/promotion/entity/promotion.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'promotion_category' })
export class PromotionCategoryEntity extends BaseDatabase {
  @Column('uuid')
  promotionId: PromotionEntity;

  @Column('uuid')
  categoryId: ProductCategoryEntity;

  @ManyToOne(
    () => PromotionEntity,
    (promotion) => promotion.promotion_categories,
  )
  promotion: PromotionEntity;

  @ManyToOne(
    () => ProductCategoryEntity,
    (productCategory) => productCategory.promotion_categories,
  )
  category: ProductCategoryEntity;
}
