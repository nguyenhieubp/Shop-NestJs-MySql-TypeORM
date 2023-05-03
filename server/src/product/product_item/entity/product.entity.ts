import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ProductCategoryEntity } from 'src/product/product_category/entity/product_category.entity';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity extends BaseDatabase {
  @Column({ default: 0 })
  purchase: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('uuid')
  categoryId: ProductCategoryEntity;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  category: ProductCategoryEntity;

  @OneToMany(
    () => ProductConfigEntity,
    (productConfig) => productConfig.product,
    {
      onDelete: 'CASCADE',
    },
  )
  productConfig: ProductConfigEntity[];
}
