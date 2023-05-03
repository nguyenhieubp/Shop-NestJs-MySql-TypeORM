import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShopOrderService } from './shop_order.service';
import { ShopOrderController } from './shop_order.controller';
import { ShopOrderEntity } from './entity/shop_order.entity';
import { AuthMiddleware } from 'src/config/middlewares/middlewares.service';

@Module({
  controllers: [ShopOrderController],
  providers: [ShopOrderService],
  imports: [TypeOrmModule.forFeature([ShopOrderEntity])],
})
export class ShopOrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/shop-order');
  }
}
