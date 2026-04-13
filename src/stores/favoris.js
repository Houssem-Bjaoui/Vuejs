// src/stores/favoris.js
import { defineStore } from "pinia";
import { getFavoris, addFavori, removeFavori } from "../api/favoris";

export const useFavorisStore = defineStore("favoris", {
    state: () => ({
        favBooks: [],   // liste des livres favoris (objets book)
        favIds: new Set(), // Set des ids pour lookup rapide
        loading: false,
        error: null,
    }),

    actions: {
        async fetchAll() {
            this.loading = true;
            this.error = null;
            try {
                const data = await getFavoris();
                this.favBooks = data.map((f) => f.book).filter(Boolean);
                this.favIds = new Set(this.favBooks.map((b) => b.id));
            } catch (e) {
                this.error = e?.response?.data ?? e.message;
            } finally {
                this.loading = false;
            }
        },

        async addFav(bookId) {
            // Optimistic update
            this.favIds.add(bookId);
            try {
                await addFavori(bookId);
            } catch (e) {
                this.favIds.delete(bookId);
                this.error = e?.response?.data ?? e.message;
                throw e;
            }
        },

        async removeFav(bookId) {
            // Optimistic update
            const prev = [...this.favBooks];
            this.favBooks = this.favBooks.filter((b) => b.id !== bookId);
            this.favIds.delete(bookId);
            try {
                await removeFavori(bookId);
            } catch (e) {
                // rollback
                this.favBooks = prev;
                this.favIds.add(bookId);
                this.error = e?.response?.data ?? e.message;
                throw e;
            }
        },
    },
});