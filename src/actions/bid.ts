import { createAsyncThunk } from "@reduxjs/toolkit";
import { Bid, BidCreationPayload } from "../types/Bid";
import { axiosInstance } from "../services/axiosInstance";

export const bidArtwork = createAsyncThunk<Bid, BidCreationPayload>(
  "bid/create",
  async ({ user, artwork, amount }) => {
    const response = await axiosInstance.post("/api/biddings/", {
      user,
      artwork,
      amount,
    });

    console.log("Bidded artwork", response.data);
    return response.data as Bid;
  }
);
