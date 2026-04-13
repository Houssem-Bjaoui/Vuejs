import { http } from "./http";

export async function signin(payload) {
    // payload: { identifiant, password }
    const { data } = await http.post("/auth/signin", payload);
    return data; // { access_token, role }
}

export async function signup(payload) {
    // payload: { email, username, password }
    const { data } = await http.post("/auth/signup", payload);
    return data;
}

export async function getTotalUsers() {
    const { data } = await http.get("/auth/stats/total-users");
    return data.total; // number
}