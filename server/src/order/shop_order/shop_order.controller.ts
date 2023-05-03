import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { ShopOrderService } from './shop_order.service';
import { ShopOrderDto } from './dto/shop_order.dto';

@Controller('api/v1/shop-order')
export class ShopOrderController {
  constructor(private readonly shopOrderService: ShopOrderService) {}

  @Post()
  createShopOrder(
    @Body() shopOrder: ShopOrderDto,
    @Req() req: any,
  ): Promise<ShopOrderDto> {
    const shopOrderReal = ShopOrderDto.plainToClass({
      ...shopOrder,
      siteUserId: req.user.id,
    });
    return this.shopOrderService.createShopOrder(shopOrderReal);
  }

  @Get()
  getAllShopOrder(): Promise<ShopOrderDto[]> {
    return this.shopOrderService.getAllShopOrder();
  }

  @Get('user/:id')
  getItemShopOrder(@Param('id') id: string): Promise<ShopOrderDto> {
    return this.shopOrderService.getItemShopOrder(id);
  }

  @Put('update/:id')
  updateShopOrder(
    @Param('id') id: string,
    @Body() shopOrder: any,
  ): Promise<ShopOrderDto> {
    return this.shopOrderService.updateShopOrder(id, shopOrder);
  }

  @Delete('delete/:id')
  deleteShopOrder(@Param('id') id: string): Promise<string> {
    return this.shopOrderService.deleteShopOrder(id);
  }
}
