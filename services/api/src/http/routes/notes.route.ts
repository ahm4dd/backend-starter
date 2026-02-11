import { Router } from 'express';
import type { NotesController } from '../controllers/notes.controller.ts';

type NotesRouteDependencies = {
  noteController: NotesController;
};

export function createNotesRouter({ noteController }: NotesRouteDependencies): Router {
  const router = Router();

  router.post('/', async (req, res) => noteController.create(req, res));
  router.get('/:id', async (req, res) => noteController.getNoteById(req, res));

  return router;
}
