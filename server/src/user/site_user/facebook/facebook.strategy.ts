import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { SiteUserService } from '../site_user.service';
import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly siteUserService: SiteUserService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/login',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = await this.siteUserService.validateUser({
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
    });

    done(null, user);
  }
}
