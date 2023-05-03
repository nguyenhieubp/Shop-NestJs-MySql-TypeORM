import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteUserEntity } from './entity/site_user.entity';
import { Repository } from 'typeorm';
import { SiteUserDto } from './dto/site_user.dto';

@Injectable()
export class SiteUserService {
  constructor(
    @InjectRepository(SiteUserEntity)
    private readonly siteUserRepository: Repository<SiteUserEntity>,
  ) {}
  async validateUser(data: {
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }) {
    const user = await this.siteUserRepository.findOneBy({
      email: data.email,
    });
    if (user) return user;
    const newUser = this.siteUserRepository.create(data);
    return await this.siteUserRepository.save(newUser);
  }

  async findUser(id: string) {
    const user = await this.siteUserRepository.findOneBy({ id });
    return user;
  }
}
