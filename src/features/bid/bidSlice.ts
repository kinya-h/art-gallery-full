import { createSlice } from "@reduxjs/toolkit";
import { Bid } from "../../types/Bid";
import { bidArtwork, fetchUserBids } from "../../actions/bid-service";

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


interface userBidState {
  loading: boolean;
  biddings: Bid[];
  success: boolean;
  error: string | unknown;
} 

export const userBidSlice = createSlice({
  name:"userBid",
  initialState:<userBidState>{
    loading:false,
    biddings:[],
    success:false,
    error:""
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchUserBids.pending,(state)=>{
      state.loading = true;
    })
    .addCase(fetchUserBids.fulfilled,(state,action)=>{
      state.loading = false;
      state.success = true;
      state.biddings = action.payload;
    })
    .addCase(fetchUserBids.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }

})

