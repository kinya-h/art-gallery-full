// import axios, { AxiosInstance } from "axios";
// import { API_URL } from "../constants";

// const access = localStorage.getItem("tokens")
//   ? JSON.parse(localStorage.getItem("tokens") ?? "")?.access
//   : null;

// export const axiosInstance: AxiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     Authorization: access ? `JWT ${access}` : undefined,
//   },
// });

import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants";

// Function to get the access token from local storage
const getAccessToken = () => {
  const tokens = localStorage.getItem("tokens");
  return tokens ? JSON.parse(tokens)?.access : null;
};

// Create a new Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to update the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
