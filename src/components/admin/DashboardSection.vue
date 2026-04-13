<script setup>
const props = defineProps({
  stats:          { type: Object, required: true },
  mostFavourited: { type: Array,  required: true },
  books:          { type: Array,  required: true },
})
</script>

<template>
  <div class="section-dashboard">

    <!-- ── 4 STAT CARDS ── -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon">👤</div>
        <div class="stat-body">
          <p class="stat-label">Total Users</p>
          <p class="stat-value">{{ props.stats.users.toLocaleString() }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">♡</div>
        <div class="stat-body">
          <p class="stat-label">Total Favourites</p>
          <p class="stat-value">{{ props.stats.favorites.toLocaleString() }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-body">
          <p class="stat-label">Total Books</p>
          <p class="stat-value">{{ props.stats.books.toLocaleString() }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">✍</div>
        <div class="stat-body">
          <p class="stat-label">Total Authors</p>
          <p class="stat-value">{{ props.stats.authors.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <!-- ── MOST FAVOURITED BOOKS ── -->
    <div class="panel mt-section">
      <div class="panel-head">
        <h2 class="panel-title">Most Favourited Books</h2>
        <span class="muted-cell">Top {{ props.mostFavourited.length }}</span>
      </div>

      <table class="data-table">
        <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Favourites</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="props.mostFavourited.length === 0">
          <td colspan="5" class="empty-row">No favourites recorded yet.</td>
        </tr>

        <tr v-for="(fav, i) in props.mostFavourited" :key="fav.bookId">
          <td class="rank-cell">
            <span class="rank-badge" :class="i < 3 ? 'rank-top' : ''">{{ i + 1 }}</span>
          </td>
          <td class="cover-cell">
            <img
                v-if="fav.image"
                :src="fav.image"
                :alt="fav.title"
                class="book-thumb"
                @error="$event.target.style.display='none'"
            />
            <div v-else class="book-thumb-placeholder">📖</div>
          </td>
          <td class="title-cell">{{ fav.title }}</td>
          <td class="muted-cell">{{ fav.authorName }}</td>
          <td>
            <div class="fav-bar-wrap">
              <div
                  class="fav-bar"
                  :style="{ width: (fav.count / props.mostFavourited[0].count * 100) + '%' }"
              ></div>
              <span class="fav-count">{{ fav.count }}</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- ── RECENTLY ADDED BOOKS ── -->
    <div class="panel mt-section">
      <div class="panel-head">
        <h2 class="panel-title">Recently Added Books</h2>
      </div>
      <div class="recent-books-grid">
        <div
            class="recent-book-card"
            v-for="book in props.books.slice(0, 4)"
            :key="book.id"
        >
          <div class="rbc-cover-wrap">
            <img
                v-if="book.image"
                :src="book.image"
                :alt="book.title"
                class="rbc-cover-img"
                @error="$event.target.style.display='none'"
            />
            <div v-else class="rbc-cover-placeholder">
              <span class="rbc-year">{{ book.year }}</span>
            </div>
          </div>
          <p class="rbc-title">{{ book.title }}</p>
          <p class="rbc-author">{{ book.authorLabel }}</p>
        </div>
        <p v-if="props.books.length === 0" style="padding:1.5rem;color:rgba(26,58,42,0.4);font-style:italic;">
          No books yet.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* stat-grid : 4 colonnes */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

/* Miniature dans la table Most Favourited */
.cover-cell { width: 56px; padding: 0.5rem 1rem !important; }

.book-thumb {
  width: 40px;
  height: 56px;
  object-fit: cover;
  display: block;
  border: 1px solid rgba(26,58,42,0.1);
}

.book-thumb-placeholder {
  width: 40px;
  height: 56px;
  background: rgba(201,168,76,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border: 1px solid rgba(26,58,42,0.08);
}

/* Cartes Recently Added avec vraie photo */
.recent-books-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1.5rem;
}

.rbc-cover-wrap {
  height: 140px;
  margin-bottom: 0.65rem;
  overflow: hidden;
  background: rgba(201,168,76,0.1);
}

.rbc-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rbc-cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
  background: #7a6248;
}

.rbc-year {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: rgba(255,255,255,0.25);
}

@media (max-width: 1100px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .recent-books-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .stat-grid { grid-template-columns: 1fr; }
  .recent-books-grid { grid-template-columns: 1fr; }
}
</style>