<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
import { ref, computed, onMounted } from 'vue'
import { useBooksStore }   from '../stores/books'
import { useFavorisStore } from '../stores/favoris'
import { coverColor, authorLabel } from '../utils/bookHelpers'

const booksStore   = useBooksStore()
const favorisStore = useFavorisStore()

// UI state local (pas besoin d'être dans un store)
const search         = ref('')
const activeCategory = ref('All')
const toast          = ref('')
const detailBook     = ref(null)
const detailLoading  = ref(false)

const isAuthenticated = computed(() => !!localStorage.getItem('token'))

// Données depuis les stores
const books   = computed(() => booksStore.books)
const loading = computed(() => booksStore.loading)
const error   = computed(() => booksStore.error)

const categories = computed(() => {
  const cats = books.value.map((b) => b.category).filter(Boolean)
  return ['All', ...new Set(cats)]
})

const filtered = computed(() => {
  let list = books.value
  if (activeCategory.value !== 'All')
    list = list.filter((b) => b.category === activeCategory.value)
  const q = search.value.trim().toLowerCase()
  if (q)
    list = list.filter(
        (b) =>
            b.title?.toLowerCase().includes(q) ||
            b.editor?.toLowerCase().includes(q) ||
            b.category?.toLowerCase().includes(q) ||
            String(b.year).includes(q)
    )
  return list
})

function showToast(msg) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 2500)
}

async function toggleFav(bookId) {
  if (!isAuthenticated.value) return
  if (favorisStore.favIds.has(bookId)) {
    showToast('Go to favorites page to remove')
    return
  }
  try {
    await favorisStore.addFav(bookId)
    showToast('✦ Added to favorites')
  } catch {
    showToast('Something went wrong')
  }
}

async function openDetail(bookId) {
  detailLoading.value = true
  detailBook.value    = null
  // On cherche d'abord dans le store (évite un appel réseau supplémentaire)
  // Si tu as un endpoint dédié, tu peux l'appeler via l'api directement
  try {
    const { http } = await import('../api/http')
    const token = localStorage.getItem('token')
    const res = await http.get(`/books/search/${bookId}`)
    const data = res.data
    detailBook.value = Array.isArray(data) ? data[0] : data
  } catch {
    detailBook.value = books.value.find((b) => b.id === bookId) ?? null
  } finally {
    detailLoading.value = false
  }
}

function closeDetail() {
  detailBook.value = null
}

