import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AddressUserService } from './address_user.service';
import { AddressUserDto } from './dto/addressUserDto';
import { Request } from 'express';

@Controller('api/v1/address-user')
export class AddressUserController {
  constructor(
    private readonly addressUserService: AddressUserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('')
  getAllAddressUser(): Promise<AddressUserDto[]> {
    return this.addressUserService.getAllAddressUser();
  }

  @Get('item/:id')
  getItemAddressUser(@Param('id') id: string): Promise<AddressUserDto> {
    return this.addressUserService.getItemAddressUser(id);
  }

  @Get('user/:id')
  getAddressOfUser(@Param('id') id: string): Promise<AddressUserDto[]> {
    return this.addressUserService.getAddressOfUser(id);
  }

  @Post('')
  addAddressUser(@Req() req: any, @Body() addressUser: AddressUserDto) {
    const addressUserReal = AddressUserDto.plainToClass({
      ...addressUser,
      siteUserId: req.user.id,
    });
    return this.addressUserService.addAddressUser(addressUserReal);
  }

  @Put('/:id')
  updateAddressUser(
    @Param('id') id: string,
    @Body() addressUser: any,
  ): Promise<AddressUserDto> {
    return this.addressUserService.updateAddressUser(id, addressUser);
  }

  @Delete('/:id')
  deleteAddressUser(@Param('id') id: string): Promise<string> {
    return this.addressUserService.deleteAddressUser(id);
  }
}
