import { eq } from 'drizzle-orm';
import type { NewNote, Note } from '../../../domain/models/notes.ts';
import type { INotesRepository } from '../../../domain/repositories/notesRepository.ts';
import { type AppDb, db } from '../../db/index.ts';
import { notes } from '../../db/schema.ts';

export class PostgresNotesRepository implements INotesRepository {
  private readonly database: AppDb;

  constructor(database: AppDb = db) {
    this.database = database;
  }

  async create(note: NewNote): Promise<Note> {
    const [createdNote] = await this.database.insert(notes).values(note).returning();
    if (!createdNote) {
      throw new Error('Failed to create note');
    }

    return createdNote;
  }

  async findById(id: string): Promise<Note | null> {
    const foundNotes = await this.database.select().from(notes).where(eq(notes.id, id)).limit(1);
    return foundNotes[0] ?? null;
  }
}
