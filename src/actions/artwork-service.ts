import { createAsyncThunk } from "@reduxjs/toolkit";
import { Artwork, ArtworkCreatePayload, Collection } from "../types/artwork";
import { axiosInstance } from "../services/axiosInstance";
import { API_URL } from "../constants";
import axios from "axios";

export const createArtwork = createAsyncThunk<Artwork, ArtworkCreatePayload>(
  "artwork/create",
  async ({
    title,
    imageSrc,
    description,
    artist,
    project,
    price,
    collection,
  }) => {
    const response = await axiosInstance.post("/api/artworks/", {
      title,
      imageSrc,
      description,
      artist,
      project,
      price,
      collection,
    });

    console.log("Bidded artwork", response.data);
    return response.data as Artwork;
  }
);

export const fetchArtworks = createAsyncThunk<Artwork[]>(
  "artworks/fetch",
  async () => {
    const response = await axios.get(`${API_URL}/api/artworks/`);

    console.log("Artworks:: from the backend", response.data);
    return response.data as Artwork[];
  }
);

export const fetchCollections = createAsyncThunk<Collection[]>(
  "collections/fetch",
  async () => {
    const response = await axios.get(`${API_URL}/api/collections/`);

    return response.data as Collection[];
  }
);

export const searchArtworks = createAsyncThunk<
  Artwork[],
  { searchTerm: string }
>("artworks/search", async ({ searchTerm }) => {
  const response = await axiosInstance.get(
    `${API_URL}/api/artworks/?search=${searchTerm}`
  );

  console.log("FILTERED ARTWORKS == ", response.data);

  return response.data as Artwork[];
});


export const getArtwork = createAsyncThunk<Artwork, number>(
  "artwork/get",
  async (id) => { 

    const response = await axios.get(`${API_URL}/api/artworks/${id}/`);
    return response.data as Artwork;
  }
);