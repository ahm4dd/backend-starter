import { z } from 'zod';

export const CreateNoteBodySchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
});

export const NoteIdParamSchema = z.uuid();

export const NoteSchema = z.object({
  id: NoteIdParamSchema,
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const NoteResponseSchema = z.object({
  data: NoteSchema,
});

export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>;
export type NoteIdParam = z.infer<typeof NoteIdParamSchema>;
export type NoteContract = z.infer<typeof NoteSchema>;
export type NoteResponseContract = z.infer<typeof NoteResponseSchema>;
