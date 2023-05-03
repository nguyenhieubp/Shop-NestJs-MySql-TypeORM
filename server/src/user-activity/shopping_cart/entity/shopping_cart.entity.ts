import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'shopping_cart' })
export class ShoppingCartEntity extends BaseDatabase {
  @Column('uuid')
  userId: SiteUserEntity;

  @ManyToOne(() => SiteUserEntity, (user) => user.shopping_cart)
  user: SiteUserEntity;

  @OneToMany(
    () => ShoppingCartItemEntity,
    (shoppingCartItem) => shoppingCartItem.shopping_cart,
  )
  shopping_cart_item: ShoppingCartItemEntity[];
}
