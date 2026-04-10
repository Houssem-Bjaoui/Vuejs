<script setup>
const props = defineProps({
  navItems: { type: Array, required: true },
  activeSection: { type: String, required: true }
})
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
      <div class="admin-avatar">A</div>
      <div class="admin-info">
        <span class="admin-name">Administrator</span>
        <span class="admin-role">Super Admin</span>
      </div>
    </div>
  </header>
</template>
