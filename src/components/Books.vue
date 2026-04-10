<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
import { ref, computed } from 'vue'

const search = ref('')

const books = ref([
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', color: '#7a6248', year: 1925 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', color: '#4a6741', year: 1960 },
  { title: '1984', author: 'George Orwell', genre: 'Dystopian', color: '#2d4a5c', year: 1949 },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', color: '#7a4a5c', year: 1813 },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Coming of Age', color: '#5c4a2d', year: 1951 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', color: '#3d5c3d', year: 1937 },
  { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', color: '#4a4a6e', year: 1932 },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Romance', color: '#6e4a4a', year: 1847 },
  { title: 'Moby-Dick', author: 'Herman Melville', genre: 'Adventure', color: '#2d4a5c', year: 1851 },
  { title: 'The Odyssey', author: 'Homer', genre: 'Epic', color: '#7a6a3a', year: -800 },
  { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic', color: '#4a3a5c', year: 1847 },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Psychological', color: '#5c3a2d', year: 1866 },
])

const activeGenre = ref('All')
const genres = computed(() => ['All', ...new Set(books.value.map(b => b.genre))])

const filtered = computed(() => {
  let list = books.value
  if (activeGenre.value !== 'All') list = list.filter(b => b.genre === activeGenre.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <!-- PAGE HEADER -->
    <div class="page-head">
      <div class="page-head-inner">
        <p class="page-eyebrow">✦ Libra</p>
        <h1 class="page-title">The Collection</h1>
        <div class="page-rule"></div>
        <p class="page-desc">{{ books.length }} curated works across {{ genres.length - 1 }} genres</p>
      </div>
    </div>

    <main class="main-content">
      <!-- CONTROLS -->
      <div class="controls-bar">
        <div class="search-wrap">
          <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M13 13l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
              class="search-input"
              type="text"
              placeholder="Search by title, author or genre…"
              v-model="search"
          />
        </div>

        <div class="genre-filters">
          <button
              v-for="g in genres"
              :key="g"
              class="genre-pill"
              :class="{ active: activeGenre === g }"
              @click="activeGenre = g"
          >
            {{ g }}
          </button>
        </div>
      </div>

      <!-- RESULTS COUNT -->
      <div class="results-meta">
        <span class="results-count">{{ filtered.length }} {{ filtered.length === 1 ? 'work' : 'works' }}</span>
        <span v-if="search || activeGenre !== 'All'" class="results-filter">
          — filtered
          <button class="clear-btn" @click="search = ''; activeGenre = 'All'">Clear ×</button>
        </span>
      </div>

      <!-- GRID -->
      <div class="books-grid" v-if="filtered.length">
        <article class="book-card" v-for="(book, i) in filtered" :key="i">
          <div class="book-cover" :style="{ background: book.color }">
            <div class="book-spine"></div>
            <div class="cover-texture"></div>
            <div class="cover-meta">
              <span class="cover-year">{{ book.year < 0 ? `${Math.abs(book.year)} BC` : book.year }}</span>
              <span class="cover-genre">{{ book.genre }}</span>
            </div>
          </div>
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
            <button class="view-btn">View Details</button>
          </div>
        </article>
      </div>

      <!-- EMPTY STATE -->
      <div class="empty-state" v-else>
        <p class="empty-icon">✦</p>
        <p class="empty-text">No works match your search.</p>
        <button class="clear-btn-large" @click="search = ''; activeGenre = 'All'">Clear filters</button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f0e8;
  font-family: 'Jost', sans-serif;
}

/* PAGE HEAD */
.page-head {
  background: #1a3a2a;
  padding: 3.5rem 2rem 3rem;
  border-bottom: 1px solid #c9a84c;
}

.page-head-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.page-eyebrow {
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 0.6rem;
}

.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: #f5f0e8;
  line-height: 1;
  margin-bottom: 1rem;
}

.page-rule {
  width: 40px;
  height: 1px;
  background: #c9a84c;
  margin-bottom: 1rem;
}

.page-desc {
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: rgba(245,240,232,0.5);
}

/* MAIN */
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  width: 100%;
}

/* CONTROLS */
.controls-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: rgba(26,58,42,0.4);
}

.search-input {
  width: 100%;
  background: #fff;
  border: 1px solid rgba(26,58,42,0.18);
  padding: 0.8rem 1rem 0.8rem 2.75rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  color: #1a3a2a;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input::placeholder { color: rgba(26,58,42,0.35); }
.search-input:focus {
  border-color: #c9a84c;
  box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
}

.genre-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-pill {
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: none;
  border: 1px solid rgba(26,58,42,0.22);
  color: rgba(26,58,42,0.6);
  padding: 0.38rem 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.genre-pill:hover { border-color: #1a3a2a; color: #1a3a2a; }
.genre-pill.active { background: #1a3a2a; color: #f5f0e8; border-color: #1a3a2a; }

/* RESULTS META */
.results-meta {
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(26,58,42,0.45);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.results-count { font-weight: 500; color: rgba(26,58,42,0.6); }

.clear-btn {
  background: none;
  border: none;
  color: #c9a84c;
  cursor: pointer;
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  padding: 0;
  text-decoration: underline;
}

/* GRID */
.books-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem;
}

.book-card {
  background: #fff;
  border: 1px solid rgba(26,58,42,0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(26,58,42,0.1);
}

.book-cover {
  height: 220px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 12px;
  background: rgba(0,0,0,0.2);
}

.cover-texture {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px,
      transparent 1px, transparent 10px
  );
}

.cover-meta {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cover-year {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: rgba(255,255,255,0.2);
  line-height: 1;
}

.cover-genre {
  font-family: 'Jost', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  padding: 0.28rem 0.6rem;
  border: 1px solid rgba(255,255,255,0.18);
}

.book-info {
  padding: 1.1rem 1.25rem 1.4rem;
  border-top: 2px solid #c9a84c;
}

.book-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1a3a2a;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.book-author {
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(26,58,42,0.5);
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.view-btn {
  background: none;
  border: 1px solid rgba(26,58,42,0.2);
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(26,58,42,0.6);
  padding: 0.42rem 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.view-btn:hover {
  background: #1a3a2a;
  color: #f5f0e8;
  border-color: #1a3a2a;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
}

.empty-icon {
  font-size: 2rem;
  color: #c9a84c;
  margin-bottom: 1rem;
}

.empty-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(26,58,42,0.5);
  margin-bottom: 1.5rem;
}

.clear-btn-large {
  background: none;
  border: 1px solid #1a3a2a;
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1a3a2a;
  padding: 0.7rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn-large:hover { background: #1a3a2a; color: #f5f0e8; }

/* RESPONSIVE */
@media (max-width: 1100px) {
  .books-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 760px) {
  .books-grid { grid-template-columns: repeat(2, 1fr); }
  .controls-bar { flex-direction: column; align-items: stretch; }
  .genre-filters { gap: 0.4rem; }
}

@media (max-width: 480px) {
  .books-grid { grid-template-columns: 1fr; }
}
</style>