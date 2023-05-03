import { Controller, Get } from '@nestjs/common';
import { SiteUserService } from './site_user.service';
import { Redirect, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { GoogleAuthGuard } from './google/google.guard';
import { FacebookAuthGuard } from './facebook/face.guard';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthGuard } from '@nestjs/passport';
dotenv.config();

@Controller('auth')
export class SiteUserController {
  constructor(
    private readonly siteUserService: SiteUserService,
    private jwtService: JwtService,
  ) {}
  @Get()
  async hello(@Req() req: Request) {
    const token = req.cookies['access_token'];
    const data = await this.jwtService.verifyAsync(token, {
      secret: '9f9a425622c9c692c17295ee13bb393d',
    });
    return data;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {}

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookAuth() {}

  @Get('facebook/login')
  @UseGuards(FacebookAuthGuard)
  @Redirect('http://localhost:3001/address')
  async facebookRedirect(
    @Req() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const access_token = await this.jwtService.signAsync(
      {
        id: request.user.id,
      },
      { secret: process.env.FACEBOOK_SECRET },
    );
    const expirationTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 hour
    response.cookie('access_token', access_token, { expires: expirationTime });
  }
}
