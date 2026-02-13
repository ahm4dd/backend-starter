import type { NewNoteRow, NoteRow } from '../../infra/db/schema.ts';

export interface INotesRepository {
  create(note: NewNoteRow): Promise<NoteRow>;
  findById(id: string): Promise<NoteRow | null>;
}
