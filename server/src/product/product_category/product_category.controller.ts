import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryDto } from './dto/product_category.dto';

@Controller('api/v1/product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  addProductCategory(
    @Body() productCategory: ProductCategoryDto,
  ): Promise<ProductCategoryDto> {
    const productCategoryReal = productCategory;
    return this.productCategoryService.addProductCategory(productCategoryReal);
  }

  @Get()
  getAllProductCategory(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ProductCategoryDto[]> {
    return this.productCategoryService.getAllProductCategory();
  }

  @Get(':id')
  getItemProductCategory(@Param('id') id: string): Promise<ProductCategoryDto> {
    return this.productCategoryService.getItemProductCategory(id);
  }

  @Put(':id')
  updateProductCategory(
    @Param('id') id: string,
    @Body() productCategory: any,
  ): Promise<ProductCategoryDto> {
    return this.productCategoryService.updateProductCategory(
      id,
      productCategory,
    );
  }

  @Delete(':id')
  deleteProductCategory(@Param('id') id: string): Promise<string> {
    return this.productCategoryService.deleteProductCategory(id);
  }
}
