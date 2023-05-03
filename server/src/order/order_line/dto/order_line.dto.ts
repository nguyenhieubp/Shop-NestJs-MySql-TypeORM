import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { ShopOrderEntity } from 'src/order/shop_order/entity/shop_order.entity';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { ShoppingCartEntity } from 'src/user-activity/shopping_cart/entity/shopping_cart.entity';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';

export class OrderLineDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  shoppingCartId: ShoppingCartEntity;

  @Expose()
  @IsNotEmpty()
  shopOrderId: ShopOrderEntity;
}
