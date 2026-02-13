import type { NoteContract, NoteResponseContract } from '@template/contracts';
import type { NoteRow } from '../../infra/db/schema.ts';

export function toNoteContract(note: NoteRow): NoteContract {
  return {
    id: note.id,
    title: note.title,
    description: note.description,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

export function toNoteResponseContract(note: NoteRow): NoteResponseContract {
  return {
    data: toNoteContract(note),
  };
}
