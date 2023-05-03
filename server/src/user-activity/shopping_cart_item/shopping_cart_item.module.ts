import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShoppingCartItemService } from './shopping_cart_item.service';
import { ShoppingCartItemController } from './shopping_cart_item.controller';
import { ShoppingCartItemEntity } from './entity/shopping_cart_item.entity';

@Module({
  controllers: [ShoppingCartItemController],
  providers: [ShoppingCartItemService],
  imports: [TypeOrmModule.forFeature([ShoppingCartItemEntity])],
  exports: [ShoppingCartItemService],
})
export class ShoppingCartItemModule {}
