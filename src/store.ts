import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bidSlice } from "./features/bid/bidSlice";
import { userBiddingSlice } from "./features/bid/userBiddingSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
  loginSlice,
  registerSlice,
  userDetailsSlice,
} from "./features/login/loginSlice";
import { artworkSlice } from "./features/artwork/artworkSlice";
import { artistSlice, currentArtistSlice } from "./features/artist/artistSlice";

const reducer = combineReducers({
  biddingList: bidSlice.reducer,
  registeredUser: registerSlice.reducer,
  tokens: loginSlice.reducer,
  featuredArtworks: artworkSlice.reducer,
  userBiddings: userBiddingSlice.reducer,
  authenticatedUser: userDetailsSlice.reducer,
  artists: artistSlice.reducer,
  currentAartist: currentArtistSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
