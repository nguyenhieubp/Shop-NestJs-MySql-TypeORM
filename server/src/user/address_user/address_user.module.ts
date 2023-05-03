import { JwtModule } from '@nestjs/jwt/dist';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AddressUserService } from './address_user.service';
import { AddressUserController } from './address_user.controller';
import { AddressUserEntity } from './entity/addressUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../address/entity/address.entity';
import { SiteUserEntity } from '../site_user/entity/site_user.entity';
import { AuthMiddleware } from 'src/config/middlewares/middlewares.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressUserEntity,
      AddressEntity,
      SiteUserEntity,
    ]),
  ],
  controllers: [AddressUserController],
  providers: [AddressUserService],
})
export class AddressUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/address-user');
  }
}