onMounted(() => {
  booksStore.fetchAll()
  if (isAuthenticated.value) favorisStore.fetchAll()
})
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <div class="page-head">
      <div class="page-head-inner">
        <p class="page-eyebrow">✦ Libra</p>
        <h1 class="page-title">The Collection</h1>
        <div class="page-rule"></div>
        <p class="page-desc">{{ books.length }} works catalogued</p>
      </div>
    </div>

    <main class="main-content">

      <!-- LOADING -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spine">
          <span v-for="i in 5" :key="i" class="spine-bar" :style="{ animationDelay: i * 0.12 + 's' }"></span>
        </div>
        <p class="loading-text">Cataloguing the shelves…</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="error-state">
        <p class="error-icon">⚠</p>
        <p class="error-title">Could not load the collection</p>
        <p class="error-msg">{{ error }}</p>
        <button class="retry-btn" @click="booksStore.fetchAll()">Try again</button>
      </div>

      <template v-else>
        <!-- CONTROLS -->
        <div class="controls-bar">
          <div class="search-wrap">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input v-model="search" class="search-input" placeholder="Search by title, editor, genre, year…" />
          </div>
          <div class="genre-filters">
            <button
                v-for="cat in categories" :key="cat"
                class="genre-pill" :class="{ active: activeCategory === cat }"
                @click="activeCategory = cat"
            >{{ cat }}</button>
          </div>
        </div>

        <p class="results-meta">
          <span class="results-count">{{ filtered.length }}</span> result{{ filtered.length !== 1 ? 's' : '' }}
          <button v-if="search || activeCategory !== 'All'" class="clear-btn"
                  @click="search = ''; activeCategory = 'All'">Clear filters</button>
        </p>

        <!-- GRID -->
        <div class="books-grid" v-if="filtered.length">
          <article class="book-card" v-for="(book, i) in filtered" :key="book.id">
            <div class="book-cover" :style="{ background: coverColor(book, i) }">
              <img v-if="book.image" :src="book.image" :alt="book.title" class="cover-img"
                   @error="(e) => (e.target.style.display = 'none')" />
              <div class="book-spine"></div>
              <div class="cover-texture"></div>
              <button v-if="isAuthenticated" class="fav-btn"
                      :class="{ active: favorisStore.favIds.has(book.id) }"
                      @click.stop="toggleFav(book.id)">
                <svg width="18" height="18" viewBox="0 0 44 44">
                  <path class="heart-bg"
                        d="M22 34 C22 34 8 25 8 15.5 C8 11.4 11.4 8 15.5 8 C18.2 8 20.6 9.4 22 11.6 C23.4 9.4 25.8 8 28.5 8 C32.6 8 36 11.4 36 15.5 C36 25 22 34 22 34Z"/>
                </svg>
              </button>
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
              <button class="view-btn" @click="openDetail(book.id)">View details</button>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <p class="empty-icon">◎</p>
          <p class="empty-text">No books match your search.</p>
          <button class="clear-btn-large" @click="search = ''; activeCategory = 'All'">Clear filters</button>
        </div>
      </template>
    </main>

    <!-- DETAIL MODAL -->
    <transition name="modal-fade">
      <div v-if="detailBook !== null || detailLoading" class="modal-overlay" @click.self="closeDetail">
        <div class="modal-box">
          <div v-if="detailLoading" class="modal-loading">
            <div class="loading-spine">
              <span v-for="i in 5" :key="i" class="spine-bar" :style="{ animationDelay: i * 0.12 + 's' }"></span>
            </div>
          </div>
          <template v-else-if="detailBook">
            <div class="modal-cover" :style="{ background: coverColor(detailBook, 0) }">
              <img v-if="detailBook.image" :src="detailBook.image" :alt="detailBook.title" class="modal-cover-img"
                   @error="(e) => (e.target.style.display = 'none')" />
              <div class="modal-cover-overlay">
                <span class="modal-cover-year">{{ detailBook.year }}</span>
              </div>
              <button class="modal-close" @click="closeDetail">✕</button>
            </div>
            <div class="modal-body">
              <p class="modal-category">{{ detailBook.category }}</p>
              <h2 class="modal-title">{{ detailBook.title }}</h2>
              <div class="modal-rule"></div>
              <div class="modal-meta-grid">
                <div class="meta-item" v-if="detailBook.author">
                  <span class="meta-label">Author</span>
                  <span class="meta-value">{{ authorLabel(detailBook) }}</span>
                </div>
                <div class="meta-item" v-if="detailBook.editor">
                  <span class="meta-label">Editor</span>
                  <span class="meta-value">{{ detailBook.editor }}</span>
                </div>
                <div class="meta-item" v-if="detailBook.year">
                  <span class="meta-label">Year</span>
                  <span class="meta-value">{{ detailBook.year }}</span>
                </div>

              </div>
            </div>
          </template>
        </div>
      </div>
    </transition>

    <!-- TOAST -->
    <transition name="toast-fade">
      <div v-if="toast" class="libra-toast">{{ toast }}</div>
    </transition>

    <Footer />
  </div>
</template>

