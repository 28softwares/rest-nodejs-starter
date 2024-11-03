// migrate media from temp to uploads dir

import { Path } from 'tsoa';
import { MediaType } from '../../constants/appConstant';
import { PathUtil } from './mediaPath';
import fs from 'fs-extra';

export const deleteFile = async (path: string) => {
  if (fs.existsSync(path)) {
    await fs.unlink(path, () => {
      console.log('file deleted');
    });
  }
};

export const checkCreateDir = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    //enable all permission
    fs.chmodSync(path, 0o777);
  }
};

/**
 *
 * @param mediaType type of media (eg. PRODUCT_IMAGE, STORE_IMAGE)
 * @param fileName name of file )( name of media)
 * @param id //whose media is this, (like product, store)
 */
export const migrateMedia = async (
  mediaType: MediaType,
  fileName: string,
  id: string,
) => {
  switch (mediaType) {
    case MediaType.STORE_LOGO: {
      const storeGeneratedPath = PathUtil.generateMediaPathForStore(id);
      checkCreateDir(storeGeneratedPath);
      //migrate store media

      fs.move(
        `${storeGeneratedPath}/${fileName}`,
        `${storeGeneratedPath}/${fileName}`,
        (err) => {
          if (err) {
            console.log('Error while moving file', err);
          }
        },
      );
      break;
    }

    case MediaType.PRODUCT_IMAGE: {
      const productGeneratedPath = PathUtil.generateMediaPathForProduct(id);
      checkCreateDir(productGeneratedPath);
      //migrate store media
      fs.move(
        `${PathUtil.TEMP_FOLDER_PATH}/${fileName}`,
        `${productGeneratedPath}/${fileName}`,
        (err) => {
          if (err) {
            console.log('Error while moving file', err);
          }
        },
      );
      break;
    }

    case MediaType.PROFILE_IMAGE: {
      const profileGeneratedPath = PathUtil.generateMediaPathForProfile(id);
      checkCreateDir(profileGeneratedPath);
      //migrate user media
      console.log('fileName', fileName);
      console.log(`${PathUtil.TEMP_FOLDER_PATH}/${fileName}`);
      console.log(`${profileGeneratedPath}/${fileName}`);

      fs.move(
        `${PathUtil.TEMP_FOLDER_PATH}/${fileName}`,
        `${profileGeneratedPath}/${fileName}`,
        (err) => {
          if (err) {
            console.log('Error while moving file', err);
          }
        },
      );
      break;
    }

    case MediaType.CAROUSEL_IMAGE: {
      const carouselImagePath = PathUtil.generateMediaPathForCrousel(id);
      checkCreateDir(carouselImagePath);
      //migrate crousel image
      fs.move(
        `${PathUtil.TEMP_FOLDER_PATH}/${fileName}`,
        `${carouselImagePath}/${fileName}`,
        (err) => {
          if (err) {
            console.log('Error while moving file', err);
          }
        },
      );
      break;
    }

    case MediaType.BLOG_THUMBNAIL: {
      const blogThumbnailPath = PathUtil.generateMediaPathForBlog(id);
      checkCreateDir(blogThumbnailPath);
      //migrate blog thumbnail
      fs.move(
        `${PathUtil.TEMP_FOLDER_PATH}/${fileName}`,
        `${blogThumbnailPath}/${fileName}`,
        (err) => {
          if (err) {
            console.log('Error while moving file', err);
          }
        },
      );
      break;
    }

    default:
      break;
  }
};
