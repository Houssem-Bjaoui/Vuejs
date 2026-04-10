<script setup>
const props = defineProps({
  favorites: { type: Array, required: true },
  stats: { type: Object, required: true }
})
</script>

<template>
  <div class="section-crud">
    <div class="panel">
      <div class="panel-head">
        <h2 class="panel-title">All Favourited Books</h2>
        <span class="muted-cell">{{ props.favorites.length }} entries</span>
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
          <tr v-for="(fav, i) in props.favorites" :key="fav.id">
            <td class="rank-cell">
              <span class="rank-badge" :class="i < 3 ? 'rank-top' : ''">{{ i + 1 }}</span>
            </td>
            <td class="title-cell">{{ fav.title }}</td>
            <td class="muted-cell">{{ fav.author }}</td>
            <td><span class="genre-tag">{{ fav.genre }}</span></td>
            <td>
              <div class="fav-bar-wrap">
                <div class="fav-bar" :style="{ width: (fav.count / props.favorites[0].count * 100) + '%' }"></div>
                <span class="fav-count">{{ fav.count }}</span>
              </div>
            </td>
            <td class="muted-cell">{{ (fav.count / props.stats.favorites * 100).toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
