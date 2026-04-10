
import { defineStore } from "pinia";
import { getAllAuthors, addAuthor } from "../api/author";

export const useAuthorsStore = defineStore("authors", {
  state: () => ({
    authors: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        this.authors = await getAllAuthors();
      } catch (e) {
        this.error = e?.response?.data ?? e.message;
      } finally {
        this.loading = false;
      }
    },
    async createAuthor(payload) {
      this.loading = true;
      this.error = null;
      try {
        const created = await addAuthor(payload);
        this.authors.unshift(created);
        return created;
      } catch (e) {
        this.error = e?.response?.data ?? e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    }
  },
});