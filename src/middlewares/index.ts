import express, { urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../routes/routes';
import errorHandler from '../middlewares/errorhandler.middleware';
import { DotenvConfig, Environment } from '../config/env.config';
import cors from 'cors';
import swaggerDocument from '../../public/swagger.json';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

export const configMiddleware = (app: express.Application) => {
  app.use(express.json(), cors({ origin: '*' }), compression());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 10 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 10 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  });
  app.use(limiter);
  app.use(cors());
  app.use(
    urlencoded({
      extended: true,
    }),
  );

  if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/swagger-json', (req, res) => res.send(swaggerUi));
  }
  app.use(express.static('data'));
  app.use(express.static(DotenvConfig.MEDIA_UPLOAD_PATH!));

  RegisterRoutes(app);
  app.use(errorHandler);
};
