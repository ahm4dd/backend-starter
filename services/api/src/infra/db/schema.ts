import { NOTE_TITLE_MAX_LENGTH } from "@template/contracts";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  check,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const notes = pgTable(
  "notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: NOTE_TITLE_MAX_LENGTH }).notNull(),
    description: text(),
    // userId: uuid('user_id').notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    check("notes_title_not_empty", sql`char_length(trim(${table.title})) > 0`),
  ],
);

export type NoteRow = InferSelectModel<typeof notes>;
export type NewNoteRow = InferInsertModel<typeof notes>;
