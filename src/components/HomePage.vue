<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
import { onMounted, ref } from 'vue'

const toastMessage = ref('')
const showToast = ref(false)

const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', color: '#7a6248' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', color: '#4a6741' },
  { title: '1984', author: 'George Orwell', genre: 'Dystopian', color: '#2d4a5c' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', color: '#7a4a5c' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Coming of Age', color: '#5c4a2d' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', color: '#3d5c3d' },
]

onMounted(() => {
  const message = localStorage.getItem('toast')
  if (message) {
    toastMessage.value = message
    showToast.value = true
    localStorage.removeItem('toast')
    setTimeout(() => { showToast.value = false }, 3500)
  }
})
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">✦ Welcome to</p>
        <h1 class="hero-title">Libra</h1>
        <p class="hero-subtitle">Your Digital Library Management System</p>
        <div class="hero-rule"></div>
        <p class="hero-body">
          Discover, explore, and curate a world of literature —<br>
          from timeless classics to modern masterworks.
        </p>
        <router-link to="/books" class="hero-cta">Browse the Collection</router-link>
      </div>
      <div class="hero-decoration">
        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="20" y="10" width="45" height="70" rx="3" fill="#c9a84c" opacity="0.15"/>
          <rect x="30" y="5" width="45" height="70" rx="3" fill="#c9a84c" opacity="0.1"/>
          <rect x="10" y="95" width="45" height="70" rx="3" fill="#f5f0e8" opacity="0.07"/>
          <rect x="70" y="85" width="45" height="70" rx="3" fill="#c9a84c" opacity="0.08"/>
          <rect x="25" y="180" width="120" height="5" rx="2" fill="#c9a84c" opacity="0.12"/>
          <rect x="25" y="192" width="90" height="5" rx="2" fill="#c9a84c" opacity="0.08"/>
          <rect x="25" y="204" width="105" height="5" rx="2" fill="#c9a84c" opacity="0.06"/>
        </svg>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="section-divider">
      <span class="divider-text">Featured Works</span>
    </div>

    <!-- BOOKS GRID -->
    <section class="featured-section">
      <div class="container">
        <div class="books-grid">
          <article
              class="book-card"
              v-for="(book, i) in books"
              :key="i"
          >
            <div class="book-cover" :style="{ background: book.color }">
              <div class="book-cover-lines"></div>
              <span class="book-genre-badge">{{ book.genre }}</span>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <router-link to="/books" class="book-link">Read more →</router-link>
            </div>
          </article>
        </div>

        <div class="cta-row">
          <router-link to="/books" class="view-all-btn">View Full Collection</router-link>
        </div>
      </div>
    </section>

    <!-- QUOTE BAND -->
    <section class="quote-band">
      <blockquote>
        <p>"A reader lives a thousand lives before he dies. The man who never reads lives only one."</p>
        <cite>— George R.R. Martin</cite>
      </blockquote>
    </section>

    <Footer />

    <!-- TOAST -->
    <transition name="toast-fade">
      <div v-if="showToast" class="libra-toast">
        <span class="toast-icon">✦</span>
        {{ toastMessage }}
        <button @click="showToast = false" class="toast-close">×</button>
      </div>
    </transition>
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

/* ── HERO ── */
.hero {
  background: #1a3a2a;
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 2rem;
}

.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
      repeating-linear-gradient(0deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 60px),
      repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 60px);
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 680px;
}

.hero-eyebrow {
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 1rem;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(5rem, 14vw, 9rem);
  font-weight: 300;
  color: #f5f0e8;
  line-height: 0.9;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.5);
  margin-bottom: 2rem;
}

.hero-rule {
  width: 40px;
  height: 1px;
  background: #c9a84c;
  margin: 0 auto 2rem;
}

.hero-body {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(245,240,232,0.75);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.hero-cta {
  display: inline-block;
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1a3a2a;
  background: #c9a84c;
  padding: 0.9rem 2.5rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.hero-cta:hover {
  background: #f5f0e8;
  color: #1a3a2a;
}

.hero-decoration {
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 160px;
  opacity: 0.6;
}

/* ── DIVIDER ── */
.section-divider {
  display: flex;
  align-items: center;
  padding: 3.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(26,58,42,0.2);
}

.divider-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;
  color: #1a3a2a;
  padding: 0 1.5rem;
  white-space: nowrap;
}

/* ── BOOKS GRID ── */
.featured-section { padding: 0 2rem 5rem; }

.container { max-width: 1200px; margin: 0 auto; }

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.book-card {
  background: #fff;
  border: 1px solid rgba(26,58,42,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(26,58,42,0.12);
}

.book-cover {
  height: 240px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  overflow: hidden;
}

.book-cover-lines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.03) 0px,
      rgba(255,255,255,0.03) 1px,
      transparent 1px,
      transparent 12px
  );
}

.book-genre-badge {
  font-family: 'Jost', sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.9);
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  z-index: 1;
}

.book-info {
  padding: 1.25rem 1.5rem 1.5rem;
  border-top: 2px solid #c9a84c;
}

.book-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a3a2a;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.book-author {
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(26,58,42,0.55);
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.book-link {
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c9a84c;
  text-decoration: none;
  transition: color 0.2s ease;
}

.book-link:hover { color: #1a3a2a; }

.cta-row {
  text-align: center;
  margin-top: 3.5rem;
}

.view-all-btn {
  display: inline-block;
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #1a3a2a;
  border: 1px solid #1a3a2a;
  padding: 0.8rem 2.5rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.view-all-btn:hover {
  background: #1a3a2a;
  color: #f5f0e8;
}

/* ── QUOTE BAND ── */
.quote-band {
  background: #1a3a2a;
  padding: 5rem 2rem;
  text-align: center;
}

.quote-band blockquote p {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.25rem, 3vw, 1.85rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(245,240,232,0.9);
  max-width: 700px;
  margin: 0 auto 1.25rem;
  line-height: 1.65;
}

.quote-band blockquote cite {
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a84c;
}

/* ── TOAST ── */
.libra-toast {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1a3a2a;
  color: #f5f0e8;
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  padding: 0.85rem 1.5rem;
  border-left: 3px solid #c9a84c;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 999;
  min-width: 260px;
  box-shadow: 0 8px 30px rgba(26,58,42,0.3);
}

.toast-icon { color: #c9a84c; font-size: 0.7rem; }

.toast-close {
  background: none;
  border: none;
  color: rgba(245,240,232,0.5);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  margin-left: auto;
  padding: 0;
}

.toast-fade-enter-active,
.toast-fade-leave-active { transition: all 0.35s ease; }
.toast-fade-enter-from,
.toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(-10px); }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .books-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 580px) {
  .books-grid { grid-template-columns: 1fr; }
  .hero { min-height: 80vh; }
  .hero-decoration { display: none; }
}
</style>