import { randomUUID } from 'node:crypto';
import type { NewNote, Note } from '../../../domain/models/notes.ts';
import type { INotesRepository } from '../../../domain/repositories/notesRepository.ts';

export class MemoryNotesRepository implements INotesRepository {
  private readonly notes = new Map<string, Note>();

  constructor(initialNotes: Note[] = []) {
    for (const note of initialNotes) {
      this.notes.set(note.id, { ...note });
    }
  }

  async create(note: NewNote): Promise<Note> {
    const now = new Date();
    const newNote: Note = {
      id: note.id ?? randomUUID(),
      title: note.title,
      description: note.description ?? null,
      createdAt: note.createdAt ?? now,
      updatedAt: note.updatedAt ?? now,
    };

    this.notes.set(newNote.id, newNote);
    return { ...newNote };
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.get(id);
    if (!note) {
      return null;
    }

    return { ...note };
  }
}
