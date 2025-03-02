import { createSlice } from "@reduxjs/toolkit";
import { Artwork, Collection } from "../../types/artwork";
import {
  fetchArtworks,
  fetchCollections,
  getArtwork,
  searchArtworks,
} from "../../actions/artwork-service";

interface artworkState {
  loading: boolean;
  artworks: Artwork[];
  success: boolean;
  error: string | unknown;
}

export const artworkSlice = createSlice({
  name: "artworks",
  initialState: <artworkState>{
    artworks: [],
    loading: false,
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.artworks = action.payload;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchArtworks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.artworks = action.payload;
      })
      .addCase(searchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getArtwork.pending, (state)=>{
        state.loading = true;
        
      })
      .addCase(getArtwork.fulfilled, (state, action)=>{
        state.loading = false;
      
        const exists = state.artworks.find((artwork) => artwork.id === +action.payload.id);  
        if (exists) {
          state.loading = false;
        }
        state.artworks.push(action.payload);
      })  
  },
});

interface collectionState {
  loading: boolean;
  collections: Collection[];
  error: string | unknown;
}
export const collectionSlice = createSlice({
  name: "collections",
  initialState: <collectionState>{ loading: false, collections: [], error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
