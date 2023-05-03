import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { ProductCategoryDto } from './dto/product_category.dto';
import { ProductCategoryEntity } from './entity/product_category.entity';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
})
export class ProductCategoryModule {}
