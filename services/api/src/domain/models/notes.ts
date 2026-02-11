export const NOTE_TITLE_MAX_LENGTH = 255;

export type Note = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NewNote = {
  id?: string;
  title: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
