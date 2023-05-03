import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ProductEntity } from 'src/product/product_item/entity/product.entity';
import { PromotionCategoryEntity } from 'src/product/promotion_category/entity/promotion_category.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'product_category' })
export class ProductCategoryEntity extends BaseDatabase {
  @Column()
  category_name: string;

  @OneToMany(
    () => PromotionCategoryEntity,
    (promotionCategory) => promotionCategory,
  )
  promotion_categories: PromotionCategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
