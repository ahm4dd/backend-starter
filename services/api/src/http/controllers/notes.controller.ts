import { NotFoundError } from '@template/shared';
import type { Request, Response } from 'express';
import type { NotesService } from '../../app/services/notes.service.ts';
import { CreateNoteDTOSchema, NoteIdDTOSchema } from '../contracts/notes.ts';

export class NotesController {
  private readonly service: NotesService;

  constructor(service: NotesService) {
    this.service = service;
  }

  async create(req: Request, res: Response): Promise<void> {
    const input = CreateNoteDTOSchema.parse(req.body);
    const note = await this.service.create(input);
    res.status(201).json({ data: note });
  }

  async getNoteById(req: Request, res: Response): Promise<void> {
    const paramsId = req.params.id;
    const rawId = Array.isArray(paramsId) ? paramsId[0] : paramsId;
    const id = NoteIdDTOSchema.parse(rawId);
    if (!id) {
      throw new NotFoundError('Note not found');
    }

    const note = await this.service.getNoteById(id);
    if (!note) {
      throw new NotFoundError('Note not found');
    }

    res.status(200).json({ data: note });
  }
}
