// src/api/authors.js
import { http } from "./http";

export async function getAllAuthors() {
  const { data } = await http.get("/author/all");
  return data; // tableau d'auteurs
}

export async function addAuthor(payload) {
  const { data } = await http.post("/author/add", payload);
  return data;
}