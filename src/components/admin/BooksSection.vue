<script setup>
const props = defineProps({
  books: { type: Array, required: true },
  filteredBooks: { type: Array, required: true },
  bookSearch: { type: String, required: true }
})

const emit = defineEmits(['update:book-search', 'open-modal'])

function onSearch(event) {
  emit('update:book-search', event.target.value)
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
          placeholder="Search books…"
          :value="props.bookSearch"
          @input="onSearch"
        />
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
            <th>Category</th>
            <th>Editor</th>
            <th>Year</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in props.filteredBooks" :key="book.id">
            <td class="muted-cell">{{ book.id }}</td>
            <td class="title-cell">{{ book.title }}</td>
            <td class="muted-cell">{{ book.authorLabel }}</td>
            <td><span class="genre-tag">{{ book.category }}</span></td>
            <td class="muted-cell">{{ book.editor }}</td>
            <td class="muted-cell">{{ book.year }}</td>
            <td class="mono-cell">{{ book.image ? 'Yes' : '—' }}</td>
            <td>
              <div class="action-btns">
                <button class="action-btn action-btn--edit" @click="openModal('edit-book', book)">Edit</button>
                <button class="action-btn action-btn--delete" @click="openModal('delete-book', book)">Delete</button>
              </div>
            </td>
          </tr>
          <tr v-if="props.filteredBooks.length === 0">
            <td colspan="8" class="empty-row">No books found</td>
          </tr>
        </tbody>
      </table>
      <div class="table-footer">
        <span class="muted-cell">Showing {{ props.filteredBooks.length }} of {{ props.books.length }} books</span>
      </div>
    </div>
  </div>
</template>
