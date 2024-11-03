import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { TokenEnum } from '../../constants/appConstant';
import { Admin } from '../admin/Admin.entity';
import { CommonEntity } from '../common/common.entity';
import { User } from '../user/User.entity';
@Entity('token')
@Unique(['user', 'type'])
@Unique(['admin', 'type'])
export class Token extends CommonEntity {
  @Column({
    nullable: false,
  })
  token: string;

  @Column({
    type: 'enum',
    enum: TokenEnum,
    nullable: false,
  })
  type: TokenEnum;

  @ManyToOne(() => User, (user) => user.token, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;

  @ManyToOne(() => Admin, (admin) => admin.token, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  admin: Admin;
}
