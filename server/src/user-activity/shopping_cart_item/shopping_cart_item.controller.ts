import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingCartItemService } from './shopping_cart_item.service';
import { ShoppingCartItemDto } from './dto/shopping_cart_item.dto';

@Controller('api/v1/shopping-cart-item')
export class ShoppingCartItemController {
  constructor(
    private readonly shoppingCartItemService: ShoppingCartItemService,
  ) {}

  @Get('shoppingCart/:id')
  getCartItemByShoppingCart(
    @Param('id') id: string,
  ): Promise<ShoppingCartItemDto[]> {
    return this.shoppingCartItemService.getCartItemByShoppingCart(id);
  }

  @Delete('emptyCart/:id')
  emptyShoppingCart(@Param('id') id: string) {
    return this.shoppingCartItemService.emptyShoppingCart(id);
  }

  @Post()
  createCartItem(
    @Body() cartItem: ShoppingCartItemDto,
  ): Promise<ShoppingCartItemDto> {
    const cartItemReal = ShoppingCartItemDto.plainToClass(cartItem);
    return this.shoppingCartItemService.createCartItem(cartItemReal);
  }

  @Put('increment/changeQuantity/:id')
  updateIncrementQuantityCartItem(
    @Param('id') id: string,
    @Body('numberUpPurchase') numberUpPurchase: number,
  ): Promise<ShoppingCartItemDto> {
    return this.shoppingCartItemService.updateIncrementQuantityCartItem(
      id,
      numberUpPurchase,
    );
  }

  @Put('decrement/changeQuantity/:id')
  updateDecrementQuantityCartItem(
    @Param('id') id: string,
    @Body('numberDownPurchase') numberDownPurchase: number,
  ): Promise<ShoppingCartItemDto> {
    return this.shoppingCartItemService.updateDecrementQuantityCartItem(
      id,
      numberDownPurchase,
    );
  }

  @Delete('productItem/:id')
  deleteCartItem(@Param('id') id: string): Promise<string> {
    return this.shoppingCartItemService.deleteCartItem(id);
  }
}
