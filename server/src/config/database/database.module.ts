import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/user/address/entity/address.entity';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';
import * as dotenv from 'dotenv';
import { AddressUserEntity } from 'src/user/address_user/entity/addressUser.entity';
import { UserReviewEntity } from 'src/user-activity/user_review/entity/user_review.entity';
import { PromotionEntity } from 'src/product/promotion/entity/promotion.entity';
import { ProductCategoryEntity } from 'src/product/product_category/entity/product_category.entity';
import { PromotionCategoryEntity } from 'src/product/promotion_category/entity/promotion_category.entity';
import { ProductEntity } from 'src/product/product_item/entity/product.entity';
import { VariationEntity } from 'src/product/variation/entity/variation.entity';
import { ShopOrderEntity } from 'src/order/shop_order/entity/shop_order.entity';
import { OrderLineEntity } from 'src/order/order_line/entity/order_line.entity';
import { ShoppingCartEntity } from 'src/user-activity/shopping_cart/entity/shopping_cart.entity';
import { ShoppingCartItemEntity } from 'src/user-activity/shopping_cart_item/entity/shopping_cart_item.entity';
import { ProductConfigEntity } from 'src/product/product_config/entity/product_config.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.NAME_DATABASE,
      entities: [
        SiteUserEntity,
        AddressEntity,
        AddressUserEntity,
        UserReviewEntity,
        PromotionEntity,
        ProductCategoryEntity,
        PromotionCategoryEntity,
        ProductEntity,
        VariationEntity,
        ShopOrderEntity,
        OrderLineEntity,
        ShoppingCartEntity,
        ShoppingCartItemEntity,
        ProductConfigEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
