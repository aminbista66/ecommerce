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

export const addToCart = (slug, quantity) => {
  return fetch(`${baseUrl}/product/cart/add/${slug}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({quantity: quantity}),
    credentials: 'include',
  })
}

export const createOrder = (slug) => {
  return fetcj(`${baseUrl}/order/${slug}/`, {
    method: 'POST',
    credentials: 'include',
  })
}