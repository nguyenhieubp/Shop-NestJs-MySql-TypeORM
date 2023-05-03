import { Module } from '@nestjs/common';
import { SiteUserModule } from '../site_user.module';

@Module({
  imports: [SiteUserModule],
})
export class FacebookAuthModule {}
