import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { VariationService } from './variation.service';
import { VariationDto } from './dto/variation.dto';

@Controller('api/v1/variation')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post()
  addVariation(@Body() variation: VariationDto): Promise<VariationDto> {
    const variationReal = VariationDto.plainToClass(variation);
    return this.variationService.addVariation(variationReal);
  }

  @Get()
  getAllVariation(): Promise<VariationDto[]> {
    return this.variationService.getAllVariation();
  }

  @Get('item/:id')
  getItemVariation(@Param('id') id: string): Promise<VariationDto> {
    return this.variationService.getItemVariation(id);
  }

  @Put('updateValue/:id')
  updateVariation(
    @Param('id') id: string,
    @Body() variation: any,
  ): Promise<VariationDto> {
    return this.variationService.updateVariation(id, variation);
  }

  @Put('decrementQuantity/:id')
  decrementQuantity(
    @Param('id') id: string,
    @Body('quantityPurchase') quantityPurchase: number,
  ): Promise<VariationDto | string> {
    return this.variationService.decrementQuantity(id, quantityPurchase);
  }

  @Put('incrementQuantity/:id')
  incrementQuantity(
    @Param('id') id: string,
    @Body('quantityIncrement') quantityIncrement: number,
  ): Promise<VariationDto | string> {
    return this.variationService.incrementQuantity(id, quantityIncrement);
  }

  @Delete(':id')
  deleteVariation(@Param('id') id: string): Promise<string> {
    return this.variationService.deleteVariation(id);
  }
}
