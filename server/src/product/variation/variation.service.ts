import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { VariationDto } from './dto/variation.dto';
import { VariationEntity } from './entity/variation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VariationService {
  constructor(
    @InjectRepository(VariationEntity)
    private readonly variationRepository: Repository<VariationEntity>,
  ) {}
  public async addVariation(variation: VariationDto): Promise<VariationDto> {
    return await this.variationRepository.save(variation);
  }

  public async getAllVariation(): Promise<VariationDto[]> {
    return await this.variationRepository.find();
  }

  public async getItemVariation(id: string): Promise<VariationDto> {
    return await this.variationRepository.findOneById(id);
  }

  public async updateVariation(
    id: string,
    variation: any,
  ): Promise<VariationDto> {
    await this.variationRepository.update(id, variation);
    return this.variationRepository.findOneById(id);
  }

  public async decrementQuantity(
    id: string,
    quantityPurchase: number,
  ): Promise<VariationDto | string> {
    const variation = await this.variationRepository.findOneById(id);
    if (variation.quantity <= 0) {
      return 'Empty';
    } else {
      await this.variationRepository.update(id, {
        quantity: variation.quantity - quantityPurchase,
      });
      return await this.variationRepository.findOneById(id);
    }
  }

  public async incrementQuantity(
    id: string,
    quantityIncrement: number,
  ): Promise<VariationDto | string> {
    const variation = await this.variationRepository.findOneById(id);
    if (variation.quantity <= 0) {
      return 'Empty';
    } else {
      await this.variationRepository.update(id, {
        quantity: variation.quantity + quantityIncrement,
      });
      return await this.variationRepository.findOneById(id);
    }
  }

  public async deleteVariation(id: string): Promise<string> {
    await this.variationRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
