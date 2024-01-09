import dotenv from "dotenv";

dotenv.config();
class EnvConfiguration {
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;

  static DB_TYPE = process.env.DB_TYPE;
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT || 5432;
  static DB_USERNAME = process.env.DB_USERNAME;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_NAME = process.env.DB_NAME;

  static LOG_LEVEL = process.env.LOG_LEVEL;
}

export enum Environment {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
  TEST = "TEST",
}

export { EnvConfiguration };
