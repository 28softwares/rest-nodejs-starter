import { Column, Entity } from "typeorm";
import { CommonEntity } from "../common/common.entity";

export enum MediaType {
  USER_PROFILE = "USER_PROFILE",
  USER_CITIZENSHIP = "USER_CITIZENSHIP",
  USER_PASSPORT = "USER_PASSPORT",
  BLOG_THUMBNAIL = "BLOG_THUMBNAIL",
}

@Entity()
export class Media extends CommonEntity {
  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column({ type: "enum", enum: MediaType })
  mediaType: MediaType;
}