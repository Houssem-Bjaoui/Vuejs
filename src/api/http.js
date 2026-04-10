
import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3000",
});

// Si tu veux injecter le token automatiquement
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ou store
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});