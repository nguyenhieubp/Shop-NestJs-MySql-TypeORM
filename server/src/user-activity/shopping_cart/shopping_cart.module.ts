import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartController } from './shopping_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartEntity } from './entity/shopping_cart.entity';
import { AuthMiddleware } from 'src/config/middlewares/middlewares.service';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  imports: [TypeOrmModule.forFeature([ShoppingCartEntity])],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/shopping-cart');
  }
}
