<script setup>
const props = defineProps({
  filteredAuthors: { type: Array, required: true },
  authorSearch: { type: String, required: true }
})

const emit = defineEmits(['update:author-search', 'open-modal'])

function onSearch(event) {
  emit('update:author-search', event.target.value)
}

function openModal(type, payload) {
  emit('open-modal', type, payload)
}
</script>

<template>
  <div class="section-crud">
    <div class="crud-header">
      <div class="crud-search-wrap">
        <input
          class="crud-search"
          type="text"
          placeholder="Search authors…"
          :value="props.authorSearch"
          @input="onSearch"
        />
      </div>
      <button class="btn-add" @click="openModal('add-author')">+ Add Author</button>
    </div>

    <div class="authors-grid">
      <div class="author-card" v-for="author in props.filteredAuthors" :key="author.id">
        <div class="author-avatar">{{ (author.displayName || author.name || '?').charAt(0) }}</div>
        <div class="author-body">
          <h3 class="author-name">{{ author.displayName || author.name }}</h3>
          <p class="author-meta">{{ author.nationality }} · {{ author.born }}–{{ author.died || 'present' }}</p>
          <p class="author-bio">{{ author.bio }}</p>
          <div class="author-footer">
            <span class="author-books">{{ author.books }} works</span>
          </div>
        </div>
      </div>
      <div v-if="props.filteredAuthors.length === 0" class="empty-authors">
        No authors found.
      </div>
    </div>
  </div>
</template>
