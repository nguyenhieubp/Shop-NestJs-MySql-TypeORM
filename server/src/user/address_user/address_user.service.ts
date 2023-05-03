import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressUserEntity } from './entity/addressUser.entity';
import { Repository } from 'typeorm';
import { AddressUserDto } from './dto/addressUserDto';
import { SiteUserEntity } from '../site_user/entity/site_user.entity';
import { AddressEntity } from '../address/entity/address.entity';

@Injectable()
export class AddressUserService {
  constructor(
    @InjectRepository(AddressUserEntity)
    private readonly addressUserRepository: Repository<AddressUserEntity>,
    @InjectRepository(SiteUserEntity)
    private readonly siteUserRepository: Repository<SiteUserEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressUserEntity>,
  ) {}

  public async getAllAddressUser(): Promise<AddressUserDto[]> {
    return await this.addressUserRepository
      .createQueryBuilder('address_user')
      .leftJoinAndSelect('address_user.address', 'address')
      .leftJoinAndSelect('address_user.site_user', 'site_user')
      .getMany();
  }

  public async getItemAddressUser(id: string): Promise<AddressUserDto> {
    return await this.addressUserRepository
      .createQueryBuilder('address_user')
      .leftJoinAndSelect('address_user.address', 'address')
      .leftJoinAndSelect('address_user.site_user', 'site_user')
      .where('address_user.id =:id', { id: id })
      .getOne();
  }

  public async getAddressOfUser(id: string): Promise<AddressUserDto[]> {
    return await this.addressUserRepository
      .createQueryBuilder('address_user')
      .leftJoinAndSelect('address_user.address', 'address')
      .leftJoinAndSelect('address_user.site_user', 'site_user')
      .where('address_user.site_user =:id', { id: id })
      .getMany();
  }

  public async addAddressUser(
    addressUser: AddressUserDto,
  ): Promise<AddressUserDto> {
    try {
      const addressUserNew = await this.addressUserRepository.save(addressUser);
      return await this.addressUserRepository
        .createQueryBuilder('address_user')
        .leftJoinAndSelect('address_user.address', 'address')
        .leftJoinAndSelect('address_user.site_user', 'site_user')
        .where('address_user.id =:id', { id: addressUserNew.id })
        .getOne();
    } catch (error) {
      return error;
    }
  }

  public async updateAddressUser(
    id: string,
    addressUser: AddressUserDto,
  ): Promise<AddressUserDto> {
    await this.addressUserRepository.update(id, addressUser);
    return await this.addressUserRepository
      .createQueryBuilder('address_user')
      .leftJoinAndSelect('address_user.address', 'address')
      .leftJoinAndSelect('address_user.site_user', 'site_user')
      .where('address_user.id =:id', { id: id })
      .getOne();
  }

  public async deleteAddressUser(id: string): Promise<string> {
    await this.addressUserRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
