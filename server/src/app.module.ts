import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteUserModule } from './user/site_user/site_user.module';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './config/database/database.module';
import { AddressUserModule } from './user/address_user/address_user.module';
import { AddressModule } from './user/address/address.module';
import { UserReviewModule } from './user-activity/user_review/user_review.module';
import { PromotionModule } from './product/promotion/promotion.module';
import { PromotionCategoryModule } from './product/promotion_category/promotion_category.module';
import { ProductCategoryModule } from './product/product_category/product_category.module';
import { ProductModule } from './product/product_item/product.module';
import { ShopOrderModule } from './order/shop_order/shop_order.module';
import { OrderLineModule } from './order/order_line/order_line.module';
import { ShoppingCartModule } from './user-activity/shopping_cart/shopping_cart.module';
import { ShoppingCartItemModule } from './user-activity/shopping_cart_item/shopping_cart_item.module';
import { PassportModule } from '@nestjs/passport';
import { ProductConfigModule } from './product/product_config/product_config.module';
import { VariationModule } from './product/variation/variation.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    SiteUserModule,
    AddressUserModule,
    AddressModule,
    UserReviewModule,
    PromotionModule,
    PromotionCategoryModule,
    ProductCategoryModule,
    ProductModule,
    ShopOrderModule,
    OrderLineModule,
    ShoppingCartModule,
    ShoppingCartItemModule,
    ProductConfigModule,
    VariationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
