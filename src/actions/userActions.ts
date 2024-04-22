// import { Tokens, User } from "../features/login/userSlice";
import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Token } from "../types/Token";
import { User } from "../types/User";
import { API_URL } from "../constants";
import { axiosInstance } from "../services/axiosInstance";

export const signIn = createAsyncThunk<string, { email: string }>(
  "user/login",
  async ({ email }) => {
    localStorage.setItem("user", JSON.stringify(email));

    return email as string;
  }
);

export const loginUser = createAsyncThunk<
  Token,
  { username: string; password: string }
>("user/login", async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/auth/jwt/create/`, {
    username,
    password,
  });

  if (response.status === 200) {
    // Store the JWT token in local storage.
    localStorage.setItem("tokens", JSON.stringify(response.data));
  }

  return response.data as Token;
});

export const signUpUser = createAsyncThunk<
  User,
  { username: string; email: string; password: string }
>("auth/registerUser", async ({ username, email, password }) => {
  const response = await axios.post(`${API_URL}/auth/users/`, {
    username,
    email,
    password,
  });

  console.log("RESPONSE DATA = ", response.data);
  return response.data as User;
});

export const getUser = createAsyncThunk<User>("user/fetch", async () => {
  const response = await axiosInstance.get(`${API_URL}/auth/users/me`);

  return response.data as User;
});

export const logoutUser = createAsyncThunk("user/logout" , async ()=>{
  if (typeof window !== "undefined") {
    localStorage.removeItem("tokens");

  }
  
})

// export const fetchUserData =
//   (accessToken: string) => async (dispatch: Dispatch) => {
//     axiosInstance
//       .post("api/customers/", {
//         headers: {
//           Authorization: `JWT ${accessToken}`,
//         },
//       })
//       .then((response: AxiosResponse) => {
//         console.log(response.data);
//       })
//       .catch((error: string) => {
//         console.log(error);
//       });
//   };

// const SignUpCustomer = async (access) => {
//   //get the user via the access token
//   const axiosInstance = axios.create({
//     // baseURL: "https://rashel-production.up.railway.app",
//     baseURL: "http://localhost:5000",
//     headers: {
//       Authorization: `JWT ${access.data.access}`,
//     },
//   });
//   const user_data = await axiosInstance
//     .get("/auth/users/")
//     .then((response) => {
//       console.log("User ===> ", response);
//       // SignUp user as a customer on successful response
//       const customerResponse = axiosInstance
//         .put(`${API_URL}/api/customers/me/`, {
//           id: response.data.id,
//           phone,
//           email,
//         })
//         .then((res) => {
//           if (res.status === 200) {
//             navigate("/login");
//           }
//         });

//       console.log("customerResponse", customerResponse);
//     })
//     .catch((error) => {
//       setLoading(false);
//       console.log(error);
//     });
//   console.log("user data", user_data);
// };
