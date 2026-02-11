import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { NOTE_TITLE_MAX_LENGTH } from '../../domain/models/notes.ts';

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: NOTE_TITLE_MAX_LENGTH }).notNull(),
  description: text(),
  // userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export type NoteRow = InferSelectModel<typeof notes>;
export type NewNoteRow = InferInsertModel<typeof notes>;
