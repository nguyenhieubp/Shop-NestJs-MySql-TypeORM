import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Delete,
  Request,
  Req,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { SiteUserDto } from 'src/user/site_user/dto/site_user.dto';
import { ShoppingCartDto } from './dto/shopping_cart.dto';

@Controller('api/v1/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  getAllShoppingCart(): Promise<ShoppingCartDto[]> {
    return this.shoppingCartService.getAllShoppingCart();
  }

  @Get('item/:id')
  getItemShoppingCart(@Param('id') id: string): Promise<ShoppingCartDto> {
    return this.shoppingCartService.getItemShoppingCart(id);
  }

  @Get('user')
  getUserShoppingCart(@Req() req): Promise<ShoppingCartDto> {
    return this.shoppingCartService.getUserShoppingCart(req.user.id);
  }

  @Post()
  createShoppingCart(
    @Req() req: any,
    @Body() shoppingCartDto: ShoppingCartDto,
  ): Promise<ShoppingCartDto> {
    const shoppingCartReal = ShoppingCartDto.plainToClass({
      ...shoppingCartDto,
      userId: req.user.id,
    });
    return this.shoppingCartService.createShoppingCart(shoppingCartReal);
  }
}
