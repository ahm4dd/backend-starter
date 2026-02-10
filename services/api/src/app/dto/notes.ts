import { z } from 'zod';

export const CreateNoteDTOSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
});

export type CreateNoteDTO = z.infer<typeof CreateNoteDTOSchema>;
