import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants";

const access = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens") ?? "")?.access
  : null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: access ? `JWT ${access}` : undefined,
  },
});
