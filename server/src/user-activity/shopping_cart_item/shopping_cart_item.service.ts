import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartItemEntity } from './entity/shopping_cart_item.entity';
import { Repository } from 'typeorm';
import { ShoppingCartItemDto } from './dto/shopping_cart_item.dto';

@Injectable()
export class ShoppingCartItemService {
  constructor(
    @InjectRepository(ShoppingCartItemEntity)
    private readonly shoppingCartItemRepository: Repository<ShoppingCartItemEntity>,
  ) {}

  public async getCartItemByShoppingCart(
    id: string,
  ): Promise<ShoppingCartItemDto[]> {
    return this.shoppingCartItemRepository
      .createQueryBuilder('shopping_cart_item')
      .leftJoinAndSelect('shopping_cart_item.shopping_cart', 'shopping_cart')
      .leftJoinAndSelect('shopping_cart_item.product', 'product')
      .leftJoinAndSelect('product.variation', 'variation')
      .where('shopping_cart_item.shopping_cart =:id', { id })
      .getMany();
  }

  public async emptyShoppingCart(id: string) {
    const productIds = await this.getCartItemByShoppingCart(id);
    Promise.all(productIds.map((item) => this.deleteCartItem(item.id)));
    return 'success';
  }

  public async createCartItem(
    cartItem: ShoppingCartItemDto,
  ): Promise<ShoppingCartItemDto> {
    const newCartItem = await this.shoppingCartItemRepository.save(cartItem);
    return this.shoppingCartItemRepository
      .createQueryBuilder('shopping_cart_item')
      .leftJoinAndSelect('shopping_cart_item.shopping_cart', 'shopping_cart')
      .leftJoinAndSelect('shopping_cart_item.product', 'product')
      .leftJoinAndSelect('product.variation', 'variation')
      .where('shopping_cart_item.id =:id', { id: newCartItem.id })
      .getOne();
  }

  public async updateIncrementQuantityCartItem(
    id: string,
    numberUpPurchase: number,
  ): Promise<ShoppingCartItemDto> {
    await this.shoppingCartItemRepository.update(id, {
      quantity:
        (await this.shoppingCartItemRepository.findOneById(id)).quantity +
        Number(numberUpPurchase),
    });
    return this.shoppingCartItemRepository
      .createQueryBuilder('shopping_cart_item')
      .where('shopping_cart_item.id =:id', { id: id })
      .getOne();
  }

  public async updateDecrementQuantityCartItem(
    id: string,
    numberDownPurchase: number,
  ): Promise<ShoppingCartItemDto> {
    await this.shoppingCartItemRepository.update(id, {
      quantity:
        (await this.shoppingCartItemRepository.findOneById(id)).quantity -
        Number(numberDownPurchase),
    });
    return this.shoppingCartItemRepository
      .createQueryBuilder('shopping_cart_item')
      .where('shopping_cart_item.id =:id', { id: id })
      .getOne();
  }

  public async deleteCartItem(id: string): Promise<string> {
    await this.shoppingCartItemRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
