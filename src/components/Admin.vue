<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import AdminSidebar from './admin/AdminSidebar.vue'
import AdminTopbar from './admin/AdminTopbar.vue'
import DashboardSection from './admin/DashboardSection.vue'
import BooksSection from './admin/BooksSection.vue'
import AuthorsSection from './admin/AuthorsSection.vue'
import AdminModal from './admin/AdminModal.vue'
import AdminToast from './admin/AdminToast.vue'
import { useBooksStore } from '../stores/books'
import { useAuthorsStore } from '../stores/author'
import { useAuthStore } from '../stores/Auth'
import { getTotalUsers } from '../api/Auth'
import { getTotalFavoris, getMostFavouritedBooks } from '../api/favoris'

// ── NAVIGATION ──
const activeSection = ref('dashboard')

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const authStore = useAuthStore()

// ── STATS ──
const stats = reactive({
  users: 0,
  books: 0,
  favorites: 0,
  authors: 0,
})

// ── MOST FAVOURITED BOOKS (données réelles de l'API) ──
const mostFavourited = ref([])

// ── BOOKS ──
const books = computed(() => booksStore.books)
const bookSearch = ref('')

function authorLabel(author) {
  if (author === null || author === undefined || author === '') return '—'
  if (typeof author === 'object') {
    const { prenom, nom } = author
    return [prenom, nom].filter(Boolean).join(' ') || '—'
  }
  if (Number.isFinite(Number(author))) {
    const found = normalizedAuthors.value.find(a => Number(a.id) === Number(author))
    return found?.displayName || `Author #${author}`
  }
  return String(author)
}

const normalizedBooks = computed(() =>
    books.value.map(book => ({
      ...book,
      id: book.id ?? book._id,
      authorLabel: authorLabel(book.author),
      category: book.category ?? '—',
      editor: book.editor ?? '—',
      image: book.image ?? '',
      year: book.year ?? '—'
    }))
)

const filteredBooks = computed(() => {
  const q = bookSearch.value.trim().toLowerCase()
  if (!q) return normalizedBooks.value
  return normalizedBooks.value.filter(b =>
      String(b.title ?? '').toLowerCase().includes(q) ||
      String(b.authorLabel ?? '').toLowerCase().includes(q) ||
      String(b.category ?? '').toLowerCase().includes(q) ||
      String(b.editor ?? '').toLowerCase().includes(q) ||
      String(b.year ?? '').toLowerCase().includes(q)
  )
})

// ── AUTHORS ──
const authors = computed(() => authorsStore.authors)

function authorName(author) {
  if (!author) return '—'
  if (author.name) return author.name
  if (author.prenom || author.nom) return [author.prenom, author.nom].filter(Boolean).join(' ')
  return String(author.id ?? author._id ?? '—')
}

const normalizedAuthors = computed(() =>
    authors.value.map(author => ({
      ...author,
      id: author.id ?? author._id,
      displayName: authorName(author),
      nationality: author.nationality ?? author.nationalite ?? '—',
      born: author.born ?? author.naissance ?? '—',
      died: author.died ?? author.deces ?? '',
      books: author.books ?? author.ouvrages ?? '—',
      bio: author.bio ?? author.biographie ?? ''
    }))
)

const authorOptions = computed(() =>
    normalizedAuthors.value
        .filter(a => a.id !== undefined && a.id !== null)
        .map(a => ({ value: a.id, label: a.displayName }))
)

const authorSearch = ref('')
const filteredAuthors = computed(() => {
  const q = authorSearch.value.trim().toLowerCase()
  if (!q) return normalizedAuthors.value
  return normalizedAuthors.value.filter(a =>
      String(a.displayName ?? '').toLowerCase().includes(q) ||
      String(a.nationality ?? '').toLowerCase().includes(q)
  )
})

// ── MODAL STATE ──
const modal = reactive({
  open: false,
  type: null,
  data: {}
})

const bookForm = reactive({
  id: null,
  title: '',
  author: null,
  category: 'roman',
  editor: '',
  image: '',
  year: new Date().getFullYear()
})
const authorForm = reactive({ id: null, prenom: '', nom: '' })

const categoryOptions = ['roman', 'science', 'histoire', 'informatique', 'art', 'philosophie', 'autre']

