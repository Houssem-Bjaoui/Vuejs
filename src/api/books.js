
import { http } from "./http";

export async function getAllBooks() {
  const { data } = await http.get("/books/all");
  return data.listeBooks; // d'après le controller/service
}

export async function addBook(payload) {
  // payload conforme à CreateBookDto
  const { data } = await http.post("/books/new", payload);
  return data.data; // { data: createdBook }
}