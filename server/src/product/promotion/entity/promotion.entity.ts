import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { PromotionCategoryEntity } from 'src/product/promotion_category/entity/promotion_category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promotion' })
export class PromotionEntity extends BaseDatabase {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  discount_rate: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToMany(
    () => PromotionCategoryEntity,
    (promotionCategory) => promotionCategory.promotion,
  )
  promotion_categories: PromotionCategoryEntity[];
}
