import { MediaType } from '../../constants/appConstant';
import { Media } from '../../entities';

class MediaService {
  async uploadSingle(mediaType: MediaType, mimeType: string, fileName: string) {
    const m = new Media();
    m.name = fileName;
    m.mediaType = mediaType;
    m.mimeType = mimeType;
    return await m.save();
  }
}

export default new MediaService();
