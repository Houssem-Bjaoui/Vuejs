<script setup>
const props = defineProps({
  stats: { type: Object, required: true },
  favorites: { type: Array, required: true },
  books: { type: Array, required: true }
})

const emit = defineEmits(['navigate'])

const coverColors = ['#7a6248', '#4a6741', '#2d4a5c', '#7a4a5c']

function goTo(key) {
  emit('navigate', key)
}
</script>

<template>
  <div class="section-dashboard">
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon stat-icon--users">👤</div>
        <div class="stat-body">
          <p class="stat-label">Total Users</p>
          <p class="stat-value">{{ props.stats.users.toLocaleString() }}</p>
          <p class="stat-delta delta--up">↑ 12% this month</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--books">📚</div>
        <div class="stat-body">
          <p class="stat-label">Total Books</p>
          <p class="stat-value">{{ props.stats.books.toLocaleString() }}</p>
          <p class="stat-delta delta--up">↑ 3 added recently</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--fav">♡</div>
        <div class="stat-body">
          <p class="stat-label">Total Favourites</p>
          <p class="stat-value">{{ props.stats.favorites.toLocaleString() }}</p>
          <p class="stat-delta delta--up">↑ 8% this week</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--authors">✍</div>
        <div class="stat-body">
          <p class="stat-label">Authors</p>
          <p class="stat-value">{{ props.stats.authors.toLocaleString() }}</p>
          <p class="stat-delta delta--neutral">→ Stable</p>
        </div>
      </div>
    </div>

    <div class="panel mt-section">
      <div class="panel-head">
        <h2 class="panel-title">Most Favourited Books</h2>
        <button class="panel-action" @click="goTo('favorites')">View all →</button>
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
          <tr v-for="(fav, i) in props.favorites.slice(0, 5)" :key="fav.id">
            <td class="rank-cell">{{ i + 1 }}</td>
            <td class="title-cell">{{ fav.title }}</td>
            <td class="muted-cell">{{ fav.author }}</td>
            <td><span class="genre-tag">{{ fav.genre }}</span></td>
            <td>
              <div class="fav-bar-wrap">
                <div class="fav-bar" :style="{ width: (fav.count / props.favorites[0].count * 100) + '%' }"></div>
                <span class="fav-count">{{ fav.count }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="panel mt-section">
      <div class="panel-head">
        <h2 class="panel-title">Recently Added Books</h2>
        <button class="panel-action" @click="goTo('books')">Manage →</button>
      </div>
      <div class="recent-books-grid">
        <div class="recent-book-card" v-for="book in props.books.slice(0, 4)" :key="book.id">
          <div class="rbc-cover" :style="{ background: coverColors[book.id % 4] }">
            <span class="rbc-year">{{ book.year }}</span>
          </div>
          <p class="rbc-title">{{ book.title }}</p>
          <p class="rbc-author">{{ book.author }}</p>
          <span class="rbc-status" :class="'status--' + (book.status || 'available').toLowerCase()">
            {{ book.status || 'Available' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
