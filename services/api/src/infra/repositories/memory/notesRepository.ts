import { randomUUID } from 'node:crypto';
import type { INotesRepository } from '../../../app/ports/notesRepository.ts';
import type { NewNoteRow, NoteRow } from '../../db/schema.ts';

export class MemoryNotesRepository implements INotesRepository {
  private readonly notes = new Map<string, NoteRow>();

  constructor(initialNotes: NoteRow[] = []) {
    for (const note of initialNotes) {
      this.notes.set(note.id, { ...note });
    }
  }

  async create(note: NewNoteRow): Promise<NoteRow> {
    const now = new Date();
    const newNote: NoteRow = {
      id: randomUUID(),
      title: note.title,
      description: note.description ?? null,
      createdAt: now,
      updatedAt: now,
    };

    this.notes.set(newNote.id, newNote);
    return { ...newNote };
  }

  async findById(id: string): Promise<NoteRow | null> {
    const note = this.notes.get(id);
    if (!note) {
      return null;
    }

    return { ...note };
  }
}
