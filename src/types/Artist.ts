import { User } from "./User";

export type Artist = {
  id: number;
  user: User;
  bio: string;
  contactInfo: string;
};

export type ArtistCreatePayload = {
  userId: number;
  bio: string;
  contactInfo: string;
};
