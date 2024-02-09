import { User } from "./User";

export type Artist = {
  user: User;
  bio: string;
  contactInfo: string;
};

export type ArtistCreatePayload = {
  userId: number;
  bio: string;
  contactInfo: string;
};
