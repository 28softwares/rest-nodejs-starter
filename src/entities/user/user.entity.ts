import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { MediaType, UserLoginType } from '../../constants/appConstant';
import { Token } from '../token/Token.entity';
import { migrateMedia } from '../../utils/media/migrateMedia';
import { DotenvConfig } from '../../config/env.config';
import BcryptService from '../../utils/bcrypt.util';
import { UserDetail } from './UserDetail.entity';

@Entity({
  name: 'user',
})
export class User extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fullName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'text',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 255,
    nullable: true, //for google auth it could be null
  })
  phone?: string;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: UserLoginType,
    default: UserLoginType.TRADITIONAL,
  })
  loginType: UserLoginType;

  @OneToOne(() => UserDetail, (detail) => detail.user)
  userDetails: UserDetail;

  @OneToMany(() => Token, (token) => token.user)
  token: Token;

  @AfterInsert()
  @AfterUpdate()
  async migrateMedia() {
    console.log('this', this);
    //migrate thumbnail
    if (this.userDetails?.profileImage) {
      await migrateMedia(
        MediaType.PROFILE_IMAGE,
        this.userDetails.profileImage.fileName,
        this.id,
      );
    }
  }

  @AfterLoad()
  async appendMediaPath() {
    if (this.userDetails?.profileImage) {
      this.userDetails.profileImage.path = `${DotenvConfig.BASE_URL}/user/${this.id}/${this.userDetails.profileImage?.fileName}`;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await BcryptService.hash(this.password);
  }
}
