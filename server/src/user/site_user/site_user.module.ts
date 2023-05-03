import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SiteUserService } from './site_user.service';
import { SiteUserController } from './site_user.controller';
import { SiteUserEntity } from './entity/site_user.entity';
import { GoogleStrategy } from './google/google.strategy';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { SessionSerializer } from './serializer';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteUserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.FACEBOOK_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SiteUserController],
  providers: [
    SiteUserService,
    GoogleStrategy,
    FacebookStrategy,
    SessionSerializer,
  ],
  exports: [SiteUserService],
})
export class SiteUserModule {}
