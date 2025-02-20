import { createAsyncThunk } from "@reduxjs/toolkit";
import { Bid, BidCreationPayload } from "../types/Bid";
import { axiosInstance } from "../services/axiosInstance";
import { API_URL } from "../constants";
import { PurchaseInfo } from "./purchaseInfo";

export const purhcaseArtwork = createAsyncThunk<
  PurchaseInfo,
  { buyerUserId: number; artworkId: number; amount: number }
>("purchase/create", async ({ buyerUserId, artworkId, amount }) => {
  const response = await axiosInstance.post(`${API_URL}/api/purchases/`, {
    buyer: buyerUserId,
    artwork: artworkId,
    amount,
  });

  console.log("Bought artwork", response.data);
  return response.data as PurchaseInfo;
});


export const fetchPurchasedArtworks = createAsyncThunk<PurchaseInfo[]>(
  "purchases/fetch",
  async () => {
    const response = await axiosInstance.get("/api/purchases/");

    return response.data as PurchaseInfo[];
  }
);


export const fetchUserPurchases = createAsyncThunk<Bid[]>(
  "purchases/fetch",
  async () => {
    const response = await axiosInstance.get(`/api/purchases/me/`);

    return response.data as Bid[];
  }
);
