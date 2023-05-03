import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { ShoppingCartEntity } from 'src/user-activity/shopping_cart/entity/shopping_cart.entity';

export class ShoppingCartItemDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  shoppingCartId: ShoppingCartEntity;

  @Expose()
  @IsNotEmpty()
  productId: ProductConfigEntity;

  @Expose()
  @IsNotEmpty()
  quantity: number;
}
