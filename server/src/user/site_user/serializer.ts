import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SiteUserEntity } from './entity/site_user.entity';
import { SiteUserService } from './site_user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly siteUserService: SiteUserService) {
    super();
  }

  serializeUser(auth: SiteUserEntity, done: Function) {
    // console.log('Serializer User =============== ');
    done(null, auth);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.siteUserService.findUser(payload.id);
    // console.log('Deserialize User  ================= ');
    // console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
