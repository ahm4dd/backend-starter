import { ValidationError } from '@template/shared';
import type { NewNote, Note } from '../../domain/models/notes.ts';
import type { INotesRepository } from '../../domain/repositories/notesRepository.ts';

export class NotesService {
  static readonly MAX_TITLE_LENGTH = 255;
  constructor(private readonly repo: INotesRepository) {}

  async create(note: NewNote): Promise<Note> {
    note.title = note.title.trim();
    note.description = note.description ? note.description.trim() : note.description;
    if (note.title.length > NotesService.MAX_TITLE_LENGTH) {
      throw new ValidationError(
        `Note title must not exceed the ${NotesService.MAX_TITLE_LENGTH} character length`,
      );
    }

    const newNote = await this.repo.create(note);
    return newNote;
  }

  async getNoteById(id: string): Promise<Note | null> {
    return await this.repo.findById(id);
  }
}
