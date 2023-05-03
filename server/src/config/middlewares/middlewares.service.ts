import { Injectable, Req, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(@Req() req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies['access_token'];
      const data = await this.jwtService.verifyAsync(token, {
        secret: process.env.FACEBOOK_SECRET,
      });
      req.user = data;
      next();
    } catch (error) {
      req.user = 'not have authorization';
      next();
    }
  }
}
