import { JwtService } from '@nestjs/jwt';
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getHello(@Req() req: Request) {
    const access_token = req.cookies['access_token'];
    const a = await this.jwtService.verifyAsync(access_token, {
      secret: '9f9a425622c9c692c17295ee13bb393d',
    });
    console.log(a);
    return this.appService.getHello();
  }
}