function mapCategory(value) {
  const v = String(value || '').trim().toLowerCase()
  const map = {
    historical: 'histoire', history: 'histoire',
    science: 'science', computing: 'informatique', it: 'informatique',
    art: 'art', philosophy: 'philosophie', novel: 'roman', roman: 'roman', other: 'autre'
  }
  return map[v] || v
}

function openModal(type, item = null) {
  modal.type = type
  modal.open = true
  if (type === 'edit-book' && item) {
    const authorId = typeof item.author === 'object'
        ? (item.author?.id ?? item.author?._id ?? null)
        : item.author
    Object.assign(bookForm, {
      id: item.id ?? null,
      title: item.title ?? '',
      author: authorId ?? '',
      category: item.category ?? 'roman',
      editor: item.editor ?? '',
      image: item.image ?? '',
      year: item.year ?? new Date().getFullYear()
    })
  } else if (type === 'add-book') {
    Object.assign(bookForm, { id: null, title: '', author: null, category: 'roman', editor: '', image: '', year: new Date().getFullYear() })
  } else if (type === 'add-author') {
    Object.assign(authorForm, { id: null, prenom: '', nom: '' })
  } else if (type === 'delete-book') {
    modal.data = item
  }
}

function closeModal() {
  modal.open = false
  modal.type = null
  modal.data = {}
}

// ── BOOK CRUD ──
async function saveBook() {
  if (!bookForm.title || !bookForm.author || !bookForm.category || !bookForm.editor || !bookForm.image || !bookForm.year) {
    showToast('Please fill all required book fields.')
    return
  }
  const payload = {
    title: bookForm.title,
    year: Number(bookForm.year),
    editor: bookForm.editor,
    image: bookForm.image,
    category: mapCategory(bookForm.category),
    author: Number(bookForm.author)
  }
  try {
    if (bookForm.id) {
      await booksStore.editBook(bookForm.id, payload)
      showToast('Book updated successfully.')
    } else {
      await booksStore.createBook(payload)
      showToast('Book added successfully.')
    }
    closeModal()
  } catch (err) {
    showToast(String(booksStore.error || err?.response?.data || err?.message || 'Operation failed.'))
  }
}

async function deleteBook() {
  try {
    const id = modal.data?.id ?? modal.data?._id
    if (!id) {
      showToast('Delete book failed: missing book id.')
      return
    }
    await booksStore.removeBookById(id)
    showToast('Book deleted successfully.')
    closeModal()
  } catch (err) {
    showToast(String(booksStore.error || err?.response?.data || err?.message || 'Delete book failed.'))
  }
}

// ── AUTHOR CRUD ──
async function saveAuthor() {
  if (!authorForm.prenom || !authorForm.nom) {
    showToast('Please provide author first and last name.')
    return
  }
  try {
    await authorsStore.createAuthor({ prenom: authorForm.prenom, nom: authorForm.nom })
    showToast('Author added successfully.')
    closeModal()
  } catch (err) {
    showToast(String(authorsStore.error || err?.response?.data || err?.message || 'Add author failed.'))
  }
}

// ── TOAST ──
const toast = reactive({ show: false, message: '' })
function showToast(msg) {
  toast.message = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, 3000)
}

// ── NAV (sans favorites) ──
const navItems = [
  { key: 'dashboard', icon: '◈', label: 'Dashboard' },
  { key: 'books',     icon: '◉', label: 'Books'     },
  { key: 'authors',   icon: '◎', label: 'Authors'   },
]

// ── AUTH / LOGOUT ──
const username = computed(() => authStore.username ?? localStorage.getItem('username') ?? 'Admin')

function handleLogout() {
  authStore.logout()
  showToast('You have been signed out. Goodbye! 👋')
  setTimeout(() => { window.location.href = '/login' }, 1800)
}

// ── ON MOUNT : charge tout ──
onMounted(async () => {
  await Promise.all([
    booksStore.fetchAll(),
    authorsStore.fetchAll(),
  ])

  // Stats réelles depuis le backend
  const [totalUsers, totalFav, topBooks] = await Promise.all([
    getTotalUsers(),
    getTotalFavoris(),
    getMostFavouritedBooks(10),
  ])
  stats.users     = totalUsers
  stats.favorites = totalFav
  mostFavourited.value = topBooks
})

watch(() => booksStore.books.length,   (len) => { stats.books   = len }, { immediate: true })
watch(() => authorsStore.authors.length, (len) => { stats.authors = len }, { immediate: true })
</script>

