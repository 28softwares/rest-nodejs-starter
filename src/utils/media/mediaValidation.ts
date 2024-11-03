import { MediaType } from '../../constants/appConstant';
import { AppError } from '../appError.util';
class MediaValidate {
  constructor(private error = AppError) {}
  validate(fileLength: number, memetype: string, mediaType: MediaType) {
    let acceptedExtensions: string[] = [];
    let acceptedFileSize: number = 0;

    switch (mediaType) {
      case MediaType.PRODUCT_IMAGE:
      case MediaType.CAROUSEL_IMAGE:
        acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
        acceptedFileSize = 1024 * 1024 * 2; // 2 MB
        break;

      case MediaType.STORE_LOGO:
        acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
        acceptedFileSize = 1024 * 1024 * 1; // 1 MB
        break;

      case MediaType.PROFILE_IMAGE:
        acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
        acceptedFileSize = 1024 * 1024 * 1; // 1 MB
        break;

      case MediaType.BLOG_THUMBNAIL:
        acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
        acceptedFileSize = 1024 * 1024 * 1; // 1 MB
        break;
    }
    if (!acceptedExtensions.includes(memetype)) {
      throw this.error.badRequest(
        'Invalid file extension. Allowed extensions are : ' +
          acceptedExtensions.toString(),
      );
    }

    if (fileLength > acceptedFileSize) {
      throw AppError.badRequest(
        'File size exceed. Its limit is : ' +
          acceptedFileSize / (1024 * 1024) +
          ' MB',
      );
    }

    return true;
  }
}

export default new MediaValidate();
