import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OrderLineService } from './order_line.service';
import { OrderLineController } from './order_line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLineEntity } from './entity/order_line.entity';
import { ProductConfigModule } from 'src/product/product_config/product_config.module';
import { VariationModule } from 'src/product/variation/variation.module';
import { ProductModule } from 'src/product/product_item/product.module';
import { ShoppingCartItemModule } from 'src/user-activity/shopping_cart_item/shopping_cart_item.module';
import { ShoppingCartModule } from 'src/user-activity/shopping_cart/shopping_cart.module';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';
import { AuthMiddleware } from 'src/config/middlewares/middlewares.service';

@Module({
  controllers: [OrderLineController],
  providers: [OrderLineService],
  imports: [
    TypeOrmModule.forFeature([
      OrderLineEntity,
      ProductConfigEntity,
      ShoppingCartItemEntity,
    ]),
    VariationModule,
    ProductModule,
    ShoppingCartItemModule,
    ProductConfigModule,
  ],
})
export class OrderLineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/order-line');
  }
}
