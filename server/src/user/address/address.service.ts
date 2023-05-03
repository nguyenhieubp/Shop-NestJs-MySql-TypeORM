import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  public async getAllAddress(): Promise<AddressDto[]> {
    return await this.addressRepository.find();
  }

  public async addAddress(address: AddressDto): Promise<AddressDto> {
    return await this.addressRepository.save(address);
  }

  public async updateAddress(
    id: string,
    address: AddressDto,
  ): Promise<AddressDto> {
    await this.addressRepository.update(id, address);
    return await this.addressRepository.findOneById(id);
  }

  public async deleteAddress(id: string): Promise<string> {
    await this.addressRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
