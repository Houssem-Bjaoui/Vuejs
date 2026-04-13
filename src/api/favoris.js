import { http } from "./http";

export async function getFavoris() {
    const { data } = await http.get("/favoris");
    return data;
}

export async function addFavori(bookId) {
    const { data } = await http.post(`/favoris/${bookId}`);
    return data;
}

export async function removeFavori(bookId) {
    const { data } = await http.delete(`/favoris/${bookId}`);
    return data;
}

export async function getTotalFavoris() {
    const { data } = await http.get("/favoris/stats/total");
    return data.total; // retourner un nombre
}

export async function getMostFavouritedBooks(limit = 10) {
    const { data } = await http.get(`/favoris/stats/most-favourited?limit=${limit}`);
    return data;
}
