import { Module } from '@nestjs/common';
import { PromotionCategoryService } from './promotion_category.service';
import { PromotionCategoryController } from './promotion_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionCategoryEntity } from './entity/promotion_category.entity';

@Module({
  controllers: [PromotionCategoryController],
  providers: [PromotionCategoryService],
  imports: [TypeOrmModule.forFeature([PromotionCategoryEntity])],
})
export class PromotionCategoryModule {}
