import { createAsyncThunk } from "@reduxjs/toolkit";
import { Bid, BidCreationPayload } from "../types/Bid";
import { axiosInstance } from "../services/axiosInstance";
import { API_URL } from "../constants";

export const bidArtwork = createAsyncThunk<Bid, BidCreationPayload>(
  "bid/create",
  async ({ userId, artworkId, amount }) => {
    const response = await axiosInstance.post(`${API_URL}/api/biddings/`, {
      user: userId,
      artwork:artworkId,
      amount,
    });

    console.log("Bidded artwork", response.data);
    return response.data as Bid;
  }
);

export const fetchBiddedArtworks = createAsyncThunk<Bid[]>(
  "bid/fetch",
  async () => {
    const response = await axiosInstance.get("/api/biddings/");

    return response.data as Bid[];
  }
);
export const fetchUserBids = createAsyncThunk<Bid[]>(
  "userBids/fetch",
  async () => {
    const response = await axiosInstance.get(`/api/biddings/me/`);

    return response.data as Bid[];
  }
);
