export type Collection = {
  id: number;
  title: string;
};

export type Artwork = {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
  artist: string;
  created_at: number;
  price: number;
  collection: Collection;
  highest_bid: number;
};

export type ArtworkCreatePayload = {
  title: string;
  imageSrc: string;
  description: string;
  artist: number;
  project: number;
  price: number;
  collection: number;
};
