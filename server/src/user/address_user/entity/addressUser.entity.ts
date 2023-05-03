import { Column, ManyToOne, Entity } from 'typeorm';
import { BaseDatabase } from 'src/config/comon/baseDatabase';
import { SiteUserEntity } from 'src/user/site_user/entity/site_user.entity';
import { AddressEntity } from 'src/user/address/entity/address.entity';

@Entity({ name: 'address_user' })
export class AddressUserEntity extends BaseDatabase {
  @Column('uuid')
  addressId: AddressEntity;

  @Column('uuid')
  siteUserId: SiteUserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.addressUser)
  address: AddressEntity;

  @ManyToOne(() => SiteUserEntity, (siteUser) => siteUser.addressUser)
  site_user: SiteUserEntity;
}