<template>
  <div class="admin-root">
    <AdminSidebar
        :nav-items="navItems"
        :active-section="activeSection"
        @update:active-section="activeSection = $event"
    />

    <div class="admin-main">
      <AdminTopbar
          :nav-items="navItems"
          :active-section="activeSection"
          :username="username"
          @logout="handleLogout"
      />

      <main class="content-area">
        <DashboardSection
            v-if="activeSection === 'dashboard'"
            :stats="stats"
            :most-favourited="mostFavourited"
            :books="normalizedBooks"
        />

        <BooksSection
            v-if="activeSection === 'books'"
            :books="books"
            :filtered-books="filteredBooks"
            :book-search="bookSearch"
            @update:book-search="bookSearch = $event"
            @open-modal="openModal"
        />

        <AuthorsSection
            v-if="activeSection === 'authors'"
            :filtered-authors="filteredAuthors"
            :author-search="authorSearch"
            @update:author-search="authorSearch = $event"
            @open-modal="openModal"
        />
      </main>
    </div>

    <AdminModal
        :modal="modal"
        :book-form="bookForm"
        :author-form="authorForm"
        :category-options="categoryOptions"
        :author-options="authorOptions"
        @close="closeModal"
        @save-book="saveBook"
        @delete-book="deleteBook"
        @save-author="saveAuthor"
    />

    <AdminToast :toast="toast" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.admin-root {
  display: flex;
  min-height: 100vh;
  background: #f0ece3;
  font-family: 'Jost', sans-serif;
}

