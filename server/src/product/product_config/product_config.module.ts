import { Module } from '@nestjs/common';
import { ProductConfigService } from './product_config.service';
import { ProductConfigController } from './product_config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConfigEntity } from './entity/product_config.entity';

@Module({
  controllers: [ProductConfigController],
  providers: [ProductConfigService],
  imports: [TypeOrmModule.forFeature([ProductConfigEntity])],
  exports: [ProductConfigService],
})
export class ProductConfigModule {}
