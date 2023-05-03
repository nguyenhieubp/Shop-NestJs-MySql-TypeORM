import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { OrderLineEntity } from 'src/order/order_line/entity/order_line.entity';
import { ProductEntity } from 'src/product/product_item/entity/product.entity';
import { VariationEntity } from 'src/product/variation/entity/variation.entity';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'product_config' })
export class ProductConfigEntity extends BaseDatabase {
  @Column('uuid')
  productId: ProductEntity;

  @Column('uuid')
  variationId: VariationEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productConfig)
  product: ProductEntity;

  @ManyToOne(() => VariationEntity, (variation) => variation.productConfig)
  variation: VariationEntity;

  @OneToMany(
    () => ShoppingCartItemEntity,
    (shopping_cart_item) => shopping_cart_item.product,
  )
  shopping_cart_item: ShoppingCartItemEntity[];

  @OneToMany(() => OrderLineEntity, (order_line) => order_line.productConfig)
  order_line: ShoppingCartItemEntity;
}
