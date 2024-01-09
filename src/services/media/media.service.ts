import { Media, MediaType } from "../../entities";

class MediaService {
  async uploadSingle(mediaType: MediaType, mimeType: string, fileName: string) {
    let m = new Media();
    m.name = fileName;
    m.mediaType = mediaType;
    m.mimeType = mimeType;
    return await m.save();
  }
}

export default new MediaService();
