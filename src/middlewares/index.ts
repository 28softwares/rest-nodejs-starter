import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../routes/routes";
import errorHandler from "../middlewares/errorhandler.middleware";
import { EnvConfiguration, Environment } from "../config/env.config";
import cors from "cors";

export const configMiddleware = (app: express.Application) => {
  app.use(express.json(), cors({ origin: "*" }));

  RegisterRoutes(app);

  if (EnvConfiguration.NODE_ENV === Environment.DEVELOPMENT) {
    const swaggerDocument = require("../../public/swagger.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  app.use(errorHandler);
};
