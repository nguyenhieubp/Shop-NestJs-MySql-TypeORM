import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './entity/product_category.entity';
import { Repository } from 'typeorm';
import { ProductCategoryDto } from './dto/product_category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
  ) {}

  public async addProductCategory(
    productCategory: ProductCategoryDto,
  ): Promise<ProductCategoryDto> {
    return await this.productCategoryRepository.save(productCategory);
  }

  public async getAllProductCategory(): Promise<ProductCategoryDto[]> {
    return await this.productCategoryRepository.find();
  }

  public async getItemProductCategory(id: string): Promise<ProductCategoryDto> {
    return await this.productCategoryRepository.findOneById(id);
  }

  public async updateProductCategory(
    id: string,
    productCategory: any,
  ): Promise<ProductCategoryDto> {
    await this.productCategoryRepository.update(id, productCategory);
    return this.productCategoryRepository.findOneById(id);
  }

  public async deleteProductCategory(id: string): Promise<string> {
    await this.productCategoryRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
