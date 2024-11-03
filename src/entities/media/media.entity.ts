import { BeforeRemove, Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { UserDetail } from '../user/UserDetail.entity';
import { MediaType } from '../../constants/appConstant';
import { deleteFile } from '../../utils/media/migrateMedia';
import { PathUtil } from '../../utils/media/mediaPath';

@Entity()
export class Media extends CommonEntity {
  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({ name: 'file_name' })
  fileName: string; //it holds file name later we will append full image path

  @Column({
    enum: MediaType,
    type: 'enum',
  })
  fileType: MediaType;

  path: string | undefined;

  @Column({ type: 'boolean', default: false })
  isThumbnail: boolean;

  @OneToOne(() => UserDetail, (detail) => detail.profileImage, {
    onDelete: 'CASCADE',
  })
  userDetail: UserDetail;

  @BeforeRemove()
  async deleteFile() {
    switch (this.fileType) {
      case MediaType.BLOG_THUMBNAIL:
        console.log('Blog Thumbnail');
        console.log(PathUtil.generateMediaPathForBlog(this.id) + this.fileName);
        await deleteFile(
          PathUtil.generateMediaPathForBlog(this.id) + this.fileName,
        );
        break;
    }
  }
}