/* SIDEBAR */
.sidebar { width: 220px; min-height: 100vh; background: #1a3a2a; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
.sidebar-brand { padding: 1.75rem 1.5rem 1.5rem; border-bottom: 1px solid rgba(201,168,76,0.2); display: flex; align-items: baseline; gap: 0.4rem; }
.brand-star { color: #c9a84c; font-size: 0.7rem; }
.brand-text { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #f5f0e8; letter-spacing: 0.03em; }
.brand-sub { font-size: 0.6rem; font-weight: 300; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(201,168,76,0.7); }
.sidebar-nav { flex: 1; padding: 1.25rem 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; }
.nav-item { display: flex; align-items: center; gap: 0.85rem; padding: 0.75rem 0.85rem; background: none; border: none; border-radius: 0; cursor: pointer; text-align: left; transition: background 0.2s ease; width: 100%; position: relative; }
.nav-icon { font-size: 0.8rem; color: rgba(245,240,232,0.4); transition: color 0.2s; }
.nav-label { font-size: 0.78rem; font-weight: 400; letter-spacing: 0.08em; color: rgba(245,240,232,0.55); transition: color 0.2s; }
.nav-item:hover .nav-icon, .nav-item:hover .nav-label { color: #f5f0e8; }
.nav-item.active { background: rgba(201,168,76,0.1); }
.nav-item.active .nav-icon { color: #c9a84c; }
.nav-item.active .nav-label { color: #f5f0e8; font-weight: 500; }
.nav-item.active::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: #c9a84c; }
.sidebar-footer { padding: 1.25rem 1.5rem; border-top: 1px solid rgba(201,168,76,0.15); }
.back-link { font-size: 0.72rem; letter-spacing: 0.1em; color: rgba(245,240,232,0.4); text-decoration: none; transition: color 0.2s; }
.back-link:hover { color: #c9a84c; }

/* MAIN */
.admin-main { flex: 1; display: flex; flex-direction: column; overflow: auto; }
.topbar { background: #fff; border-bottom: 1px solid rgba(26,58,42,0.1); padding: 1.25rem 2rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
.topbar-eyebrow { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 0.2rem; }
.topbar-title { font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 400; color: #1a3a2a; line-height: 1; }
.topbar-right { display: flex; align-items: center; gap: 0.85rem; }
.admin-avatar { width: 38px; height: 38px; background: #1a3a2a; color: #c9a84c; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; }
.admin-info { display: flex; flex-direction: column; }
.admin-name { font-size: 0.8rem; font-weight: 500; color: #1a3a2a; }
.admin-role { font-size: 0.65rem; font-weight: 300; color: rgba(26,58,42,0.5); letter-spacing: 0.06em; }
.content-area { padding: 2rem; flex: 1; }
.mt-section { margin-top: 2rem; }

/* STAT CARDS */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
.stat-card { background: #fff; border: 1px solid rgba(26,58,42,0.07); border-top: 3px solid #c9a84c; padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; }
.stat-icon { font-size: 1.4rem; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(201,168,76,0.1); flex-shrink: 0; }
.stat-label { font-size: 0.68rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(26,58,42,0.5); margin-bottom: 0.35rem; }
.stat-value { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 500; color: #1a3a2a; line-height: 1; margin-bottom: 0.4rem; }
.stat-delta { font-size: 0.68rem; font-weight: 300; }
.delta--up { color: #2e7d52; }
.delta--neutral { color: rgba(26,58,42,0.4); }

/* PANEL */
.panel { background: #fff; border: 1px solid rgba(26,58,42,0.07); }
.panel-head { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(26,58,42,0.07); display: flex; align-items: center; justify-content: space-between; }
.panel-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 500; color: #1a3a2a; }
.panel-action { font-size: 0.72rem; font-weight: 400; letter-spacing: 0.08em; color: #c9a84c; background: none; border: none; cursor: pointer; }
.panel-action:hover { color: #1a3a2a; }

/* TABLE */
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #1a3a2a; }
.data-table thead th { padding: 0.75rem 1rem; text-align: left; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,240,232,0.7); white-space: nowrap; }
.data-table tbody tr { border-bottom: 1px solid rgba(26,58,42,0.06); transition: background 0.15s; }
.data-table tbody tr:hover { background: rgba(201,168,76,0.04); }
.data-table td { padding: 0.85rem 1rem; font-size: 0.84rem; color: #1a3a2a; vertical-align: middle; }
.rank-cell { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: rgba(26,58,42,0.4); width: 40px; }
.rank-badge { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: rgba(26,58,42,0.4); }
.rank-top { color: #c9a84c; font-weight: 600; }
.title-cell { font-weight: 500; }
.muted-cell { color: rgba(26,58,42,0.5); font-size: 0.8rem; }
.fav-bar-wrap { display: flex; align-items: center; gap: 0.6rem; }
.fav-bar { height: 4px; background: #c9a84c; min-width: 4px; transition: width 0.4s ease; max-width: 140px; }
.fav-count { font-size: 0.78rem; font-weight: 500; color: #1a3a2a; }
.empty-row { text-align: center; padding: 3rem 1rem !important; color: rgba(26,58,42,0.4); font-style: italic; }

/* RECENT BOOKS */
.recent-books-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1.5rem; }
.rbc-cover { height: 120px; display: flex; align-items: flex-end; padding: 0.75rem; margin-bottom: 0.65rem; position: relative; overflow: hidden; }
.rbc-year { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: rgba(255,255,255,0.2); }
.rbc-title { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; font-weight: 600; color: #1a3a2a; margin-bottom: 0.2rem; line-height: 1.3; }
.rbc-author { font-size: 0.72rem; font-weight: 300; color: rgba(26,58,42,0.5); margin-bottom: 0.5rem; }
.rbc-status { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.22rem 0.55rem; }
.status--available { background: rgba(46,125,82,0.1); color: #2e7d52; }

/* CRUD */
.crud-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
.crud-search-wrap { flex: 1; max-width: 360px; }
.crud-search { width: 100%; background: #fff; border: 1px solid rgba(26,58,42,0.18); padding: 0.72rem 1rem; font-family: 'Jost', sans-serif; font-size: 0.87rem; color: #1a3a2a; outline: none; }
.crud-search::placeholder { color: rgba(26,58,42,0.35); }
.crud-search:focus { border-color: #c9a84c; }
.btn-add { background: #1a3a2a; color: #f5f0e8; border: none; padding: 0.72rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; white-space: nowrap; transition: background 0.2s; }
.btn-add:hover { background: #c9a84c; color: #1a3a2a; }
.action-btns { display: flex; gap: 0.4rem; }
.action-btn { font-family: 'Jost', sans-serif; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.32rem 0.7rem; border: 1px solid; cursor: pointer; transition: all 0.2s; background: none; }
.action-btn--edit { border-color: rgba(26,58,42,0.25); color: rgba(26,58,42,0.65); }
.action-btn--edit:hover { background: #1a3a2a; color: #f5f0e8; border-color: #1a3a2a; }
.action-btn--delete { border-color: rgba(192,57,43,0.25); color: rgba(192,57,43,0.7); }
.action-btn--delete:hover { background: #c0392b; color: #fff; border-color: #c0392b; }

/* AUTHORS */
.authors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.author-card { background: #fff; border: 1px solid rgba(26,58,42,0.07); border-top: 2px solid #c9a84c; padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; transition: box-shadow 0.2s; }
.author-card:hover { box-shadow: 0 8px 24px rgba(26,58,42,0.08); }
.author-avatar { width: 42px; height: 42px; background: #1a3a2a; color: #c9a84c; flex-shrink: 0; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; display: flex; align-items: center; justify-content: center; }
.author-body { flex: 1; }
.author-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: #1a3a2a; margin-bottom: 0.2rem; }
.author-meta { font-size: 0.72rem; font-weight: 300; color: rgba(26,58,42,0.5); margin-bottom: 0.6rem; letter-spacing: 0.04em; }
.author-bio { font-size: 0.78rem; font-weight: 300; color: rgba(26,58,42,0.6); line-height: 1.55; margin-bottom: 1rem; }
.author-footer { display: flex; align-items: center; justify-content: space-between; }
.author-books { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; }
.empty-authors { grid-column: 1 / -1; text-align: center; padding: 3rem; font-style: italic; color: rgba(26,58,42,0.4); }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(26,58,42,0.5); backdrop-filter: blur(3px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal-box { background: #f5f0e8; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(26,58,42,0.25); }
.modal-head { background: #1a3a2a; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
.modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 400; color: #f5f0e8; }
.modal-close { background: none; border: none; color: rgba(245,240,232,0.6); font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 0; }
.modal-close:hover { color: #f5f0e8; }
.modal-body { padding: 1.75rem 1.5rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.form-field { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(26,58,42,0.55); }
.form-input { background: #fff; border: 1px solid rgba(26,58,42,0.18); padding: 0.75rem 0.9rem; font-family: 'Jost', sans-serif; font-size: 0.87rem; color: #1a3a2a; outline: none; width: 100%; transition: border-color 0.2s; }
.form-input:focus { border-color: #c9a84c; }
.modal-foot { padding: 1.25rem 1.5rem; border-top: 1px solid rgba(26,58,42,0.1); display: flex; justify-content: flex-end; gap: 0.75rem; }
.btn-cancel { background: none; border: 1px solid rgba(26,58,42,0.25); font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(26,58,42,0.6); padding: 0.65rem 1.5rem; cursor: pointer; }
.btn-cancel:hover { border-color: #1a3a2a; color: #1a3a2a; }
.btn-save { background: #1a3a2a; color: #f5f0e8; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.65rem 1.75rem; cursor: pointer; transition: background 0.2s; }
.btn-save:hover { background: #c9a84c; color: #1a3a2a; }
.btn-delete { background: #c0392b; color: #fff; border: none; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.65rem 1.75rem; cursor: pointer; }
.btn-delete:hover { background: #a93226; }
.delete-confirm-text { font-size: 0.9rem; line-height: 1.8; color: rgba(26,58,42,0.75); text-align: center; padding: 0.5rem 0; }
.delete-confirm-text strong { color: #1a3a2a; }
.delete-warn { font-size: 0.75rem; color: #c0392b; font-style: italic; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal-box, .modal-fade-leave-to .modal-box { transform: translateY(20px); }

/* TOAST */
.libra-toast { position: fixed; bottom: 1.5rem; right: 1.5rem; background: #1a3a2a; color: #f5f0e8; font-family: 'Jost', sans-serif; font-size: 0.82rem; padding: 0.85rem 1.5rem; border-left: 3px solid #c9a84c; display: flex; align-items: center; gap: 0.65rem; box-shadow: 0 8px 24px rgba(26,58,42,0.25); z-index: 2000; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(10px); }

/* RESPONSIVE */
@media (max-width: 900px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } .authors-grid { grid-template-columns: repeat(2, 1fr); } .recent-books-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .admin-root { flex-direction: column; } .sidebar { width: 100%; height: auto; position: relative; } .sidebar-nav { flex-direction: row; flex-wrap: wrap; padding: 0.75rem; } .stat-grid { grid-template-columns: repeat(2, 1fr); } .authors-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .stat-grid { grid-template-columns: 1fr; } .recent-books-grid { grid-template-columns: 1fr; } }
</style>