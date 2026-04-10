
import { defineStore } from "pinia";
import { getAllBooks, addBook } from "../api/books";

export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        this.books = await getAllBooks();
      } catch (e) {
        this.error = e?.response?.data ?? e.message;
      } finally {
        this.loading = false;
      }
    },
    async createBook(payload) {
      this.loading = true;
      this.error = null;
      try {
        const created = await addBook(payload);
        this.books.unshift(created);
        return created;
      } catch (e) {
        this.error = e?.response?.data ?? e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});