import { NotFoundError } from '@template/shared';
import type { Express } from 'express';
import express from 'express';
import { NotesService } from '../app/services/notes.service.ts';
import type { INotesRepository } from '../domain/repositories/notesRepository.ts';
import { PostgresNotesRepository } from '../infra/repositories/postgres/notesRepository.ts';
import { NotesController } from './controllers/notes.controller.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { requestId } from './middleware/requestId.ts';
import { registerRoutes } from './routes/index.ts';

type AppDependencies = {
  services: {
    noteService: NotesService;
  };
  repos: {
    noteRepo: INotesRepository;
  };
  controllers: {
    noteController: NotesController;
  };
};

type PartialAppDependencies = {
  services?: Partial<AppDependencies['services']>;
  repos?: Partial<AppDependencies['repos']>;
  controllers?: Partial<AppDependencies['controllers']>;
};

export function createApp(dep: PartialAppDependencies = {}): Express {
  const dependencies = createDependencies(dep);
  const app = express();

  app.use(requestId);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  registerRoutes(app, dependencies.controllers);
  app.use((req, _res, next) => {
    next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
  });

  app.use(errorHandler);

  return app;
}

function createDependencies(dep: PartialAppDependencies): AppDependencies {
  const noteRepo = dep.repos?.noteRepo ?? new PostgresNotesRepository();
  const noteService = dep.services?.noteService ?? new NotesService(noteRepo);
  const noteController = dep.controllers?.noteController ?? new NotesController(noteService);

  return {
    services: { noteService },
    repos: { noteRepo },
    controllers: { noteController },
  };
}
