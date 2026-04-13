
export const categoryColors = {
    Classic: "#7a6248",
    Dystopian: "#2d4a5c",
    Romance: "#7a4a5c",
    Fantasy: "#3d5c3d",
    Mystery: "#4a3a5c",
    "Coming of Age": "#5c4a2d",
    Gothic: "#4a3a5c",
    Psychological: "#5c3a2d",
    Adventure: "#2d4a5c",
    Epic: "#7a6a3a",
    Historical: "#6a5a3a",
    "Science Fiction": "#2d3a5c",
};

const defaultColors = [
    "#7a6248", "#4a6741", "#2d4a5c", "#7a4a5c",
    "#5c4a2d", "#3d5c3d", "#4a4a6e", "#6e4a4a",
];

export function coverColor(book, idx) {
    return book.category && categoryColors[book.category]
        ? categoryColors[book.category]
        : defaultColors[idx % defaultColors.length];
}

export function authorLabel(book) {
    if (!book.author) return "—";
    if (typeof book.author === "object")
        return [book.author.prenom, book.author.nom].filter(Boolean).join(" ") || "—";
    return `Author #${book.author}`;
}