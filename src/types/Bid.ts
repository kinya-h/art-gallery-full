import { User } from "./User";
import { Artwork } from "./artwork";

export type Bid = {
  id: number;
  user: User;
  artwork: Artwork;
  amount: number;
};

export interface BidCreationPayload {
  userId: number;
  artworkId: number;
  amount: number;
}
export interface UserBidsPayload {
  userId: number;
}
