import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { ProductDto } from './dto/product.dto';

@Controller('api/v1/product-item')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('ok')
  async hello(@Req() req: any) {
    return req.user.id + 'ggggg';
  }

  @Get()
  async getAllProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request,
  ): Promise<ProductEntity[]> {
    return this.productService.getAllProduct(page, limit);
  }

  @Get('item/:id')
  getItemProduct(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.getItemProduct(id);
  }

  @Get('getByCategory')
  getProductByCategory(
    @Query('category') category: string,
  ): Promise<ProductDto[]> {
    return this.productService.getProductByCategory(category);
  }

  @Get('getByName')
  getProductByName(@Query('name') name: string): Promise<ProductDto[]> {
    return this.productService.getProductByName(name);
  }

  @Get('sortByPriceIncrement')
  getSortByPrice(): Promise<ProductDto[]> {
    return this.productService.getSortByPriceIncrement();
  }

  @Get('sortByPriceDecrement')
  getSortByPriceDecrement(): Promise<ProductDto[]> {
    return this.productService.getSortByPriceDecrement();
  }

  @Get('sortByDate')
  getByDate(): Promise<ProductDto[]> {
    return this.productService.getByDate();
  }

  @Get('sortPurchase')
  getByIncrementPurchase() {
    return this.productService.getByPurchase();
  }

  @Get('search')
  search(@Query('search') valueSearch: string): Promise<ProductDto[]> {
    return this.productService.search(valueSearch);
  }

  @Post()
  addProduct(@Body() product: ProductDto): Promise<ProductEntity> {
    const productReal = ProductDto.plainToClass(product);
    return this.productService.addProduct(productReal);
  }

  @Put('update/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() product: any,
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, product);
  }

  @Put('purchase/:id')
  purchaseProduct(
    @Param('id') id: string,
    @Body('purchase') numberPurchase: number,
  ): Promise<ProductDto> {
    return this.productService.purchaseProduct(id, numberPurchase);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<string> {
    return this.productService.deleteProduct(id);
  }
}
