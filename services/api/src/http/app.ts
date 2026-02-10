import type { Express } from 'express';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.ts';
import { requestId } from './middleware/requestId.ts';

type AppDependencies = {
  services: {};
  repos: {};
  controllers: {};
};

// type RouteDependencies = AppDependencies['controllers'];

export function createApp(_dep: AppDependencies = {}): Express {
  const app = express();

  app.use(requestId);
  app.use(express.urlencoded({ extended: true })); //
  app.use(express.json());

  app.use(errorHandler);

  return app;
}

// function createRoutes(routes: RouteDependencies) {

// }
