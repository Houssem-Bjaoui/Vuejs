<script setup>
const props = defineProps({
  navItems:      { type: Array,  required: true },
  activeSection: { type: String, required: true },
  username:      { type: String, default: '' },
})

const emit = defineEmits(['logout'])
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <p class="topbar-eyebrow">✦ Libra Admin</p>
      <h1 class="topbar-title">
        {{ props.navItems.find(n => n.key === props.activeSection)?.label }}
      </h1>
    </div>

    <div class="topbar-right">
      <div class="admin-avatar">
        {{ props.username ? props.username.charAt(0).toUpperCase() : 'A' }}
      </div>

      <div class="admin-info">
        <span class="admin-name">{{ props.username || 'Admin' }}</span>
        <span class="admin-role">Administrator</span>
      </div>

      <!-- Bouton déconnexion -->
      <button class="logout-btn" title="Sign out" @click="emit('logout')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid rgba(26,58,42,0.18);
  color: rgba(26,58,42,0.5);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  margin-left: 0.25rem;
  flex-shrink: 0;
}
.logout-btn:hover {
  background: #c0392b;
  border-color: #c0392b;
  color: #fff;
}
</style>