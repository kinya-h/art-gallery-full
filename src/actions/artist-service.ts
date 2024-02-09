import { createAsyncThunk } from "@reduxjs/toolkit";
import { Artist, ArtistCreatePayload } from "../types/Artist";
import { axiosInstance } from "../services/axiosInstance";

export const fetchArtists = createAsyncThunk<Artist[]>(
  "artists/fetch",
  async () => {
    const response = await axiosInstance.get("/api/artists/");

    return response.data as Artist[];
  }
);

export const getCurrentArtist = createAsyncThunk<Artist>(
  "artist/fetch",
  async () => {
    const response = await axiosInstance.get("/api/artists/me/");
    return response.data[0] as Artist;
  }
);

export const createArtistAccount = createAsyncThunk<
  Artist,
  ArtistCreatePayload
>("artist/create", async ({ userId, bio, contactInfo }) => {
  const response = await axiosInstance.post("/api/artists/", {
    user: userId,
    bio,
    contact_info: contactInfo,
  });

  return response.data as Artist;
});
