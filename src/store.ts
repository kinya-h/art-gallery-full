import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { bidSlice } from "./features/bid/bidSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { loginSlice, registerSlice } from "./features/login/loginSlice";

const reducer = combineReducers({
  biddingList: bidSlice.reducer,
  registeredUser: registerSlice.reducer,
  authUser: loginSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
