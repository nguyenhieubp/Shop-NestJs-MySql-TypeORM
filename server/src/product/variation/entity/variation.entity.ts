import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'variation' })
export class VariationEntity extends BaseDatabase {
  @Column()
  nameProduct: string;

  @Column()
  size: string;

  @Column()
  nameVariation: string;

  @Column()
  quantity: number;

  @Column()
  product_image: string;

  @Column()
  price: number;

  @OneToMany(
    () => ProductConfigEntity,
    (productConfig) => productConfig.variation,
  )
  productConfig: ProductConfigEntity[];
}
