import { createSlice } from "@reduxjs/toolkit";
import { Artwork } from "../../types/artwork";
import { fetchArtworks } from "../../actions/artwork-service";

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
      });
  },
});
