import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { PromotionCategoryService } from './promotion_category.service';
import { PromotionCategoryDto } from './dto/promotion_category.dto';

@Controller('api/v1/promotion-category')
export class PromotionCategoryController {
  constructor(
    private readonly promotionCategoryService: PromotionCategoryService,
  ) {}
  @Get()
  getAllPromotionCategory(): Promise<PromotionCategoryDto[]> {
    return this.promotionCategoryService.getAllPromotionCategory();
  }

  @Get('item/:id')
  getItemPromotionCategory(
    @Param('id') id: string,
  ): Promise<PromotionCategoryDto> {
    return this.promotionCategoryService.getItemPromotionCategory(id);
  }

  @Get('category_name')
  getPromotionCategoryByCategoryName(
    @Body('category_name') category_name: string,
  ) {
    return this.promotionCategoryService.getPromotionCategoryByCategoryName(
      category_name,
    );
  }

  @Post()
  addPromotionCategory(@Body() promotionCategory: PromotionCategoryDto) {
    const promotionCategoryReal =
      PromotionCategoryDto.plainToClass(promotionCategory);
    return this.promotionCategoryService.addPromotionCategory(
      promotionCategoryReal,
    );
  }

  @Put(':id')
  updatePromotionCategory(
    @Param('id') id: string,
    @Body() promotionCategory: any,
  ) {
    return this.promotionCategoryService.updatePromotionCategory(
      id,
      promotionCategory,
    );
  }

  @Delete(':id')
  deletePromotionCategory(@Param('id') id: string): Promise<string> {
    return this.promotionCategoryService.deletePromotionCategory(id);
  }
}
