import { Injectable } from '@nestjs/common';
import { SiteUserDto } from 'src/user/site_user/dto/site_user.dto';
import { ShoppingCartDto } from './dto/shopping_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartEntity } from './entity/shopping_cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCartEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartEntity>,
  ) {}

  public async getAllShoppingCart(): Promise<ShoppingCartDto[]> {
    return await this.shoppingCartRepository
      .createQueryBuilder('shopping_cart')
      .leftJoinAndSelect('shopping_cart.user', 'user')
      .getMany();
  }

  public async getItemShoppingCart(id: string): Promise<ShoppingCartDto> {
    return await this.shoppingCartRepository
      .createQueryBuilder('shopping_cart')
      .leftJoinAndSelect('shopping_cart.user', 'user')
      .where('shopping_cart.id =:id', { id: id })
      .getOne();
  }

  public async getUserShoppingCart(id: string): Promise<ShoppingCartDto> {
    return await this.shoppingCartRepository
      .createQueryBuilder('shopping_cart')
      .leftJoinAndSelect('shopping_cart.user', 'user')
      .where('user.id =:id', { id: id })
      .getOne();
  }

  public async createShoppingCart(
    shoppingCart: ShoppingCartDto,
  ): Promise<ShoppingCartDto> {
    try {
      const newShoppingCart = await this.shoppingCartRepository.save(
        shoppingCart,
      );
      return this.shoppingCartRepository
        .createQueryBuilder('shopping_cart')
        .leftJoinAndSelect('shopping_cart.user', 'user')
        .where('shopping_cart.id =:id', { id: newShoppingCart.id })
        .getOne();
    } catch (error) {
      return error;
    }
  }
}
