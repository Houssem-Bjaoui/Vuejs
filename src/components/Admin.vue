<script setup>
import { ref, computed, reactive } from 'vue'

// ── NAVIGATION ──
const activeSection = ref('dashboard')

// ── STATS ──
const stats = reactive({
  users: 1284,
  books: 312,
  favorites: 4760,
  authors: 98,
})

// ── FAVORITE BOOKS ──
const favorites = ref([
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', count: 342, genre: 'Classic' },
  { id: 2, title: '1984', author: 'George Orwell', count: 298, genre: 'Dystopian' },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', count: 267, genre: 'Romance' },
  { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', count: 245, genre: 'Fantasy' },
  { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', count: 221, genre: 'Classic' },
  { id: 6, title: 'Brave New World', author: 'Aldous Huxley', count: 198, genre: 'Dystopian' },
])

// ── BOOKS ──
const books = ref([
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', isbn: '978-0-7432-7356-5', year: 1925, status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', isbn: '978-0-06-112008-4', year: 1960, status: 'Borrowed' },
  { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', isbn: '978-0-452-28423-4', year: 1949, status: 'Available' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', isbn: '978-0-14-143951-8', year: 1813, status: 'Available' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Coming of Age', isbn: '978-0-316-76948-0', year: 1951, status: 'Maintenance' },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', isbn: '978-0-547-92822-7', year: 1937, status: 'Available' },
  { id: 7, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', isbn: '978-0-06-085052-4', year: 1932, status: 'Available' },
  { id: 8, title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic', isbn: '978-0-14-143955-6', year: 1847, status: 'Available' },
])

const bookSearch = ref('')
const filteredBooks = computed(() => {
  const q = bookSearch.value.toLowerCase()
  if (!q) return books.value
  return books.value.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q)
  )
})

// ── AUTHORS ──
const authors = ref([
  { id: 1, name: 'F. Scott Fitzgerald', nationality: 'American', born: 1896, died: 1940, books: 4, bio: 'Author of The Great Gatsby and other Jazz Age novels.' },
  { id: 2, name: 'Harper Lee', nationality: 'American', born: 1926, died: 2016, books: 2, bio: 'Pulitzer Prize-winning author known for To Kill a Mockingbird.' },
  { id: 3, name: 'George Orwell', nationality: 'British', born: 1903, died: 1950, books: 6, bio: 'English novelist and essayist known for dystopian fiction.' },
  { id: 4, name: 'Jane Austen', nationality: 'British', born: 1775, died: 1817, books: 6, bio: 'Celebrated for wit and social commentary in Regency England.' },
  { id: 5, name: 'J.R.R. Tolkien', nationality: 'British', born: 1892, died: 1973, books: 12, bio: 'Father of modern high fantasy literature.' },
  { id: 6, name: 'Emily Brontë', nationality: 'British', born: 1818, died: 1848, books: 1, bio: 'Author of the gothic masterpiece Wuthering Heights.' },
])

const authorSearch = ref('')
const filteredAuthors = computed(() => {
  const q = authorSearch.value.toLowerCase()
  if (!q) return authors.value
  return authors.value.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.nationality.toLowerCase().includes(q)
  )
})

// ── MODAL STATE ──
const modal = reactive({
  open: false,
  type: null, // 'add-book' | 'edit-book' | 'delete-book' | 'add-author' | 'edit-author' | 'delete-author'
  data: {}
})

const bookForm = reactive({ id: null, title: '', author: '', genre: '', isbn: '', year: '', status: 'Available' })
const authorForm = reactive({ id: null, name: '', nationality: '', born: '', died: '', books: '', bio: '' })

const genreOptions = ['Classic', 'Dystopian', 'Romance', 'Fantasy', 'Mystery', 'Coming of Age', 'Gothic', 'Psychological', 'Adventure', 'Epic', 'Historical']
const statusOptions = ['Available', 'Borrowed', 'Maintenance']

