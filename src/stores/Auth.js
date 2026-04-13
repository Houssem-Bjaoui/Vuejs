// src/stores/Auth.js
import { defineStore } from "pinia";
import { signin, signup } from "../api/Auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token:    localStorage.getItem("token")    ?? null,
        role:     localStorage.getItem("role")     ?? null,
        username: localStorage.getItem("username") ?? null,
        loading:  false,
        error:    null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        // Le backend renvoie "ROLE_ADMIN" (valeur de l'enum NestJS)
        isAdmin: (state) => state.role === "ROLE_ADMIN",
    },

    actions: {
        async login(payload) {
            this.loading = true;
            this.error   = null;
            try {
                const data = await signin(payload);
                this.token    = data.access_token;
                this.role     = data.role;       // ex: "ROLE_ADMIN" ou "ROLE_USER"
                this.username = data.username;   // toujours présent grâce au ...safeUser

                localStorage.setItem("token",    data.access_token);
                localStorage.setItem("role",     data.role);
                localStorage.setItem("username", data.username);
                localStorage.setItem("toast", "Welcome back! Login successful ✦");
                return data;
            } catch (e) {
                this.error = e?.response?.data?.message ?? "Server not reachable";
                throw e;
            } finally {
                this.loading = false;
            }
        },

        async register(payload) {
            this.loading = true;
            this.error   = null;
            try {
                return await signup(payload);
            } catch (e) {
                this.error = e?.response?.data?.message ?? "Server not reachable";
                throw e;
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.token    = null;
            this.role     = null;
            this.username = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
        },
    },
});