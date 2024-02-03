import { createSlice } from "@reduxjs/toolkit";
import { Bid } from "../../types/Bid";
import { bidArtwork } from "../../actions/bid-service";

interface bidState {
  loading: boolean;
  biddings: Bid[];
  success: boolean;
  error: string | unknown;
}

export const bidSlice = createSlice({
  name: "bid",
  initialState: {
    loading: false,
    biddings: [],
    success: false,
    error: "",
  } as bidState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bidArtwork.pending, (state) => {
        state.loading = true;
      })

      .addCase(bidArtwork.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.biddings.push(action.payload);
      })
      .addCase(bidArtwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
