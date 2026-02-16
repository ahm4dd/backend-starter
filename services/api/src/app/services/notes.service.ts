import { type CreateNoteBody, CreateNoteBodySchema } from "@template/contracts";
import type { NewNoteRow, NoteRow } from "../../infra/db/schema.ts";
import type { INotesRepository } from "../ports/notesRepository.ts";

export class NotesService {
  private readonly repo: INotesRepository;

  constructor(repo: INotesRepository) {
    this.repo = repo;
  }

  async create(note: CreateNoteBody): Promise<NoteRow> {
    const input = CreateNoteBodySchema.parse(note);

    return await this.repo.create({
      title: input.title,
      description: input.description ?? null,
    } satisfies NewNoteRow);
  }

  async getNoteById(id: string): Promise<NoteRow | null> {
    return await this.repo.findById(id);
  }
}
