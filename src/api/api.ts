import axios from "axios";

const defaultBase =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://127.0.0.1:5000";

const API_URL =
  (import.meta.env?.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  (typeof window !== "undefined" &&
    window.localStorage.getItem("receiver_api_base")?.trim()) ||
  defaultBase;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
