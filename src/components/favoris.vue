<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
import { ref, onMounted } from 'vue'

const API_BASE = 'http://localhost:3000'
const favBooks  = ref([])
const loading   = ref(true)
const error     = ref(null)

const categoryColors = {
  'Classic': '#7a6248', 'Dystopian': '#2d4a5c', 'Romance': '#7a4a5c',
  'Fantasy': '#3d5c3d', 'Mystery': '#4a3a5c', 'Coming of Age': '#5c4a2d',
  'Gothic': '#4a3a5c', 'Psychological': '#5c3a2d', 'Adventure': '#2d4a5c',
  'Epic': '#7a6a3a', 'Historical': '#6a5a3a', 'Science Fiction': '#2d3a5c',
}
const defaultColors = ['#7a6248','#4a6741','#2d4a5c','#7a4a5c','#5c4a2d','#3d5c3d']
const coverColor = (book, idx) =>
    (book.category && categoryColors[book.category])
        ? categoryColors[book.category]
        : defaultColors[idx % defaultColors.length]

const authorLabel = (book) => {
  if (!book.author) return '—'
  if (typeof book.author === 'object') {
    return [book.author.prenom, book.author.nom].filter(Boolean).join(' ') || '—'
  }
  return `Author #${book.author}`
}

async function fetchFavs() {
  loading.value = true
  error.value   = null
  const token   = localStorage.getItem('token')
  if (!token) { error.value = 'Not authenticated'; loading.value = false; return }
  try {
    const res  = await fetch(`${API_BASE}/favoris`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error(`Server responded with ${res.status}`)
    const data = await res.json()
    favBooks.value = data.map(f => f.book).filter(Boolean)
  } catch (e) {
    error.value = e.message || 'Could not load favorites.'
  } finally {
    loading.value = false
  }
}

async function removeFav(bookId) {
  const token = localStorage.getItem('token')
  if (!token) return
  favBooks.value = favBooks.value.filter(b => b.id !== bookId)
  try {
    await fetch(`${API_BASE}/favoris/${bookId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (e) {
    console.error('removeFav error:', e)
    fetchFavs()
  }
}

onMounted(fetchFavs)
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <div class="page-head">
      <div class="page-head-inner">
        <p class="page-eyebrow">✦ Libra</p>
        <h1 class="page-title">My Favorites</h1>
        <div class="page-rule"></div>
        <p class="page-desc" v-if="!loading && !error">
          {{ favBooks.length }} {{ favBooks.length === 1 ? 'work' : 'works' }} saved
        </p>
      </div>
    </div>

    <main class="main-content">

      <!-- LOADING -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spine">
          <span v-for="i in 5" :key="i" class="spine-bar" :style="{ animationDelay: (i * 0.12) + 's' }"></span>
        </div>
        <p class="loading-text">Fetching your favorites…</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="error-state">
        <p class="error-icon">⚠</p>
        <p class="error-title">{{ error }}</p>
        <router-link to="/login" class="retry-btn" v-if="error === 'Not authenticated'">Sign in</router-link>
        <button class="retry-btn" @click="fetchFavs" v-else>Try again</button>
      </div>

      <!-- EMPTY -->
      <div v-else-if="favBooks.length === 0" class="empty-state">
        <div class="empty-heart">
          <svg width="48" height="48" viewBox="0 0 44 44">
            <path d="M22 34 C22 34 8 25 8 15.5 C8 11.4 11.4 8 15.5 8 C18.2 8 20.6 9.4 22 11.6 C23.4 9.4 25.8 8 28.5 8 C32.6 8 36 11.4 36 15.5 C36 25 22 34 22 34Z"
                  fill="none" stroke="#c9a84c" stroke-width="1.5"/>
          </svg>
        </div>
        <p class="empty-text">No favorites yet.</p>
        <p class="empty-sub">Browse the collection and save books you love.</p>
        <router-link to="/books" class="browse-btn">Browse Collection</router-link>
      </div>

      <!-- GRID -->
      <div class="books-grid" v-else>
        <article class="book-card" v-for="(book, i) in favBooks" :key="book.id">

          <div class="book-cover" :style="{ background: coverColor(book, i) }">
            <img
                v-if="book.image"
                :src="book.image"
                :alt="book.title"
                class="cover-img"
                @error="e => e.target.style.display = 'none'"
            />
            <div class="book-spine"></div>
            <div class="cover-texture"></div>



            <div class="cover-meta">
              <span class="cover-year">{{ book.year }}</span>
              <span class="cover-genre" v-if="book.category">{{ book.category }}</span>
            </div>
          </div>

          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ authorLabel(book) }}</p>
            <p class="book-editor" v-if="book.editor">
              <span class="editor-label">Ed.</span> {{ book.editor }}
            </p>
            <button class="remove-fav-btn" @click="removeFav(book.id)">
              ♥ Remove from favorites
            </button>
          </div>

        </article>
      </div>

    </main>

    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

.page-wrapper { min-height: 100vh; display: flex; flex-direction: column; background: #f5f0e8; font-family: 'Jost', sans-serif; }

/* PAGE HEAD */
.page-head { background: #1a3a2a; padding: 3.5rem 2rem 3rem; border-bottom: 1px solid #c9a84c; }
.page-head-inner { max-width: 1200px; margin: 0 auto; }
.page-eyebrow { font-size: 0.68rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 0.6rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: #f5f0e8; line-height: 1; margin-bottom: 1rem; }
.page-rule { width: 40px; height: 1px; background: #c9a84c; margin-bottom: 1rem; }
.page-desc { font-size: 0.8rem; font-weight: 300; letter-spacing: 0.08em; color: rgba(245,240,232,0.5); }

/* MAIN */
.main-content { flex: 1; max-width: 1200px; margin: 0 auto; padding: 2.5rem 2rem 5rem; width: 100%; }

/* LOADING */
.loading-state { display: flex; flex-direction: column; align-items: center; padding: 6rem 2rem; gap: 1.5rem; }
.loading-spine { display: flex; align-items: flex-end; gap: 5px; height: 40px; }
.spine-bar { width: 6px; background: #c9a84c; border-radius: 1px; animation: spineWave 1s ease-in-out infinite alternate; }
@keyframes spineWave { from { height: 12px; opacity: 0.3; } to { height: 36px; opacity: 1; } }
.loading-text { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-style: italic; color: rgba(26,58,42,0.45); }

/* ERROR */
.error-state { display: flex; flex-direction: column; align-items: center; padding: 6rem 2rem; gap: 0.75rem; text-align: center; }
.error-icon { font-size: 2rem; color: #c9a84c; }
.error-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 500; color: #1a3a2a; }
.retry-btn { margin-top: 0.5rem; background: #1a3a2a; color: #f5f0e8; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 0.7rem 2rem; cursor: pointer; text-decoration: none; display: inline-block; }
.retry-btn:hover { background: #c9a84c; color: #1a3a2a; }

/* EMPTY */
.empty-state { display: flex; flex-direction: column; align-items: center; padding: 6rem 2rem; gap: 1rem; text-align: center; }
.empty-heart { margin-bottom: 0.5rem; opacity: 0.6; }
.empty-text { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: #1a3a2a; }
.empty-sub { font-size: 0.82rem; color: rgba(26,58,42,0.5); }
.browse-btn { margin-top: 0.5rem; display: inline-block; font-family: 'Jost', sans-serif; font-size: 0.78rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: #1a3a2a; border: 1px solid #1a3a2a; padding: 0.8rem 2.5rem; text-decoration: none; transition: all 0.25s ease; }
.browse-btn:hover { background: #1a3a2a; color: #f5f0e8; }

/* GRID */
.books-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem; }
.book-card { background: #fff; border: 1px solid rgba(26,58,42,0.07); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.book-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(26,58,42,0.1); }

/* COVER */
.book-cover { height: 220px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; }
.cover-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.book-spine { position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: rgba(0,0,0,0.2); z-index: 1; }
.cover-texture { position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px); z-index: 1; }
.cover-meta { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: flex-end; }
.cover-year { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: rgba(255,255,255,0.2); line-height: 1; }
.cover-genre { font-family: 'Jost', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); padding: 0.28rem 0.6rem; border: 1px solid rgba(255,255,255,0.18); }

/* REMOVE BUTTON ON COVER */
.remove-btn { position: absolute; top: 0.6rem; right: 0.6rem; z-index: 3; background: rgba(0,0,0,0.3); border: none; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, transform 0.2s; }
.remove-btn:hover { background: rgba(226,75,74,0.8); transform: scale(1.1); }

/* INFO */
.book-info { padding: 1.1rem 1.25rem 1.4rem; border-top: 2px solid #c9a84c; }
.book-title { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: #1a3a2a; line-height: 1.3; margin-bottom: 0.25rem; }
.book-author { font-size: 0.75rem; font-weight: 300; color: rgba(26,58,42,0.5); letter-spacing: 0.04em; margin-bottom: 0.3rem; }
.book-editor { font-size: 0.7rem; color: rgba(26,58,42,0.4); margin-bottom: 1rem; }
.editor-label { font-weight: 500; color: #c9a84c; }
.remove-fav-btn { width: 100%; background: none; border: 1px solid rgba(226,75,74,0.3); font-family: 'Jost', sans-serif; font-size: 0.68rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #E24B4A; padding: 0.42rem 0.85rem; cursor: pointer; transition: all 0.2s; }
.remove-fav-btn:hover { background: #E24B4A; color: #fff; border-color: #E24B4A; }

/* RESPONSIVE */
@media (max-width: 1100px) { .books-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) { .books-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .books-grid { grid-template-columns: 1fr; } }
</style>