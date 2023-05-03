import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionCategoryEntity } from './entity/promotion_category.entity';
import { Repository } from 'typeorm';
import { PromotionCategoryDto } from './dto/promotion_category.dto';

@Injectable()
export class PromotionCategoryService {
  constructor(
    @InjectRepository(PromotionCategoryEntity)
    private readonly promotionCategoryRepository: Repository<PromotionCategoryEntity>,
  ) {}

  public async addPromotionCategory(
    promotionCategory: PromotionCategoryDto,
  ): Promise<PromotionCategoryDto> {
    const newPromotionCategory = await this.promotionCategoryRepository.save(
      promotionCategory,
    );
    return await this.promotionCategoryRepository
      .createQueryBuilder('promotion_category')
      .leftJoinAndSelect('promotion_category.promotion', 'promotion')
      .leftJoinAndSelect('promotion_category.category', 'category')
      .where('promotion_category.id =:id', { id: newPromotionCategory.id })
      .getOne();
  }

  public async getAllPromotionCategory(): Promise<PromotionCategoryDto[]> {
    return await this.promotionCategoryRepository
      .createQueryBuilder('promotion_category')
      .leftJoinAndSelect('promotion_category.promotion', 'promotion')
      .leftJoinAndSelect('promotion_category.category', 'category')
      .getMany();
  }

  public async getItemPromotionCategory(
    id: string,
  ): Promise<PromotionCategoryDto> {
    return await this.promotionCategoryRepository
      .createQueryBuilder('promotion_category')
      .leftJoinAndSelect('promotion_category.promotion', 'promotion')
      .leftJoinAndSelect('promotion_category.category', 'category')
      .where('promotion_category.id =:id', { id: id })
      .getOne();
  }

  public async updatePromotionCategory(
    id: string,
    updatePromotionCategory: any,
  ): Promise<PromotionCategoryDto> {
    await this.promotionCategoryRepository.update(id, updatePromotionCategory);
    return await this.promotionCategoryRepository
      .createQueryBuilder('promotion_category')
      .leftJoinAndSelect('promotion_category.promotion', 'promotion')
      .leftJoinAndSelect('promotion_category.category', 'category')
      .where('promotion_category.id =:id', { id: id })
      .getOne();
  }

  public async deletePromotionCategory(id: string): Promise<string> {
    await this.promotionCategoryRepository.delete(id);
    return 'DELETE SUCCESS';
  }

  public async getPromotionCategoryByCategoryName(category_name: string) {
    return await this.promotionCategoryRepository
      .createQueryBuilder('promotion_category')
      .leftJoinAndSelect('promotion_category.promotion', 'promotion')
      .leftJoinAndSelect('promotion_category.category', 'category')
      .where('category.category_name =:category_name ', {
        category_name: category_name,
      })
      .getMany();
  }
}
