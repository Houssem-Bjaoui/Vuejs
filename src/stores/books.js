
import { defineStore } from "pinia";
import { getAllBooks, addBook, updateBook, deleteBook } from "../api/books";

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


    async editBook(id, payload) {
      this.loading = true;
      this.error = null;
      try {
        const res = await updateBook(id, payload);
        // Mettre à jour le state local
        const idx = this.books.findIndex((b) => b.id === id);
        if (idx !== -1 && res?.response) {
          this.books[idx] = res.response;
        }
        return res;
      } catch (e) {
        this.error = e?.response?.data ?? e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },


    
    async removeBookById(id) {
      this.loading = true;
      this.error = null;
      try {
        await deleteBook(id);
        this.books = this.books.filter((b) => b.id !== id);
      } catch (e) {
        this.error = e?.response?.data ?? e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});