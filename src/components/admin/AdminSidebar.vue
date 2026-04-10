<script setup>
const props = defineProps({
  navItems: { type: Array, required: true },
  activeSection: { type: String, required: true }
})

const emit = defineEmits(['update:active-section'])

function setSection(key) {
  emit('update:active-section', key)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <span class="brand-star">✦</span>
      <span class="brand-text">Libra</span>
      <span class="brand-sub">Admin</span>
    </div>

    <nav class="sidebar-nav">
      <button
        v-for="item in props.navItems"
        :key="item.key"
        class="nav-item"
        :class="{ active: props.activeSection === item.key }"
        @click="setSection(item.key)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <a href="/" class="back-link">← Back to Site</a>
    </div>
  </aside>
</template>
