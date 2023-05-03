import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionEntity } from './entity/promotion.entity';
import { Repository } from 'typeorm';
import { PromotionDto } from './dto/promption.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  public getAllPromotion(): Promise<PromotionDto[]> {
    return this.promotionRepository.find();
  }

  public getItemPromotion(id: string): Promise<PromotionDto> {
    return this.promotionRepository.findOneById(id);
  }

  public getPromotionByDiscountRate(
    discount_rate: number,
  ): Promise<PromotionDto[]> {
    return this.promotionRepository.find({
      where: { discount_rate: discount_rate },
    });
  }

  public async createPromotion(promotion: PromotionDto): Promise<PromotionDto> {
    return await this.promotionRepository.save(promotion);
  }

  public async updatePromotion(
    id: string,
    promotion: any,
  ): Promise<PromotionDto> {
    await this.promotionRepository.update(id, promotion);
    return this.promotionRepository.findOneById(id);
  }

  public async deletePromotion(id: string): Promise<string> {
    await this.promotionRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
