<script setup>
const props = defineProps({
  modal: { type: Object, required: true },
  bookForm: { type: Object, required: true },
  authorForm: { type: Object, required: true },
  categoryOptions: { type: Array, required: true },
  authorOptions: { type: Array, required: true }
})

const emit = defineEmits([
  'close',
  'save-book',
  'delete-book',
  'save-author'
])
</script>

<template>
  <transition name="modal-fade">
    <div v-if="props.modal.open" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-box">
        <template v-if="props.modal.type === 'add-book' || props.modal.type === 'edit-book'">
          <div class="modal-head">
            <h3 class="modal-title">
              {{ props.modal.type === 'add-book' ? 'Add New Book' : 'Edit Book' }}
            </h3>
            <button class="modal-close" @click="emit('close')">×</button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">Title</label>
                <input class="form-input" type="text" v-model="props.bookForm.title" placeholder="Book title" />
              </div>
              <div class="form-field">
                <label class="form-label">Author</label>
                <select class="form-input" v-model.number="props.bookForm.author">
                  <option :value="null" disabled>Select author</option>
                  <option v-for="a in props.authorOptions" :key="a.value" :value="a.value">
                    {{ a.label }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">Category</label>
                <select class="form-input" v-model="props.bookForm.category">
                  <option v-for="c in props.categoryOptions" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label">Editor</label>
                <input class="form-input" type="text" v-model="props.bookForm.editor" placeholder="Editor" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">Image URL</label>
                <input class="form-input" type="text" v-model="props.bookForm.image" placeholder="https://..." />
              </div>
              <div class="form-field">
                <label class="form-label">Year</label>
                <input class="form-input" type="number" v-model.number="props.bookForm.year" placeholder="e.g. 1838" />
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn-cancel" @click="emit('close')">Cancel</button>
            <button class="btn-save" @click="emit('save-book')">
              {{ props.modal.type === 'add-book' ? 'Add Book' : 'Save Changes' }}
            </button>
          </div>
        </template>

        <template v-if="props.modal.type === 'delete-book'">
          <div class="modal-head">
            <h3 class="modal-title">Delete Book</h3>
            <button class="modal-close" @click="emit('close')">×</button>
          </div>
          <div class="modal-body">
            <p class="delete-confirm-text">
              Are you sure you want to permanently delete<br>
              <strong>{{ props.modal.data?.title }}</strong>?<br>
              <span class="delete-warn">This action cannot be undone.</span>
            </p>
          </div>
          <div class="modal-foot">
            <button class="btn-cancel" @click="emit('close')">Cancel</button>
            <button class="btn-delete" @click="emit('delete-book')">Delete</button>
          </div>
        </template>

        <template v-if="props.modal.type === 'add-author'">
          <div class="modal-head">
            <h3 class="modal-title">
              Add New Author
            </h3>
            <button class="modal-close" @click="emit('close')">×</button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">Prenom</label>
                <input class="form-input" type="text" v-model="props.authorForm.prenom" placeholder="Victor" />
              </div>
              <div class="form-field">
                <label class="form-label">Nom</label>
                <input class="form-input" type="text" v-model="props.authorForm.nom" placeholder="Hugo" />
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn-cancel" @click="emit('close')">Cancel</button>
            <button class="btn-save" @click="emit('save-author')">
              Add Author
            </button>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>
