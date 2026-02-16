import { CreateNoteBodySchema, NoteIdParamSchema } from "@template/contracts";
import { NotFoundError } from "@template/shared";
import type { Request, Response } from "express";
import type { NotesService } from "../../app/services/notes.service.ts";
import { toNoteResponseContract } from "../mappers/notes.mapper.ts";

export class NotesController {
  private readonly service: NotesService;

  constructor(service: NotesService) {
    this.service = service;
  }

  async create(req: Request, res: Response): Promise<void> {
    const input = CreateNoteBodySchema.parse(req.body);
    const note = await this.service.create(input);
    res.status(201).json(toNoteResponseContract(note));
  }

  async getNoteById(req: Request, res: Response): Promise<void> {
    const paramsId = req.params.id;
    const rawId = Array.isArray(paramsId) ? paramsId[0] : paramsId;
    const id = NoteIdParamSchema.parse(rawId);

    const note = await this.service.getNoteById(id);
    if (!note) {
      throw new NotFoundError("Note not found");
    }

    res.status(200).json(toNoteResponseContract(note));
  }
}
