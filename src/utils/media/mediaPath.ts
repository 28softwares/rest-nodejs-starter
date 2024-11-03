import { DotenvConfig } from '../../config/env.config';
import path from 'path';
class PathUtil {
  static TEMP_FOLDER_PATH = DotenvConfig.MEDIA_TEMP_PATH;
  static UPLOADS_FOLDER_PATH = DotenvConfig.MEDIA_UPLOAD_PATH!;

  static generateMediaPathForProduct(id: string) {
    return path.join(PathUtil.UPLOADS_FOLDER_PATH, 'product', id);
  }

  static generateMediaPathForStore(id: string) {
    return path.join(PathUtil.UPLOADS_FOLDER_PATH, 'store', id);
  }

  static generateMediaPathForProfile(userId: string) {
    return path.join(PathUtil.UPLOADS_FOLDER_PATH, 'user', userId);
  }

  static generateMediaPathForCrousel(crouselId: string) {
    return path.join(PathUtil.UPLOADS_FOLDER_PATH, 'carousel', crouselId);
  }

  static generateMediaPathForBlog(blogId: string) {
    return path.join(PathUtil.UPLOADS_FOLDER_PATH, 'blogs', blogId);
  }
}

export { PathUtil };
