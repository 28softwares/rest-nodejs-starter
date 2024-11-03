import {
  AfterInsert,
  AfterLoad,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Media } from '../media/media.entity';
import { User } from './User.entity';

@Entity({
  name: 'user_details',
})
export class UserDetail extends CommonEntity {
  @OneToOne(() => User, (user) => user.userDetails, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => Media, (media) => media.userDetail)
  @JoinColumn()
  profileImage: Media;

  @Column({
    nullable: true,
  })
  avatar?: string; //it is a avatar of OAuth (like google)
}
