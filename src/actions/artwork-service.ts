import { createAsyncThunk } from "@reduxjs/toolkit";
import { Artwork, ArtworkCreatePayload } from "../types/artwork";
import { axiosInstance } from "../services/axiosInstance";
import axios from "axios";
import { API_URL } from "../constants";

export const addArtwork = createAsyncThunk<Artwork, ArtworkCreatePayload>(
  "artwork/create",
  async ({
    title,
    imageSrc,
    description,
    artist,
    created_at,
    price,
    category,
  }) => {
    const response = await axiosInstance.post("/api/artworks/", {
      title,
      imageSrc,
      description,
      artist,
      created_at,
      price,
      category,
    });

    console.log("Bidded artwork", response.data);
    return response.data as Artwork;
  }
);

export const fetchArtworks = createAsyncThunk<Artwork[]>(
  "artworks/fetchArtworks",
  async () => {
    const response = await axios.get(`${API_URL}/api/artworks/`);

    console.log("Artworks:: ", response.data);
    return response.data as Artwork[];
  }
);
