import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../../constants/appConstant';
import { CommonEntity } from '../common/common.entity';
import { Token } from '../token/Token.entity';
import BcryptService from '../../utils/bcrypt.util';
import { Log } from '../log/Log.entity';

export enum AdminPermission {
  'CAROUSEL' = 'CAROUSEL',
  'PRODUCT' = 'PRODUCT',
  'USERS' = 'USERS',
  'ORDERS' = 'ORDERS',
  'LOGS' = 'LOGS',
}
@Entity({
  name: 'admin',
})
export class Admin extends CommonEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'password',
    select: false,
  })
  password: string;

  @Column({ type: 'simple-array', default: [] })
  permissions: AdminPermission[];

  @Column({
    name: 'phone_number',
    nullable: true,
  })
  phoneNumber: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  role: Role;

  @OneToMany(() => Token, (token) => token.admin)
  token: Token;

  @OneToMany(() => Log, (log) => log.actionBy)
  logs: Log[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await BcryptService.hash(this.password);
  }
}
