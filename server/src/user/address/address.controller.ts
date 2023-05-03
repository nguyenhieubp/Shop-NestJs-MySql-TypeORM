import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';

@Controller('api/v1/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('')
  getAllAddress(): Promise<AddressDto[]> {
    return this.addressService.getAllAddress();
  }

  @Post('')
  addAddress(@Body() address: AddressDto): Promise<AddressDto> {
    const addressReal = AddressDto.plainToClass(address);
    return this.addressService.addAddress(addressReal);
  }

  @Put(':id')
  updateAddress(
    @Param('id') id: string,
    @Body() address: any,
  ): Promise<AddressDto> {
    return this.addressService.updateAddress(id, address);
  }

  @Delete(':id')
  deleteAddress(@Param('id') id: string): Promise<string> {
    return this.addressService.deleteAddress(id);
  }
}
