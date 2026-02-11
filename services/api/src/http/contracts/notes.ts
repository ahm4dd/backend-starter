import { z } from 'zod';

export const CreateNoteDTOSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
});

export const NoteIdDTOSchema = z.uuid();

export const NoteDTOSchema = z.object({
  id: NoteIdDTOSchema,
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const NoteResponseDTOSchema = z.object({
  data: NoteDTOSchema,
});
