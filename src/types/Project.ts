import { User } from "./User";

export type Project = {
  title: string;
  description: string;
  creator: User;
  active: boolean;
  created_at: string;
};

export type ProjectCreatePayload = {
  title: string;
  description: string;
  creator: User;
};
