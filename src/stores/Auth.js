// src/stores/Auth.js
import { defineStore } from "pinia";
import { signin, signup } from "../api/Auth";

const normalizeRole = (role) => {
    if (!role) return null;
    const value = String(role).trim().toUpperCase();
    if (!value) return null;
    return value.startsWith("ROLE_") ? value : `ROLE_${value}`;
};

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token:    localStorage.getItem("token")    ?? null,
        role:     normalizeRole(localStorage.getItem("role")),
        username: localStorage.getItem("username") ?? null,
        loading:  false,
        error:    null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        // Le backend peut renvoyer "ROLE_ADMIN" ou "admin"
        isAdmin: (state) => state.role === "ROLE_ADMIN",
    },

    actions: {
        async login(payload) {
            this.loading = true;
            this.error   = null;
            try {
                const data = await signin(payload);
                this.token    = data.access_token;
                this.role     = normalizeRole(data.role);
                this.username = data.username;   // toujours présent grâce au ...safeUser

                localStorage.setItem("token",    data.access_token);
                localStorage.setItem("role",     this.role ?? "");
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
                }
        }
});