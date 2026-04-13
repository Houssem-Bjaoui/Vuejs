<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router    = useRouter()
const authStore = useAuthStore()

const identifiant = ref('')
const password    = ref('')

const handleLogin = async () => {
  try {
    const data = await authStore.login({ identifiant: identifiant.value, password: password.value })
    setTimeout(() => {
      router.push(data.role === 'admin' ? '/admin' : '/')
    }, 1000)
  } catch {
    // l'erreur est déjà dans authStore.error
  }
}
</script>

<template>
  <div class="auth-page">
    <!-- LEFT PANEL -->
    <div class="auth-panel auth-panel--left">
      <router-link to="/" class="panel-brand">
        <span class="panel-ornament">✦</span>
        Libra
      </router-link>
      <div class="panel-quote">
        <img src="/src/utils/image.svg" alt="books" class="panel-image" />
        <p>"Until I feared I would lose it, I never loved to read. One does not love breathing."</p>
        <cite>— Harper Lee</cite>
      </div>
      <div class="panel-decoration" aria-hidden="true">
        <svg viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="40" height="65" rx="2" fill="rgba(201,168,76,0.2)"/>
          <rect x="58" y="25" width="40" height="65" rx="2" fill="rgba(245,240,232,0.07)"/>
          <rect x="106" y="15" width="40" height="65" rx="2" fill="rgba(201,168,76,0.12)"/>
          <rect x="10" y="100" width="136" height="3" rx="1" fill="rgba(201,168,76,0.15)"/>
          <rect x="10" y="120" width="100" height="3" rx="1" fill="rgba(201,168,76,0.1)"/>
          <rect x="10" y="140" width="120" height="3" rx="1" fill="rgba(201,168,76,0.08)"/>
          <rect x="10" y="160" width="80" height="3" rx="1" fill="rgba(201,168,76,0.06)"/>
        </svg>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="auth-panel auth-panel--right">
      <div class="auth-form-wrap">
        <div class="form-header">
          <p class="form-eyebrow">✦ Welcome back</p>
          <h1 class="form-title">Sign In</h1>
          <div class="form-rule"></div>
          <p class="form-sub">Access your curated reading world.</p>
        </div>

        <div class="auth-form">
          <div class="field-group">
            <label class="field-label">Email</label>
            <input class="field-input" type="email" placeholder="your@email.com"
                   v-model="identifiant" @keyup.enter="handleLogin" />
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <input class="field-input" type="password" placeholder="••••••••"
                   v-model="password" @keyup.enter="handleLogin" />
          </div>

          <transition name="err-fade">
            <div v-if="authStore.error" class="field-error">
              <span>⚠</span> {{ authStore.error }}
            </div>
          </transition>

          <button class="submit-btn" @click="handleLogin" :disabled="authStore.loading">
            <span v-if="!authStore.loading">Sign In</span>
            <span v-else class="loading-dots">Signing in<span>.</span><span>.</span><span>.</span></span>
          </button>
        </div>

        <p class="form-footer-link">
          New to Libra?
          <router-link to="/signup">Create an account →</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Identique à l'original — aucun changement visuel */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
.auth-page { min-height: 100vh; display: flex; font-family: 'Jost', sans-serif; }
.auth-panel--left { background: #1a3a2a; width: 45%; position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 2.5rem; overflow: hidden; }
.panel-brand { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 600; color: #f5f0e8; text-decoration: none; display: flex; align-items: baseline; gap: 0.5rem; letter-spacing: 0.03em; }
.panel-ornament { color: #c9a84c; font-size: 0.8rem; }
.panel-quote { max-width: 340px; margin-bottom: 2rem; }
.panel-image {display: block;margin-right: 50px;width: 350px;margin-left: 18%;}
.panel-quote p { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 300; font-style: italic; color: rgba(245,240,232,0.8); line-height: 1.7; margin-bottom: 1rem; }
.panel-quote cite { font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 300; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a84c; }
.panel-decoration { position: absolute; right: 2rem; top: 50%; transform: translateY(-50%); width: 140px; opacity: 0.5; }
.auth-panel--right { flex: 1; background: #f5f0e8; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; }
.auth-form-wrap { width: 100%; max-width: 380px; }
.form-header { margin-bottom: 2.5rem; }
.form-eyebrow { font-size: 0.68rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 0.75rem; }
.form-title { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 400; color: #1a3a2a; line-height: 1; margin-bottom: 1rem; }
.form-rule { width: 32px; height: 1px; background: #c9a84c; margin-bottom: 1rem; }
.form-sub { font-size: 0.82rem; font-weight: 300; color: rgba(26,58,42,0.55); letter-spacing: 0.04em; }
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem; }
.field-group { display: flex; flex-direction: column; gap: 0.4rem; }
.field-label { font-size: 0.7rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(26,58,42,0.6); }
.field-input { background: #fff; border: 1px solid rgba(26,58,42,0.2); padding: 0.85rem 1rem; font-family: 'Jost', sans-serif; font-size: 0.9rem; color: #1a3a2a; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.field-input::placeholder { color: rgba(26,58,42,0.3); }
.field-input:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
.field-error { background: #fff3f3; border-left: 3px solid #c0392b; padding: 0.65rem 1rem; font-size: 0.8rem; color: #c0392b; display: flex; align-items: center; gap: 0.5rem; }
.submit-btn { background: #1a3a2a; color: #f5f0e8; border: none; padding: 1rem; font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background 0.25s ease; margin-top: 0.25rem; }
.submit-btn:hover:not(:disabled) { background: #c9a84c; color: #1a3a2a; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.loading-dots span { animation: blink 1.2s infinite; animation-fill-mode: both; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
.form-footer-link { font-size: 0.78rem; font-weight: 300; color: rgba(26,58,42,0.5); text-align: center; letter-spacing: 0.03em; }
.form-footer-link a { color: #1a3a2a; font-weight: 500; text-decoration: none; transition: color 0.2s ease; }
.form-footer-link a:hover { color: #c9a84c; }
.err-fade-enter-active, .err-fade-leave-active { transition: all 0.3s ease; }
.err-fade-enter-from, .err-fade-leave-to { opacity: 0; transform: translateY(-6px); }
@media (max-width: 768px) { .auth-page { flex-direction: column; } .auth-panel--left { width: 100%; min-height: 220px; padding: 2rem; } .panel-quote { display: none; } .panel-decoration { display: none; } }
</style>