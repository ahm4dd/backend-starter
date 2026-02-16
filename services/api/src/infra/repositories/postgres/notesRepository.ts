import { eq } from "drizzle-orm";
import type { INotesRepository } from "../../../app/ports/notesRepository.ts";
import { type AppDb, db } from "../../db/index.ts";
import { type NewNoteRow, type NoteRow, notes } from "../../db/schema.ts";

export class PostgresNotesRepository implements INotesRepository {
  private readonly database: AppDb;

  constructor(database: AppDb = db) {
    this.database = database;
  }

  async create(note: NewNoteRow): Promise<NoteRow> {
    const [createdNote] = await this.database
      .insert(notes)
      .values(note)
      .returning();
    if (!createdNote) {
      throw new Error("Failed to create note");
    }

    return createdNote;
  }

  async findById(id: string): Promise<NoteRow | null> {
    const foundNotes = await this.database
      .select()
      .from(notes)
      .where(eq(notes.id, id))
      .limit(1);
    return foundNotes[0] ?? null;
  }
}
