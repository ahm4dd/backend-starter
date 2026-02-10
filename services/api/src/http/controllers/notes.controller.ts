import type { Request, Response } from 'express';
import { CreateNoteDTOSchema } from '../../app/dto/notes.ts';
import type { NotesService } from '../../app/services/notes.service.ts';
import { NotFoundError } from '@template/shared';

export class NotesController {
  constructor(private readonly service: NotesService) {}

  async create(req: Request, res: Response): Promise<void> {
    const input = CreateNoteDTOSchema.parse(req.body);
    const note = await this.service.create(input);
    res.status(201).json({ data: note });
  }

  async getNoteById(req: Request, res: Response): Promise<void> {
    // TODO: fix the error, hook up the route to the controller too with :id param
    const id: string = req.params.id;
    const note = await this.service.getNoteById(id);
    if (!note) {
        throw new NotFoundError('Note not found');
    }

    res.status(200).json({data: note});
  }
}
