import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, logoutUser, signIn, signUpUser } from "../../actions/userActions";
import { Token } from "../../types/Token";
import { User } from "../../types/User";

interface LoginState {
  token: Token;
  name: string;
  error: string | unknown;
  loading: boolean;
  success: boolean;
}

interface RegisterState {
  user: User;
  loading: boolean;
  success: boolean;
  error: string | unknown;
}

interface UserDetailsState {
  user: User;
  loading: boolean;
  success: boolean;
  error: string | unknown;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface UserUpdateProfileState {
  userInfo: Token;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (
//     { email, password }: { email: string; password: string },
//     thunkAPI
//   ) => {
//     try {
//       const response = await axios.post("api/users/login", { email, password });
//       localStorage.setItem("tokens", JSON.stringify(response.data));

//       return JSON.stringify(response.data);
//     } catch (error) {
//       console.log("error = ", error);
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// const tokensFromStorage: string | null = localStorage.getItem("tokens");
// const userInfoFromStorage: Tokens = tokensFromStorage
//   ? JSON.parse(tokensFromStorage)
//   : { access: "", refresh: "" };

// const userFromStorage: string | null = localStorage.getItem("user");
// const customer_id: string = userFromStorage ? JSON.parse(userFromStorage) : "";

const tokensFromStorage: string | null =
  typeof window !== "undefined" ? localStorage.getItem("tokens") : null;
const userInfoFromStorage: Token = tokensFromStorage
  ? JSON.parse(tokensFromStorage)
  : { access: "", refresh: "" };

const userFromStorage: string | null =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const customer_id: string = userFromStorage
  ? typeof userFromStorage === "string"
    ? JSON.parse(userFromStorage)
    : "" // handle non-string case as needed
  : ""; // default value when userFromStorage is null

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: userInfoFromStorage,
    name: customer_id,
    error: "",
    loading: false,
    success: false,
  } as LoginState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state: LoginState, action: PayloadAction<Token>) => {
      state.loading = false;
      state.success = true;
      state.token = action.payload;
    },
    loginFail: (state, action: PayloadAction<string | unknown>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    logOut: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("tokens");
      }
      state.token = { access: "", refresh: "" };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.name = action.payload;
        // const tokens = action.payload; // Extract the payload from action
        // loginSuccess(tokens);
        // state.tokens = tokens;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message ?? "Sign up failed.";
      })
      .addMatcher(loginSuccess.match, (state, action) => {
        // Update the state using the loginSuccess logic
        state.token = action.payload;
      });
  },
});

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {} as User,
    loading: false,
    success: false,
    error: "",
  } as RegisterState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const user = action.payload; // Extract the payload from action
        state.user = user;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message ?? "Sign up failed.";
      });
    //   .addMatcher(registerSuccess.match, (state, action) => {
    //     state.user = action.payload;
    //   });
  },
});

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: {},
    loading: false,
    success: false,
    error: "",
  } as UserDetailsState,
  reducers: {
    logOut: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("tokens");
      }
      state.user = {} as User;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      }).addCase(logoutUser.fulfilled, (state)=>{
        state.user = {}  as User;
      })
      
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  } as UsersState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
})

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {
    userInfo: {},
    loading: false,
    error: null,
    success: false,
  } as UserUpdateProfileState,
  reducers: {
    userUpdateProfileRequest: (state) => {
      state.loading = true;
    },
    userUpdateProfileSuccess: (state, action: PayloadAction<Token>) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userUpdateProfileFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, logOut, getName } =
  loginSlice.actions;

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFail } =
  usersSlice.actions;
export const {
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
} = userUpdateProfileSlice.actions;

export const { reducer: loginReducer } = loginSlice;

export const { reducer: registerReducer } = registerSlice;

export const { reducer: userDetailsReducer } = userDetailsSlice;

export const { reducer: usersReducer } = usersSlice;

export const { reducer: userUpdateProfileReducer } = userUpdateProfileSlice;
