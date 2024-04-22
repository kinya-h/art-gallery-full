import { createSlice } from "@reduxjs/toolkit";
import { PurchaseInfo } from "../../actions/purchaseInfo";
import { fetchPurchasedArtworks, purhcaseArtwork } from "../../actions/purchase-service";



interface buySliceState {
  loading: boolean;
  purchase: PurchaseInfo;
  success: boolean;
  error: string | unknown;
}
export const buySlice = createSlice({
  name: "buy",
  initialState: <buySliceState>{
    loading: false,
    purchase: {} as PurchaseInfo,
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(purhcaseArtwork.pending , (state)=>{
      state.loading = true;
    })
    .addCase(purhcaseArtwork.fulfilled , (state,action)=>{
      state.loading = false;
      state.success = false;
      state.purchase = action.payload;
    })
    .addCase(purhcaseArtwork.rejected, (state,action)=>{
      
      state.error = action.payload;
    })
  },
});

interface purchaseState {
  loading: boolean;
  purchases: PurchaseInfo[];
  success: boolean;
  error: string | unknown;
}



export const purchaseSlice = createSlice({
  name: "buy",
  initialState: <purchaseState>{
    loading: false,
    purchases: [],
    success: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPurchasedArtworks.pending , (state)=>{
      state.loading = true;
    })
    .addCase(fetchPurchasedArtworks.fulfilled , (state,action)=>{
      state.loading = false;
      state.success = false;
      state.purchases = action.payload;
    })
    .addCase(fetchPurchasedArtworks.rejected, (state,action)=>{
      
      state.error = action.payload;
    })
  },
});
