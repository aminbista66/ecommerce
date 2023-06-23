import axios from "axios";
import { baseUrl } from "./baseURL";

export const request = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "same-origin",
  timeout: 300000,
});
