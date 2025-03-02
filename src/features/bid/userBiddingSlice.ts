import { createSlice } from "@reduxjs/toolkit";
// import { Bid } from "../types/Bid";
import { fetchUserBids } from "../../actions/bid-service";
import { Bid } from "../../types/Bid";

interface userBiddingState {
  bidId: number;
  loading: boolean;
  userBiddings: Bid[];
  success: boolean;
  error: string | unknown;
}
export const userBiddingSlice = createSlice({
  name: "userBiddings",
  initialState: <userBiddingState>{
    bidId:0,
    loading: false,
    userBiddings: [],
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBids.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userBiddings = action.payload;
        state. bidId = state.userBiddings[state.userBiddings.length-1].id; 
      })
      .addCase(fetchUserBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
