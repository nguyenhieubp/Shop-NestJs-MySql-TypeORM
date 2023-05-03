import { ShoppingCartItemService } from './../../user-activity/shopping_cart_item/shopping_cart_item.service';
import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Body,
  Post,
  Req,
} from '@nestjs/common';
import { OrderLineService } from './order_line.service';
import { OrderLineDto } from './dto/order_line.dto';
import { ProductConfigService } from 'src/product/product_config/product_config.service';
import { VariationService } from 'src/product/variation/variation.service';
import { ProductEntity } from 'src/product/product_item/entity/product.entity';
import { ProductService } from 'src/product/product_item/product.service';

@Controller('api/v1/order-line')
export class OrderLineController {
  constructor(
    private readonly orderLineService: OrderLineService,
    private readonly shoppingCartItemService: ShoppingCartItemService,
    private readonly variationService: VariationService,
    private readonly productConfig: ProductConfigService,
  ) {}

  @Get('user')
  getAllOrder() {
    return this.orderLineService.getAllOrder();
  }

  @Get('user')
  getByShopOrder(@Req() req: any) {
    return this.orderLineService.getByShopOrder(req);
  }

  @Post()
  async createOrderLine(@Body() orderLine: OrderLineDto) {
    return this.orderLineService.createOrderLine(orderLine);
  }

  @Put(':id')
  async confirmOrderLine(@Param('id') id: string) {
    return this.orderLineService.confirmOrder(id);
  }

  @Delete('delete/:id')
  deleteOrderLine(@Param('id') id: string) {
    return this.orderLineService.deleteOrderLine(id);
  }
}
