import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionDto } from './dto/promption.dto';

@Controller('api/v1/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  getAllPromotion(): Promise<PromotionDto[]> {
    return this.promotionService.getAllPromotion();
  }

  @Get('item/:id')
  getItemPromotion(@Param('id') id: string): Promise<PromotionDto> {
    return this.promotionService.getItemPromotion(id);
  }

  @Get('discount_rate')
  getPromotionByDiscountRate(
    @Body('discount_rate') discount_rate: number,
  ): Promise<PromotionDto[]> {
    return this.promotionService.getPromotionByDiscountRate(discount_rate);
  }

  @Post()
  createPromotion(@Body() promotion: PromotionDto): Promise<PromotionDto> {
    const promotionReal = PromotionDto.plainToClass(promotion);
    return this.promotionService.createPromotion(promotionReal);
  }

  @Put(':id')
  updatePromotion(
    @Param('id') id: string,
    @Body() promotion: any,
  ): Promise<PromotionDto> {
    return this.promotionService.updatePromotion(id, promotion);
  }

  @Delete(':id')
  deletePromotion(@Param('id') id: string): Promise<string> {
    return this.promotionService.deletePromotion(id);
  }
}
