<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = computed(() => !!localStorage.getItem('token'))
const showConfirm = ref(false)

function logout() {
  localStorage.removeItem('token')
  showConfirm.value = false
  router.push('/login')
}
</script>

<template>
  <header class="libra-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">✦ Libra</span>
        <p class="footer-sub">A curated digital library for curious minds.</p>
      </div>
      <div class="footer-links">
        <router-link to="/">Home</router-link>
        <router-link to="/books">Collection</router-link>
        <router-link to="/favoris" v-if="isAuthenticated">Favoris</router-link>
        <router-link to="/login" v-if="!isAuthenticated">SignIn</router-link>
        <router-link to="/signup" v-if="!isAuthenticated">Signup</router-link>
        <button v-if="isAuthenticated" class="logout-btn" @click="showConfirm = true" title="Disconnect">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- CONFIRM TOAST -->
  <transition name="toast-fade">
    <div v-if="showConfirm" class="confirm-toast">
      <p class="confirm-msg">Are you sure you want to disconnect?</p>
      <div class="confirm-actions">
        <button class="confirm-yes" @click="logout">Yes, disconnect</button>
        <button class="confirm-no" @click="showConfirm = false">Cancel</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400&display=swap');

.libra-footer { background: #1a3a2a; padding: 3rem 2rem 1.5rem; margin-top: auto; }
.footer-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: flex-start; justify-content: space-between; gap: 2rem; padding-bottom: 2rem; }
.brand-mark { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #f5f0e8; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem; }
.footer-sub { font-family: 'Jost', sans-serif; font-size: 0.78rem; font-weight: 300; color: rgba(245,240,232,0.5); letter-spacing: 0.05em; margin: 0; max-width: 240px; }
.footer-links { display: flex; gap: 2rem; align-items: center; }
.footer-links a { font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,240,232,0.55); text-decoration: none; transition: color 0.2s ease; }
.footer-links a:hover { color: #c9a84c; }
.logout-btn { background: none; border: none; cursor: pointer; color: rgba(245,240,232,0.55); display: flex; align-items: center; padding: 0; transition: color 0.2s ease; }
.logout-btn:hover { color: #c9a84c; }

/* CONFIRM TOAST */
.confirm-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1a3a2a;
  border-left: 3px solid #c9a84c;
  padding: 1.25rem 1.75rem;
  z-index: 999;
  min-width: 300px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
}
.confirm-msg {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #f5f0e8;
  margin-bottom: 1rem;
}
.confirm-actions { display: flex; gap: 0.75rem; }
.confirm-yes {
  font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  background: #c9a84c; color: #1a3a2a; border: none;
  padding: 0.5rem 1.25rem; cursor: pointer; transition: background 0.2s;
}
.confirm-yes:hover { background: #f5f0e8; }
.confirm-no {
  font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
  background: none; color: rgba(245,240,232,0.55);
  border: 1px solid rgba(245,240,232,0.2);
  padding: 0.5rem 1.25rem; cursor: pointer; transition: all 0.2s;
}
.confirm-no:hover { color: #f5f0e8; border-color: rgba(245,240,232,0.5); }

.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }

@media (max-width: 640px) {
  .footer-inner { flex-direction: column; }
  .footer-links { flex-wrap: wrap; gap: 1rem; }
}
</style>