function openModal(type, item = null) {
  modal.type = type
  modal.open = true
  if (type === 'edit-book' && item) {
    Object.assign(bookForm, { ...item })
  } else if (type === 'add-book') {
    Object.assign(bookForm, { id: null, title: '', author: '', genre: 'Classic', isbn: '', year: new Date().getFullYear(), status: 'Available' })
  } else if (type === 'edit-author' && item) {
    Object.assign(authorForm, { ...item })
  } else if (type === 'add-author') {
    Object.assign(authorForm, { id: null, name: '', nationality: '', born: '', died: '', books: '', bio: '' })
  } else if (type === 'delete-book' || type === 'delete-author') {
    modal.data = item
  }
}

function closeModal() {
  modal.open = false
  modal.type = null
  modal.data = {}
}

// ── BOOK CRUD ──
function saveBook() {
  if (!bookForm.title || !bookForm.author) return
  if (bookForm.id) {
    const idx = books.value.findIndex(b => b.id === bookForm.id)
    if (idx !== -1) books.value[idx] = { ...bookForm }
  } else {
    books.value.push({ ...bookForm, id: Date.now() })
    stats.books++
  }
  closeModal()
}

function deleteBook() {
  books.value = books.value.filter(b => b.id !== modal.data.id)
  stats.books = Math.max(0, stats.books - 1)
  closeModal()
}

// ── AUTHOR CRUD ──
function saveAuthor() {
  if (!authorForm.name) return
  if (authorForm.id) {
    const idx = authors.value.findIndex(a => a.id === authorForm.id)
    if (idx !== -1) authors.value[idx] = { ...authorForm }
  } else {
    authors.value.push({ ...authorForm, id: Date.now() })
    stats.authors++
  }
  closeModal()
}

function deleteAuthor() {
  authors.value = authors.value.filter(a => a.id !== modal.data.id)
  stats.authors = Math.max(0, stats.authors - 1)
  closeModal()
}

// ── TOAST ──
const toast = reactive({ show: false, message: '' })
function showToast(msg) {
  toast.message = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, 3000)
}

const navItems = [
  { key: 'dashboard', icon: '◈', label: 'Dashboard' },
  { key: 'books', icon: '◉', label: 'Books' },
  { key: 'authors', icon: '◎', label: 'Authors' },
  { key: 'favorites', icon: '◆', label: 'Favourites' },
]
</script>

