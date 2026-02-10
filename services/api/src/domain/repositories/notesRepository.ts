import type { NewNote, Note } from '../models/notes.ts';

export interface INotesRepository {
  create(note: NewNote): Promise<Note>;
  findById(id: string): Promise<Note | null>;
}
