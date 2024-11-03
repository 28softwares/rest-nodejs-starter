import 'reflect-metadata';
import express from 'express';
import { DotenvConfig } from './config/env.config';
import { AppDataSource } from './config/database.config';
import { configMiddleware } from './middlewares';
import { RedisUtil } from './utils/redis.util';

class Server {
  constructor() {
    this.bootstrap();
  }

  // bootstrap
  async bootstrap() {
    AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
        const app = express();
        configMiddleware(app);
        new RedisUtil().initialize();
        app.listen(DotenvConfig.PORT, () => {
          console.log('TCP server established');
        });
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }
}

new Server();
