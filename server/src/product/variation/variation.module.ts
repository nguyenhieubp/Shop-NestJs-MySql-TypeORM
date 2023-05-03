import { Module } from '@nestjs/common';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationEntity } from './entity/variation.entity';

@Module({
  controllers: [VariationController],
  providers: [VariationService],
  imports: [TypeOrmModule.forFeature([VariationEntity])],
  exports: [VariationService],
})
export class VariationModule {}
