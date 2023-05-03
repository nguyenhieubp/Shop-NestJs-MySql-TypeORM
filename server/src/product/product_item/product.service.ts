import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async getAllProduct(
    page: number,
    limit: number,
  ): Promise<ProductEntity[]> {
    if (page <= 0 || limit <= 0) {
      page = 1;
      limit = 1;
    }
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .take(Number(limit))
      .skip(Number(page) - 1)
      .getMany();
  }

  public async addProduct(product: ProductDto): Promise<ProductEntity> {
    const newProduct = await this.productRepository.save(product);
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id =:id', { id: newProduct.id })
      .getOne();
  }

  public async getItemProduct(id: string): Promise<ProductEntity> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id =:id', { id: id })
      .getOne();
  }

  public async getProductByCategory(category: string): Promise<ProductDto[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.category_name =:category', { category: category })
      .getMany();
  }

  public async getProductByName(name: string): Promise<ProductDto[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  public async getSortByPriceIncrement(): Promise<ProductDto[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.price', 'ASC')
      .getMany();
  }

  public async getSortByPriceDecrement(): Promise<ProductDto[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.price', 'DESC')
      .getMany();
  }

  public async getByDate(): Promise<ProductDto[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.created_at', 'DESC')
      .getMany();
  }

  public async getByPurchase(): Promise<ProductDto[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.purchase', 'DESC')
      .getMany();
  }

  public async search(valueSearch: string): Promise<ProductDto[]> {
    console.log(valueSearch);
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where(
        'product.name LIKE :valueSearch OR product.description LIKE :valueSearch OR category.category_name LIKE :valueSearch',
        {
          valueSearch: `%${valueSearch}%`,
        },
      )
      .getMany();
  }

  public async updateProduct(id: string, product: any): Promise<ProductDto> {
    await this.productRepository.update(id, product);
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id =:id', { id: id })
      .getOne();
  }

  public async purchaseProduct(
    id: string,
    numberPurchase: number,
  ): Promise<ProductDto> {
    const productPurchase = await this.productRepository.findOneById(id);
    const purchase = Number(productPurchase.purchase) + Number(numberPurchase);
    await this.productRepository.update(id, { purchase: purchase });
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id =:id', { id: id })
      .getOne();
  }

  public async unPurchaseProduct(id: string, numberUnPurchase: number) {
    const productUnPurchase = await this.productRepository.findOneById(id);
    const purchase = productUnPurchase.purchase - numberUnPurchase;
    await this.productRepository.update(id, { purchase: purchase });
  }

  public async deleteProduct(id: string): Promise<string> {
    try {
      await this.productRepository.delete(id);
      return 'DELETE SUCCESS';
    } catch (error) {}
  }
}
