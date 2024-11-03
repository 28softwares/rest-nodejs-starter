import dotenv from 'dotenv';
import path from 'path';

export enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

class DotenvConfig {
  // APP
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;

  // DB
  static DB_TYPE = process.env.DB_TYPE || 'postgres';
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT || 5432;
  static DB_USERNAME = process.env.DB_USERNAME;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_NAME = process.env.DB_NAME;

  // MAIL
  static MAIL_HOST = process.env.MAIL_HOST;
  static MAIL_USER = process.env.MAIL_USER;
  static MAIL_PASSWORD = process.env.MAIL_PASSWORD;

  // LOG
  static LOG_LEVEL = process.env.LOG_LEVEL;

  // URL
  static FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
  static BASE_URL = process.env.BASE_URL;
  static MEDIA_TEMP_PATH = process.env.MEDIA_TEMP_PATH!;

  // MEDIA
  static MEDIA_UPLOAD_PATH = process.env.MEDIA_UPLOAD_PATH;
  static TEMP_FOLDER_PATH = process.env.TEMP_FOLDER_PATH!;
}

export { DotenvConfig };
