import { Artist } from "./Artist";

export type Project = {
  id: number;
  title: string;
  description: string;
  creator: Artist;
  active: boolean;
  created_at: string;
  visibility: string;
};

export type ProjectCreatePayload = {
  title: string;
  description: string;
  creator: Artist;
};
