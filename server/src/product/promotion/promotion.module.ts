import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './entity/promotion.entity';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService],
  imports: [TypeOrmModule.forFeature([PromotionEntity])],
})
export class PromotionModule {}
