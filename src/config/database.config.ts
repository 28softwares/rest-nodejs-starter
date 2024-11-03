import { DataSource } from 'typeorm';
import { DotenvConfig } from './env.config';

const AppDataSource = new DataSource({
  type: DotenvConfig.DB_TYPE as 'postgres',
  host: DotenvConfig.DB_HOST,
  port: +DotenvConfig.DB_PORT,
  username: DotenvConfig.DB_USERNAME,
  password: DotenvConfig.DB_PASSWORD,
  database: DotenvConfig.DB_NAME,
  entities: [`${__dirname}/../entities/**/*.entity.ts`], // use path.join() for windows
  synchronize: true,
  // logging: true,
  // dropSchema: true,
});

export { AppDataSource };
