import express from 'express';
import {
  Controller,
  FormField,
  Post,
  Route,
  Request,
  UploadedFile,
} from 'tsoa';
import path from 'path';
import fs from 'fs';
import mediaService from '../../services/media/media.service';
import { DotenvConfig } from '../../config/env.config';
import { MediaType } from '../../constants/appConstant';

@Route('media')
class MediaController extends Controller {
  @Post('/')
  async upload(
    @Request() req: express.Request,
    @UploadedFile() file: Express.Multer.File,
    @FormField() mediaType: string,
  ) {
    //enum => array. (values)
    const validMediaTypeList = Object.values(MediaType);
    if (!validMediaTypeList.includes(mediaType as MediaType)) {
      return {
        status: 'error',
        message: 'Invalid Media Type',
      };
    }

    const validateResponse = this.validate(mediaType as MediaType, file);
    if (validateResponse !== true) return validateResponse;
    // upload.

    //generate file name;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const updatedFileName = uniqueSuffix + ext;

    if (!fs.existsSync(DotenvConfig.TEMP_FOLDER_PATH)) {
      fs.mkdirSync(DotenvConfig.TEMP_FOLDER_PATH);
    }

    fs.writeFileSync(
      path.resolve(DotenvConfig.TEMP_FOLDER_PATH, updatedFileName),
      file.buffer,
    );

    const res = await mediaService.uploadSingle(
      mediaType as MediaType,
      file.mimetype,
      updatedFileName,
    );
    return res;
  }

  //
  private validate(mediaType: MediaType, file: Express.Multer.File) {
    let acceptedExtensions: string[] = [];
    let fileSize: number = 0;

    //
    switch (mediaType) {
      case MediaType.PROFILE_IMAGE:
        acceptedExtensions = ['.jpeg', '.png'];
        fileSize = 1024 * 1024 * 1; // 1MB
        break;

      default:
    }

    //extension validation.
    if (!acceptedExtensions.includes(path.extname(file.originalname))) {
      return {
        status: 'error',
        message:
          'File extension not supported. Supported extensions are : ' +
          acceptedExtensions.toString(),
      };
    }

    //fileSize validation.
    if (file.size > fileSize) {
      return {
        status: 'error',
        message:
          'File size exceeded. Maximum size is : ' +
          fileSize / (1024 * 1024) +
          ' MB',
      };
    }

    return true;
  }
}

export { MediaController };
