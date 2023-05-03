import { ShopOrderDto } from './dto/shop_order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopOrderEntity } from './entity/shop_order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopOrderService {
  constructor(
    @InjectRepository(ShopOrderEntity)
    private readonly shopOrderRepository: Repository<ShopOrderEntity>,
  ) {}

  public async createShopOrder(shopOrder: ShopOrderDto): Promise<ShopOrderDto> {
    const newShopOrder = await this.shopOrderRepository.save(shopOrder);
    return this.shopOrderRepository
      .createQueryBuilder('shop_order')
      .leftJoinAndSelect('shop_order.shipping_address', 'shipping_address')
      .leftJoinAndSelect('shop_order.site_user', 'site_user')
      .where('shop_order.id =:id', { id: newShopOrder.id })
      .getOne();
  }

  public async getAllShopOrder(): Promise<ShopOrderDto[]> {
    return this.shopOrderRepository
      .createQueryBuilder('shop_order')
      .leftJoinAndSelect('shop_order.shipping_address', 'shipping_address')

      .leftJoinAndSelect('shop_order.site_user', 'site_user')
      .getMany();
  }

  public async getItemShopOrder(id: string): Promise<ShopOrderDto> {
    return this.shopOrderRepository
      .createQueryBuilder('shop_order')
      .leftJoinAndSelect('shop_order.shipping_address', 'shipping_address')
      .leftJoinAndSelect('shop_order.site_user', 'site_user')
      .where('shop_order.site_user =:id', { id })
      .getOne();
  }

  public async updateShopOrder(
    id: string,
    shopOrder: any,
  ): Promise<ShopOrderDto> {
    await this.shopOrderRepository.update(id, shopOrder);
    return this.shopOrderRepository
      .createQueryBuilder('shop_order')
      .leftJoinAndSelect('shop_order.shipping_address', 'shipping_address')
      .leftJoinAndSelect('shop_order.userPaymentMethod', 'userPaymentMethod')
      .leftJoinAndSelect('shop_order.site_user', 'site_user')
      .where('shop_order.id =:id', { id })
      .getOne();
  }

  public async deleteShopOrder(id: string): Promise<string> {
    await this.shopOrderRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
