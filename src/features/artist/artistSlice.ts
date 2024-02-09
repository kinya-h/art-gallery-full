import { createSlice } from "@reduxjs/toolkit";
import { Artist } from "../../types/Artist";
import {
  createArtistAccount,
  fetchArtists,
  getCurrentArtist,
} from "../../actions/artist-service";

interface artistState {
  loading: boolean;
  artists: Artist[];
  success: boolean;
  error: string | unknown;
}

export const artistSlice = createSlice({
  name: "artists",
  initialState: <artistState>{
    loading: false,
    artists: [],
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.artists = action.payload;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createArtistAccount.pending, (state) => {
        state.loading = false;
      })
      .addCase(createArtistAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.artists.push(action.payload);
      })
      .addCase(createArtistAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

interface currentArtistState {
  loading: boolean;
  artist: Artist;
  success: boolean;
  error: string | unknown;
}

export const currentArtistSlice = createSlice({
  name: "artist",
  initialState: <currentArtistState>{
    loading: false,
    artist: {},
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentArtist.pending, (state) => {
        state.loading = false;
      })
      .addCase(getCurrentArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.artist = action.payload;
      })
      .addCase(getCurrentArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createArtistAccount.pending, (state) => {
        state.loading = false;
      })
      .addCase(createArtistAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.artist = action.payload;
      })
      .addCase(createArtistAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
