import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { ShoppingCartEntity } from 'src/user-activity/shopping_cart/entity/shopping_cart.entity';
import { ManyToOne, Entity, Column } from 'typeorm';

@Entity({ name: 'shopping_cart_item' })
export class ShoppingCartItemEntity extends BaseDatabase {
  @Column()
  quantity: number;

  @Column('uuid')
  shoppingCartId: ShoppingCartEntity;

  @ManyToOne(
    () => ShoppingCartEntity,
    (shoppingCart) => shoppingCart.shopping_cart_item,
  )
  shopping_cart: ShoppingCartEntity;

  @Column('uuid')
  productId: ProductConfigEntity;

  @ManyToOne(
    () => ProductConfigEntity,
    (productConfig) => productConfig.shopping_cart_item,
  )
  product: ProductConfigEntity;
}
