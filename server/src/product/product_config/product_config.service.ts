import { Injectable } from '@nestjs/common';
import { ProductConfigDto } from './dto/product_config.dto';
import { Repository } from 'typeorm';
import { ProductConfigEntity } from './entity/product_config.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductConfigService {
  constructor(
    @InjectRepository(ProductConfigEntity)
    private readonly productConfigRepository: Repository<ProductConfigEntity>,
  ) {}

  public async createProductConfig(
    productConfig: ProductConfigDto,
  ): Promise<ProductConfigDto> {
    const newProductConfig = await this.productConfigRepository.save(
      productConfig,
    );
    return await this.productConfigRepository
      .createQueryBuilder('product_config')
      .leftJoinAndSelect('product_config.product', 'product')
      .leftJoinAndSelect('product_config.variation', 'variation')
      .where('product_config.id =:id', { id: newProductConfig.id })
      .getOne();
  }

  public async getAllProductConfig(): Promise<ProductConfigDto[]> {
    return await this.productConfigRepository
      .createQueryBuilder('product_config')
      .leftJoinAndSelect('product_config.product', 'product')
      .leftJoinAndSelect('product_config.variation', 'variation')
      .getMany();
  }

  public async getItemProductConfig(id: string): Promise<ProductConfigDto> {
    return await this.productConfigRepository
      .createQueryBuilder('product_config')
      .leftJoinAndSelect('product_config.product', 'product')
      .leftJoinAndSelect('product_config.variation', 'variation')
      .where('product_config.id =:id', { id })
      .getOne();
  }

  public async getItemProduct(id: string): Promise<any> {
    try {
      const products = await this.productConfigRepository
        .createQueryBuilder('product_config')
        .leftJoinAndSelect('product_config.product', 'product')
        .leftJoinAndSelect('product_config.variation', 'variation')
        .where('product.id =:id', { id })
        .getMany();

      const product = products[0].product;
      const variations = products.map((item) => item.variation);

      return {
        product,
        variations,
      };
    } catch (error) {
      return error;
    }
  }

  public async deleteProductConfig(id: string): Promise<string> {
    await this.productConfigRepository.delete(id);
    return 'DELETE SUCCESS';
  }

  public async deleteProductConfigByVariation(id: string): Promise<string> {
    await this.productConfigRepository
      .createQueryBuilder('product_config')
      .leftJoinAndSelect('product_config.variation', 'variation')
      .delete()
      .where('variation.id =:id', { id: id })
      .execute();
    return 'DELETE SUCCESS';
  }

  public async deleteProductConfigByProduct(id: string): Promise<string> {
    await this.productConfigRepository
      .createQueryBuilder('product_config')
      .leftJoinAndSelect('product_config.product', 'product')
      .delete()
      .where('product.id =:id', { id: id })
      .execute();
    return 'DELETE SUCCESS';
  }
}
