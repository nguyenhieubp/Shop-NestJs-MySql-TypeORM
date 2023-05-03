import { VariationService } from './../../product/variation/variation.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLineEntity } from './entity/order_line.entity';
import { Repository } from 'typeorm';
import { OrderLineDto } from './dto/order_line.dto';
import { ProductConfigService } from 'src/product/product_config/product_config.service';
import { ShoppingCartItemService } from 'src/user-activity/shopping_cart_item/shopping_cart_item.service';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLineEntity)
    private readonly orderLineRepository: Repository<OrderLineEntity>,
    @InjectRepository(ProductConfigEntity)
    private readonly productConfigRepository: Repository<ProductConfigEntity>,
    @InjectRepository(ShoppingCartItemEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartItemEntity>,
    private readonly shoppingCartItemService: ShoppingCartItemService,
    private readonly variationService: VariationService,
    private readonly productConfig: ProductConfigService,
  ) {}

  public async getAllOrder() {
    return this.orderLineRepository
      .createQueryBuilder('order_line')
      .leftJoinAndSelect('order_line.shop_order', 'shop_order')
      .leftJoinAndSelect('shop_order.site_user', 'site_user')
      .leftJoinAndSelect('order_line.productConfig', 'productConfig')
      .leftJoinAndSelect('productConfig.variation', 'variation')
      .leftJoinAndSelect('shop_order.shipping_address', 'shipping_address')
      .getMany();
  }

  public async getByShopOrder(req: any) {
    return this.orderLineRepository
      .createQueryBuilder('order_line')
      .leftJoinAndSelect('order_line.shop_order', 'shop_order')
      .leftJoinAndSelect('shop_order.site_user', 'site_user')
      .leftJoinAndSelect('order_line.productConfig', 'productConfig')
      .leftJoinAndSelect('productConfig.variation', 'variation')
      .where('site_user.id = :id AND order_line.isConfirm = false', {
        id: req.user.id,
      })
      .getMany();
  }

  public async createOrderLine(orderLine: OrderLineDto) {
    try {
      const shoppingCartId = orderLine.shoppingCartId;
      const products =
        await this.shoppingCartItemService.getCartItemByShoppingCart(
          shoppingCartId.toString(),
        );

      const quantity = products.map((item) => item.quantity);

      const productId = await Promise.all(
        products.map((product) => {
          return this.productConfig.getItemProductConfig(
            product.productId.toString(),
          );
        }),
      );
      const variations = productId.map((variation) => variation.variationId);

      const result = quantity.map((quantity, index) => ({
        quantity,
        variation: variations[index],
      }));

      await Promise.all(
        result.map((item) => {
          return this.variationService.decrementQuantity(
            item.variation.toString(),
            item.quantity,
          );
        }),
      );

      const orderLines = await Promise.all(
        products.map((item) => {
          return this.orderLineRepository.save({
            shopOrderId: orderLine.shopOrderId,
            productConfigId: item.productId,
            quantity: item.quantity,
          });
        }),
      );

      await Promise.all(
        orderLines.map((item) => this.orderLineRepository.save(item)),
      );
      // await this.orderLineRepository.save(orderLine);

      return { message: 'success', products: products.map((item) => item.id) };
    } catch (error) {
      return error;
    }
  }

  public async confirmOrder(id: string) {
    await this.orderLineRepository.update(id, { isConfirm: true });
  }

  public async deleteOrderLine(id: string) {
    await this.orderLineRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
