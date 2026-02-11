import { ValidationError } from '@template/shared';
import { type NewNote, NOTE_TITLE_MAX_LENGTH, type Note } from '../../domain/models/notes.ts';
import type { INotesRepository } from '../../domain/repositories/notesRepository.ts';

export class NotesService {
  private readonly repo: INotesRepository;

  constructor(repo: INotesRepository) {
    this.repo = repo;
  }

  async create(note: NewNote): Promise<Note> {
    note.title = note.title.trim();
    note.description = note.description ? note.description.trim() : note.description;
    if (note.title.length > NOTE_TITLE_MAX_LENGTH) {
      throw new ValidationError(
        `Note title must not exceed the ${NOTE_TITLE_MAX_LENGTH} character length`,
      );
    }

    const newNote = await this.repo.create(note);
    return newNote;
  }

  async getNoteById(id: string): Promise<Note | null> {
    return await this.repo.findById(id);
  }
}