<style scoped>
/* Identique à l'original — aucun changement visuel */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
.page-wrapper { min-height: 100vh; display: flex; flex-direction: column; background: #f5f0e8; font-family: 'Jost', sans-serif; }
.page-head { background: #1a3a2a; padding: 3.5rem 2rem 3rem; border-bottom: 1px solid #c9a84c; }
.page-head-inner { max-width: 1200px; margin: 0 auto; }
.page-eyebrow { font-size: 0.68rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 0.6rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: #f5f0e8; line-height: 1; margin-bottom: 1rem; }
.page-rule { width: 40px; height: 1px; background: #c9a84c; margin-bottom: 1rem; }
.page-desc { font-size: 0.8rem; font-weight: 300; letter-spacing: 0.08em; color: rgba(245,240,232,0.5); }
.main-content { flex: 1; max-width: 1200px; margin: 0 auto; padding: 2.5rem 2rem 5rem; width: 100%; }
.loading-state { display: flex; flex-direction: column; align-items: center; padding: 6rem 2rem; gap: 1.5rem; }
.loading-spine { display: flex; align-items: flex-end; gap: 5px; height: 40px; }
.spine-bar { width: 6px; background: #c9a84c; border-radius: 1px; animation: spineWave 1s ease-in-out infinite alternate; }
@keyframes spineWave { from { height: 12px; opacity: 0.3; } to { height: 36px; opacity: 1; } }
.loading-text { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-style: italic; color: rgba(26,58,42,0.45); }
.error-state { display: flex; flex-direction: column; align-items: center; padding: 6rem 2rem; gap: 0.75rem; text-align: center; }
.error-icon { font-size: 2rem; color: #c9a84c; }
.error-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 500; color: #1a3a2a; }
.error-msg { font-size: 0.82rem; color: rgba(26,58,42,0.55); font-family: monospace; }
.retry-btn { margin-top: 0.5rem; background: #1a3a2a; color: #f5f0e8; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 0.7rem 2rem; cursor: pointer; }
.retry-btn:hover { background: #c9a84c; color: #1a3a2a; }
.controls-bar { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; margin-bottom: 1.5rem; }
.search-wrap { position: relative; flex: 1; min-width: 240px; }
.search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: rgba(26,58,42,0.4); }
.search-input { width: 100%; background: #fff; border: 1px solid rgba(26,58,42,0.18); padding: 0.8rem 1rem 0.8rem 2.75rem; font-family: 'Jost', sans-serif; font-size: 0.88rem; color: #1a3a2a; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.search-input::placeholder { color: rgba(26,58,42,0.35); }
.search-input:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
.genre-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.genre-pill { font-family: 'Jost', sans-serif; font-size: 0.68rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; background: none; border: 1px solid rgba(26,58,42,0.22); color: rgba(26,58,42,0.6); padding: 0.38rem 0.85rem; cursor: pointer; transition: all 0.2s; }
.genre-pill:hover { border-color: #1a3a2a; color: #1a3a2a; }
.genre-pill.active { background: #1a3a2a; color: #f5f0e8; border-color: #1a3a2a; }
.results-meta { font-size: 0.75rem; font-weight: 300; color: rgba(26,58,42,0.45); margin-bottom: 2rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; }
.results-count { font-weight: 500; color: rgba(26,58,42,0.6); }
.clear-btn { background: none; border: none; color: #c9a84c; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.72rem; padding: 0; text-decoration: underline; }
.books-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem; }
.book-card { background: #fff; border: 1px solid rgba(26,58,42,0.07); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
.book-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(26,58,42,0.1); }
.book-cover { height: 220px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem; }
.cover-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.book-spine { position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: rgba(0,0,0,0.2); z-index: 1; }
.cover-texture { position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px); z-index: 1; }
.cover-meta { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: flex-end; }
.cover-year { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: rgba(255,255,255,0.2); line-height: 1; }
.cover-genre { font-family: 'Jost', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); padding: 0.28rem 0.6rem; border: 1px solid rgba(255,255,255,0.18); }
.fav-btn { position: absolute; top: 0.6rem; right: 0.6rem; z-index: 3; background: rgba(0,0,0,0.3); border: none; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
.fav-btn:hover { background: rgba(0,0,0,0.5); }
.heart-bg { fill: none; stroke: rgba(255,255,255,0.8); stroke-width: 2.5; transform-origin: center; transform-box: fill-box; transition: fill 0.3s, stroke 0.3s; }
.fav-btn.active .heart-bg { fill: #E24B4A; stroke: #E24B4A; animation: heartPop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
@keyframes heartPop { 0% { transform: scale(1); } 30% { transform: scale(1.4); } 55% { transform: scale(0.88); } 75% { transform: scale(1.12); } 100% { transform: scale(1); } }
.book-info { padding: 1.1rem 1.25rem 1.4rem; border-top: 2px solid #c9a84c; }
.book-title { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: #1a3a2a; line-height: 1.3; margin-bottom: 0.25rem; }
.book-author { font-size: 0.75rem; font-weight: 300; color: rgba(26,58,42,0.5); letter-spacing: 0.04em; margin-bottom: 0.3rem; }
.book-editor { font-size: 0.7rem; color: rgba(26,58,42,0.4); margin-bottom: 1rem; }
.editor-label { font-weight: 500; color: #c9a84c; }
.view-btn { background: none; border: 1px solid rgba(26,58,42,0.2); font-family: 'Jost', sans-serif; font-size: 0.68rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(26,58,42,0.6); padding: 0.42rem 0.85rem; cursor: pointer; transition: all 0.2s; width: 100%; }
.view-btn:hover { background: #1a3a2a; color: #f5f0e8; border-color: #1a3a2a; }
.empty-state { text-align: center; padding: 5rem 2rem; }
.empty-icon { font-size: 2rem; color: #c9a84c; margin-bottom: 1rem; }
.empty-text { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-style: italic; color: rgba(26,58,42,0.5); margin-bottom: 1.5rem; }
.clear-btn-large { background: none; border: 1px solid #1a3a2a; font-family: 'Jost', sans-serif; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: #1a3a2a; padding: 0.7rem 2rem; cursor: pointer; }
.clear-btn-large:hover { background: #1a3a2a; color: #f5f0e8; }
.modal-overlay { position: fixed; inset: 0; background: rgba(26,58,42,0.55); backdrop-filter: blur(4px); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
.modal-box { background: #f5f0e8; width: 100%; max-width: 460px; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(26,58,42,0.3); }
.modal-loading { display: flex; justify-content: center; padding: 4rem; }
.modal-cover { height: 200px; position: relative; overflow: hidden; }
.modal-cover-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.modal-cover-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 1.25rem; }
.modal-cover-year { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; color: rgba(255,255,255,0.25); line-height: 1; }
.modal-close { position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.35); border: none; color: #fff; width: 32px; height: 32px; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.modal-close:hover { background: rgba(0,0,0,0.6); }
.modal-body { padding: 1.5rem; }
.modal-category { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a84c; margin-bottom: 0.5rem; }
.modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 500; color: #1a3a2a; line-height: 1.2; margin-bottom: 0.85rem; }
.modal-rule { width: 30px; height: 1px; background: #c9a84c; margin-bottom: 1.25rem; }
.modal-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
.meta-label { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(26,58,42,0.45); }
.meta-value { font-size: 0.9rem; font-weight: 400; color: #1a3a2a; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal-box, .modal-fade-leave-to .modal-box { transform: translateY(20px) scale(0.97); }
.libra-toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #1a3a2a; color: #f5f0e8; font-family: 'Jost', sans-serif; font-size: 0.82rem; letter-spacing: 0.08em; padding: 0.75rem 2rem; border-left: 3px solid #c9a84c; z-index: 999; white-space: nowrap; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }
@media (max-width: 1100px) { .books-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) { .books-grid { grid-template-columns: repeat(2, 1fr); } .controls-bar { flex-direction: column; align-items: stretch; } }
@media (max-width: 480px) { .books-grid { grid-template-columns: 1fr; } }
</style>