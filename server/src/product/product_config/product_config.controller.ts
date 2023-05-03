import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ProductConfigService } from './product_config.service';
import { ProductConfigDto } from './dto/product_config.dto';
import { VariationDto } from '../variation/dto/variation.dto';
import { ProductDto } from '../product_item/dto/product.dto';

@Controller('api/v1/product-config')
export class ProductConfigController {
  constructor(private readonly productConfigService: ProductConfigService) {}

  @Get()
  getAllProductConfig(): Promise<ProductConfigDto[]> {
    return this.productConfigService.getAllProductConfig();
  }

  @Get('item')
  getItemProductConfig(@Body('id') id: string): Promise<ProductConfigDto> {
    return this.productConfigService.getItemProductConfig(id);
  }

  @Get('product')
  getItemProduct(
    @Query('id') id: string,
  ): Promise<{ product: ProductDto; variations: VariationDto[] } | string> {
    return this.productConfigService.getItemProduct(id);
  }

  @Post()
  createProductConfig(
    @Body() productConfig: ProductConfigDto,
  ): Promise<ProductConfigDto> {
    const productConfigReal = ProductConfigDto.plainToClass(productConfig);
    return this.productConfigService.createProductConfig(productConfigReal);
  }

  @Delete('productConfig/:id')
  deleteProductConfig(@Param('id') id: string): Promise<string> {
    return this.productConfigService.deleteProductConfig(id);
  }

  @Delete('variation/:id')
  deleteProductConfigByVariation(@Param('id') id: string): Promise<string> {
    return this.productConfigService.deleteProductConfigByVariation(id);
  }

  @Delete('product/:id')
  deleteProductConfigByProduct(@Param('id') id: string): Promise<string> {
    return this.productConfigService.deleteProductConfigByProduct(id);
  }
}