<template>
  <div class="admin-root">

    <!-- ── SIDEBAR ── -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="brand-star">✦</span>
        <span class="brand-text">Libra</span>
        <span class="brand-sub">Admin</span>
      </div>

      <nav class="sidebar-nav">
        <button
            v-for="item in navItems"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeSection === item.key }"
            @click="activeSection = item.key"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <a href="/" class="back-link">← Back to Site</a>
      </div>
    </aside>

    <!-- ── MAIN ── -->
    <div class="admin-main">

      <!-- TOP BAR -->
      <header class="topbar">
        <div class="topbar-left">
          <p class="topbar-eyebrow">✦ Libra Admin</p>
          <h1 class="topbar-title">
            {{ navItems.find(n => n.key === activeSection)?.label }}
          </h1>
        </div>
        <div class="topbar-right">
          <div class="admin-avatar">A</div>
          <div class="admin-info">
            <span class="admin-name">Administrator</span>
            <span class="admin-role">Super Admin</span>
          </div>
        </div>
      </header>

      <main class="content-area">

        <!-- ══════════════════════════════════════════
             DASHBOARD
        ══════════════════════════════════════════ -->
        <div v-if="activeSection === 'dashboard'" class="section-dashboard">

          <!-- STAT CARDS -->
          <div class="stat-grid">
            <div class="stat-card">
              <div class="stat-icon stat-icon--users">👤</div>
              <div class="stat-body">
                <p class="stat-label">Total Users</p>
                <p class="stat-value">{{ stats.users.toLocaleString() }}</p>
                <p class="stat-delta delta--up">↑ 12% this month</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-icon--books">📚</div>
              <div class="stat-body">
                <p class="stat-label">Total Books</p>
                <p class="stat-value">{{ stats.books.toLocaleString() }}</p>
                <p class="stat-delta delta--up">↑ 3 added recently</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-icon--fav">♡</div>
              <div class="stat-body">
                <p class="stat-label">Total Favourites</p>
                <p class="stat-value">{{ stats.favorites.toLocaleString() }}</p>
                <p class="stat-delta delta--up">↑ 8% this week</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-icon--authors">✍</div>
              <div class="stat-body">
                <p class="stat-label">Authors</p>
                <p class="stat-value">{{ stats.authors.toLocaleString() }}</p>
                <p class="stat-delta delta--neutral">→ Stable</p>
              </div>
            </div>
          </div>

          <!-- QUICK TABLE: MOST FAVORITED -->
          <div class="panel mt-section">
            <div class="panel-head">
              <h2 class="panel-title">Most Favourited Books</h2>
              <button class="panel-action" @click="activeSection = 'favorites'">View all →</button>
            </div>
            <table class="data-table">
              <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Favourites</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(fav, i) in favorites.slice(0, 5)" :key="fav.id">
                <td class="rank-cell">{{ i + 1 }}</td>
                <td class="title-cell">{{ fav.title }}</td>
                <td class="muted-cell">{{ fav.author }}</td>
                <td><span class="genre-tag">{{ fav.genre }}</span></td>
                <td>
                  <div class="fav-bar-wrap">
                    <div class="fav-bar" :style="{ width: (fav.count / favorites[0].count * 100) + '%' }"></div>
                    <span class="fav-count">{{ fav.count }}</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- RECENT BOOKS -->
          <div class="panel mt-section">
            <div class="panel-head">
              <h2 class="panel-title">Recently Added Books</h2>
              <button class="panel-action" @click="activeSection = 'books'">Manage →</button>
            </div>
            <div class="recent-books-grid">
              <div class="recent-book-card" v-for="book in books.slice(0,4)" :key="book.id">
                <div class="rbc-cover" :style="{ background: ['#7a6248','#4a6741','#2d4a5c','#7a4a5c'][book.id % 4] }">
                  <span class="rbc-year">{{ book.year }}</span>
                </div>
                <p class="rbc-title">{{ book.title }}</p>
                <p class="rbc-author">{{ book.author }}</p>
                <span class="rbc-status" :class="'status--' + book.status.toLowerCase()">{{ book.status }}</span>
              </div>
            </div>
          </div>
        </div>


        <!-- ══════════════════════════════════════════
             BOOKS CRUD
        ══════════════════════════════════════════ -->
        <div v-if="activeSection === 'books'" class="section-crud">
          <div class="crud-header">
            <div class="crud-search-wrap">
              <input class="crud-search" type="text" placeholder="Search books…" v-model="bookSearch" />
            </div>
            <button class="btn-add" @click="openModal('add-book')">+ Add Book</button>
          </div>

          <div class="panel">
            <table class="data-table">
              <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="book in filteredBooks" :key="book.id">
                <td class="muted-cell">{{ book.id }}</td>
                <td class="title-cell">{{ book.title }}</td>
                <td class="muted-cell">{{ book.author }}</td>
                <td><span class="genre-tag">{{ book.genre }}</span></td>
                <td class="mono-cell">{{ book.isbn }}</td>
                <td class="muted-cell">{{ book.year }}</td>
                <td>
                  <span class="status-badge" :class="'status--' + book.status.toLowerCase()">{{ book.status }}</span>
                </td>
                <td>
                  <div class="action-btns">
                    <button class="action-btn action-btn--edit" @click="openModal('edit-book', book)">Edit</button>
                    <button class="action-btn action-btn--delete" @click="openModal('delete-book', book)">Delete</button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredBooks.length === 0">
                <td colspan="8" class="empty-row">No books found</td>
              </tr>
              </tbody>
            </table>
            <div class="table-footer">
              <span class="muted-cell">Showing {{ filteredBooks.length }} of {{ books.length }} books</span>
            </div>
          </div>
        </div>


        <!-- ══════════════════════════════════════════
             AUTHORS CRUD
        ══════════════════════════════════════════ -->
        <div v-if="activeSection === 'authors'" class="section-crud">
          <div class="crud-header">
            <div class="crud-search-wrap">
              <input class="crud-search" type="text" placeholder="Search authors…" v-model="authorSearch" />
            </div>
            <button class="btn-add" @click="openModal('add-author')">+ Add Author</button>
          </div>

          <div class="authors-grid">
            <div class="author-card" v-for="author in filteredAuthors" :key="author.id">
              <div class="author-avatar">{{ author.name.charAt(0) }}</div>
              <div class="author-body">
                <h3 class="author-name">{{ author.name }}</h3>
                <p class="author-meta">{{ author.nationality }} · {{ author.born }}–{{ author.died || 'present' }}</p>
                <p class="author-bio">{{ author.bio }}</p>
                <div class="author-footer">
                  <span class="author-books">{{ author.books }} works</span>
                  <div class="action-btns">
                    <button class="action-btn action-btn--edit" @click="openModal('edit-author', author)">Edit</button>
                    <button class="action-btn action-btn--delete" @click="openModal('delete-author', author)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="filteredAuthors.length === 0" class="empty-authors">
              No authors found.
            </div>
          </div>
        </div>


        <!-- ══════════════════════════════════════════
             FAVORITES
        ══════════════════════════════════════════ -->
        <div v-if="activeSection === 'favorites'" class="section-crud">
          <div class="panel">
            <div class="panel-head">
              <h2 class="panel-title">All Favourited Books</h2>
              <span class="muted-cell">{{ favorites.length }} entries</span>
            </div>
            <table class="data-table">
              <thead>
              <tr>
                <th>Rank</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Favourites</th>
                <th>Share</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(fav, i) in favorites" :key="fav.id">
                <td class="rank-cell">
                  <span class="rank-badge" :class="i < 3 ? 'rank-top' : ''">{{ i + 1 }}</span>
                </td>
                <td class="title-cell">{{ fav.title }}</td>
                <td class="muted-cell">{{ fav.author }}</td>
                <td><span class="genre-tag">{{ fav.genre }}</span></td>
                <td>
                  <div class="fav-bar-wrap">
                    <div class="fav-bar" :style="{ width: (fav.count / favorites[0].count * 100) + '%' }"></div>
                    <span class="fav-count">{{ fav.count }}</span>
                  </div>
                </td>
                <td class="muted-cell">{{ (fav.count / stats.favorites * 100).toFixed(1) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>


    <!-- ══════════════════════════════════════════
         MODAL OVERLAY
    ══════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="modal.open" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">

          <!-- ADD / EDIT BOOK -->
          <template v-if="modal.type === 'add-book' || modal.type === 'edit-book'">
            <div class="modal-head">
              <h3 class="modal-title">{{ modal.type === 'add-book' ? 'Add New Book' : 'Edit Book' }}</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Title</label>
                  <input class="form-input" type="text" v-model="bookForm.title" placeholder="Book title" />
                </div>
                <div class="form-field">
                  <label class="form-label">Author</label>
                  <input class="form-input" type="text" v-model="bookForm.author" placeholder="Author name" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Genre</label>
                  <select class="form-input" v-model="bookForm.genre">
                    <option v-for="g in genreOptions" :key="g" :value="g">{{ g }}</option>
                  </select>
                </div>
                <div class="form-field">
                  <label class="form-label">ISBN</label>
                  <input class="form-input" type="text" v-model="bookForm.isbn" placeholder="978-..." />
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Year</label>
                  <input class="form-input" type="number" v-model="bookForm.year" placeholder="e.g. 1984" />
                </div>
                <div class="form-field">
                  <label class="form-label">Status</label>
                  <select class="form-input" v-model="bookForm.status">
                    <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-foot">
              <button class="btn-cancel" @click="closeModal">Cancel</button>
              <button class="btn-save" @click="saveBook">
                {{ modal.type === 'add-book' ? 'Add Book' : 'Save Changes' }}
              </button>
            </div>
          </template>

          <!-- DELETE BOOK -->
          <template v-if="modal.type === 'delete-book'">
            <div class="modal-head">
              <h3 class="modal-title">Delete Book</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
              <p class="delete-confirm-text">
                Are you sure you want to permanently delete<br>
                <strong>{{ modal.data?.title }}</strong>?<br>
                <span class="delete-warn">This action cannot be undone.</span>
              </p>
            </div>
            <div class="modal-foot">
              <button class="btn-cancel" @click="closeModal">Cancel</button>
              <button class="btn-delete" @click="deleteBook">Delete</button>
            </div>
          </template>

          <!-- ADD / EDIT AUTHOR -->
          <template v-if="modal.type === 'add-author' || modal.type === 'edit-author'">
            <div class="modal-head">
              <h3 class="modal-title">{{ modal.type === 'add-author' ? 'Add New Author' : 'Edit Author' }}</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Full Name</label>
                  <input class="form-input" type="text" v-model="authorForm.name" placeholder="Author name" />
                </div>
                <div class="form-field">
                  <label class="form-label">Nationality</label>
                  <input class="form-input" type="text" v-model="authorForm.nationality" placeholder="e.g. British" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Born</label>
                  <input class="form-input" type="number" v-model="authorForm.born" placeholder="e.g. 1775" />
                </div>
                <div class="form-field">
                  <label class="form-label">Died (leave blank if living)</label>
                  <input class="form-input" type="number" v-model="authorForm.died" placeholder="e.g. 1817" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label class="form-label">Number of Works</label>
                  <input class="form-input" type="number" v-model="authorForm.books" placeholder="e.g. 6" />
                </div>
              </div>
              <div class="form-field" style="margin-top: 1rem;">
                <label class="form-label">Biography</label>
                <textarea class="form-input form-textarea" v-model="authorForm.bio" placeholder="Short biography…" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-foot">
              <button class="btn-cancel" @click="closeModal">Cancel</button>
              <button class="btn-save" @click="saveAuthor">
                {{ modal.type === 'add-author' ? 'Add Author' : 'Save Changes' }}
              </button>
            </div>
          </template>

          <!-- DELETE AUTHOR -->
          <template v-if="modal.type === 'delete-author'">
            <div class="modal-head">
              <h3 class="modal-title">Delete Author</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
              <p class="delete-confirm-text">
                Are you sure you want to remove<br>
                <strong>{{ modal.data?.name }}</strong> from the system?<br>
                <span class="delete-warn">This action cannot be undone.</span>
              </p>
            </div>
            <div class="modal-foot">
              <button class="btn-cancel" @click="closeModal">Cancel</button>
              <button class="btn-delete" @click="deleteAuthor">Delete</button>
            </div>
          </template>

        </div>
      </div>
    </transition>

    <!-- TOAST -->
    <transition name="toast-fade">
      <div v-if="toast.show" class="libra-toast">
        <span style="color:#c9a84c">✦</span> {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ════════════════════════════════════
   LAYOUT
════════════════════════════════════ */
.admin-root {
  display: flex;
  min-height: 100vh;
  background: #f0ece3;
  font-family: 'Jost', sans-serif;
}

/* ════════════════════════════════════
   SIDEBAR
════════════════════════════════════ */
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: #1a3a2a;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
}

.sidebar-brand {
  padding: 1.75rem 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(201,168,76,0.2);
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.brand-star { color: #c9a84c; font-size: 0.7rem; }
.brand-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f5f0e8;
  letter-spacing: 0.03em;
}
.brand-sub {
  font-size: 0.6rem;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.7);
}

.sidebar-nav {
  flex: 1;
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.85rem;
  background: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
  width: 100%;
  position: relative;
}

.nav-icon { font-size: 0.8rem; color: rgba(245,240,232,0.4); transition: color 0.2s; }
.nav-label { font-size: 0.78rem; font-weight: 400; letter-spacing: 0.08em; color: rgba(245,240,232,0.55); transition: color 0.2s; }

.nav-item:hover .nav-icon, .nav-item:hover .nav-label { color: #f5f0e8; }
.nav-item.active { background: rgba(201,168,76,0.1); }
.nav-item.active .nav-icon { color: #c9a84c; }
.nav-item.active .nav-label { color: #f5f0e8; font-weight: 500; }
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: #c9a84c;
}

.sidebar-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(201,168,76,0.15);
}

.back-link {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: rgba(245,240,232,0.4);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover { color: #c9a84c; }

/* ════════════════════════════════════
   MAIN AREA
════════════════════════════════════ */
.admin-main { flex: 1; display: flex; flex-direction: column; overflow: auto; }

.topbar {
  background: #fff;
  border-bottom: 1px solid rgba(26,58,42,0.1);
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar-eyebrow {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 0.2rem;
}

.topbar-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #1a3a2a;
  line-height: 1;
}

.topbar-right { display: flex; align-items: center; gap: 0.85rem; }

.admin-avatar {
  width: 38px; height: 38px;
  background: #1a3a2a;
  color: #c9a84c;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-weight: 600;
}

.admin-info { display: flex; flex-direction: column; }
.admin-name { font-size: 0.8rem; font-weight: 500; color: #1a3a2a; }
.admin-role { font-size: 0.65rem; font-weight: 300; color: rgba(26,58,42,0.5); letter-spacing: 0.06em; }

.content-area { padding: 2rem; flex: 1; }
.mt-section { margin-top: 2rem; }

/* ════════════════════════════════════
   STAT CARDS
════════════════════════════════════ */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.stat-card {
  background: #fff;
  border: 1px solid rgba(26,58,42,0.07);
  border-top: 3px solid #c9a84c;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.stat-icon {
  font-size: 1.4rem;
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(201,168,76,0.1);
  flex-shrink: 0;
}

.stat-label { font-size: 0.68rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(26,58,42,0.5); margin-bottom: 0.35rem; }
.stat-value { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 500; color: #1a3a2a; line-height: 1; margin-bottom: 0.4rem; }
.stat-delta { font-size: 0.68rem; font-weight: 300; }
.delta--up { color: #2e7d52; }
.delta--neutral { color: rgba(26,58,42,0.4); }

/* ════════════════════════════════════
   PANEL
════════════════════════════════════ */
.panel { background: #fff; border: 1px solid rgba(26,58,42,0.07); }

.panel-head {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(26,58,42,0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 500; color: #1a3a2a; }

.panel-action {
  font-size: 0.72rem; font-weight: 400; letter-spacing: 0.08em;
  color: #c9a84c; background: none; border: none; cursor: pointer;
}
.panel-action:hover { color: #1a3a2a; }

/* ════════════════════════════════════
   DATA TABLE
════════════════════════════════════ */
.data-table { width: 100%; border-collapse: collapse; }

.data-table thead tr { background: #1a3a2a; }
.data-table thead th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.7);
  white-space: nowrap;
}

.data-table tbody tr { border-bottom: 1px solid rgba(26,58,42,0.06); transition: background 0.15s; }
.data-table tbody tr:hover { background: rgba(201,168,76,0.04); }
.data-table td { padding: 0.85rem 1rem; font-size: 0.84rem; color: #1a3a2a; vertical-align: middle; }

.rank-cell { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: rgba(26,58,42,0.4); width: 40px; }
.title-cell { font-weight: 500; }
.muted-cell { color: rgba(26,58,42,0.5); font-size: 0.8rem; }
.mono-cell { font-family: monospace; font-size: 0.75rem; color: rgba(26,58,42,0.55); }

.genre-tag {
  font-size: 0.62rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  background: rgba(26,58,42,0.07); color: rgba(26,58,42,0.6);
  padding: 0.25rem 0.6rem; white-space: nowrap;
}

.status-badge {
  font-size: 0.62rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.25rem 0.65rem;
}
.status--available { background: rgba(46,125,82,0.1); color: #2e7d52; }
.status--borrowed { background: rgba(201,168,76,0.15); color: #8a6f2c; }
.status--maintenance { background: rgba(192,57,43,0.1); color: #c0392b; }

.fav-bar-wrap { display: flex; align-items: center; gap: 0.6rem; }
.fav-bar { height: 4px; background: #c9a84c; min-width: 4px; transition: width 0.4s ease; max-width: 140px; }
.fav-count { font-size: 0.78rem; font-weight: 500; color: #1a3a2a; }

.rank-badge { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: rgba(26,58,42,0.4); }
.rank-top { color: #c9a84c; font-weight: 600; }

.empty-row { text-align: center; padding: 3rem 1rem !important; color: rgba(26,58,42,0.4); font-style: italic; }

.table-footer { padding: 0.85rem 1rem; border-top: 1px solid rgba(26,58,42,0.06); }

/* ════════════════════════════════════
   RECENT BOOKS MINI GRID
════════════════════════════════════ */
.recent-books-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1.5rem; }

.recent-book-card { }
.rbc-cover {
  height: 120px; display: flex; align-items: flex-end; padding: 0.75rem;
  margin-bottom: 0.65rem; position: relative; overflow: hidden;
}
.rbc-year { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: rgba(255,255,255,0.2); }
.rbc-title { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; font-weight: 600; color: #1a3a2a; margin-bottom: 0.2rem; line-height: 1.3; }
.rbc-author { font-size: 0.72rem; font-weight: 300; color: rgba(26,58,42,0.5); margin-bottom: 0.5rem; }
.rbc-status { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.22rem 0.55rem; }

/* ════════════════════════════════════
   CRUD SECTION
════════════════════════════════════ */
.crud-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; margin-bottom: 1.25rem;
}

.crud-search-wrap { flex: 1; max-width: 360px; }
.crud-search {
  width: 100%; background: #fff;
  border: 1px solid rgba(26,58,42,0.18);
  padding: 0.72rem 1rem;
  font-family: 'Jost', sans-serif; font-size: 0.87rem; color: #1a3a2a; outline: none;
}
.crud-search::placeholder { color: rgba(26,58,42,0.35); }
.crud-search:focus { border-color: #c9a84c; }

.btn-add {
  background: #1a3a2a; color: #f5f0e8;
  border: none; padding: 0.72rem 1.5rem;
  font-family: 'Jost', sans-serif; font-size: 0.78rem;
  font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer; white-space: nowrap; transition: background 0.2s;
}
.btn-add:hover { background: #c9a84c; color: #1a3a2a; }

.action-btns { display: flex; gap: 0.4rem; }
.action-btn {
  font-family: 'Jost', sans-serif; font-size: 0.65rem; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase; padding: 0.32rem 0.7rem;
  border: 1px solid; cursor: pointer; transition: all 0.2s;
  background: none;
}
.action-btn--edit { border-color: rgba(26,58,42,0.25); color: rgba(26,58,42,0.65); }
.action-btn--edit:hover { background: #1a3a2a; color: #f5f0e8; border-color: #1a3a2a; }
.action-btn--delete { border-color: rgba(192,57,43,0.25); color: rgba(192,57,43,0.7); }
.action-btn--delete:hover { background: #c0392b; color: #fff; border-color: #c0392b; }

/* ════════════════════════════════════
   AUTHOR CARDS
════════════════════════════════════ */
.authors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

.author-card {
  background: #fff; border: 1px solid rgba(26,58,42,0.07);
  border-top: 2px solid #c9a84c;
  padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;
  transition: box-shadow 0.2s;
}
.author-card:hover { box-shadow: 0 8px 24px rgba(26,58,42,0.08); }

.author-avatar {
  width: 42px; height: 42px; background: #1a3a2a;
  color: #c9a84c; flex-shrink: 0;
  font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}

.author-body { flex: 1; }
.author-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: #1a3a2a; margin-bottom: 0.2rem; }
.author-meta { font-size: 0.72rem; font-weight: 300; color: rgba(26,58,42,0.5); margin-bottom: 0.6rem; letter-spacing: 0.04em; }
.author-bio { font-size: 0.78rem; font-weight: 300; color: rgba(26,58,42,0.6); line-height: 1.55; margin-bottom: 1rem; }
.author-footer { display: flex; align-items: center; justify-content: space-between; }
.author-books { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; }

.empty-authors { grid-column: 1 / -1; text-align: center; padding: 3rem; font-style: italic; color: rgba(26,58,42,0.4); }

/* ════════════════════════════════════
   MODAL
════════════════════════════════════ */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(26,58,42,0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}

.modal-box {
  background: #f5f0e8;
  width: 100%; max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(26,58,42,0.25);
}

.modal-head {
  background: #1a3a2a; padding: 1.25rem 1.5rem;
  display: flex; align-items: center; justify-content: space-between;
}
.modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 400; color: #f5f0e8; }
.modal-close {
  background: none; border: none; color: rgba(245,240,232,0.6);
  font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 0;
}
.modal-close:hover { color: #f5f0e8; }

.modal-body { padding: 1.75rem 1.5rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.form-field { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(26,58,42,0.55); }
.form-input {
  background: #fff; border: 1px solid rgba(26,58,42,0.18);
  padding: 0.75rem 0.9rem;
  font-family: 'Jost', sans-serif; font-size: 0.87rem; color: #1a3a2a;
  outline: none; width: 100%; transition: border-color 0.2s;
}
.form-input:focus { border-color: #c9a84c; }
.form-textarea { resize: vertical; min-height: 80px; }

.modal-foot {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(26,58,42,0.1);
  display: flex; justify-content: flex-end; gap: 0.75rem;
}

.btn-cancel {
  background: none; border: 1px solid rgba(26,58,42,0.25);
  font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(26,58,42,0.6); padding: 0.65rem 1.5rem; cursor: pointer;
}
.btn-cancel:hover { border-color: #1a3a2a; color: #1a3a2a; }

.btn-save {
  background: #1a3a2a; color: #f5f0e8; border: none;
  font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.65rem 1.75rem; cursor: pointer; transition: background 0.2s;
}
.btn-save:hover { background: #c9a84c; color: #1a3a2a; }

.btn-delete {
  background: #c0392b; color: #fff; border: none;
  font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.65rem 1.75rem; cursor: pointer;
}
.btn-delete:hover { background: #a93226; }

.delete-confirm-text {
  font-size: 0.9rem; line-height: 1.8; color: rgba(26,58,42,0.75); text-align: center;
  padding: 0.5rem 0;
}
.delete-confirm-text strong { color: #1a3a2a; }
.delete-warn { font-size: 0.75rem; color: #c0392b; font-style: italic; }

/* MODAL ANIMATIONS */
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal-box, .modal-fade-leave-to .modal-box { transform: translateY(20px); }

/* ════════════════════════════════════
   TOAST
════════════════════════════════════ */
.libra-toast {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  background: #1a3a2a; color: #f5f0e8;
  font-family: 'Jost', sans-serif; font-size: 0.82rem;
  padding: 0.85rem 1.5rem;
  border-left: 3px solid #c9a84c;
  display: flex; align-items: center; gap: 0.65rem;
  box-shadow: 0 8px 24px rgba(26,58,42,0.25);
  z-index: 2000;
}

.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(10px); }

/* ════════════════════════════════════
   RESPONSIVE
════════════════════════════════════ */
@media (max-width: 1100px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .authors-grid { grid-template-columns: repeat(2, 1fr); }
  .recent-books-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .admin-root { flex-direction: column; }
  .sidebar { width: 100%; height: auto; position: relative; }
  .sidebar-nav { flex-direction: row; flex-wrap: wrap; padding: 0.75rem; }
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .authors-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .stat-grid { grid-template-columns: 1fr; }
  .recent-books-grid { grid-template-columns: 1fr; }
}
</style>