<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleSignup = async () => {
  error.value = ''
  success.value = false

  if (!email.value || !username.value || !password.value) {
    error.value = 'All fields are required'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, username: username.value, password: password.value })
    })
    const data = await res.json()
    if (!res.ok) {
      error.value = data.message || 'Signup failed'
    } else {
      success.value = true
      email.value = ''; username.value = ''; password.value = ''; confirmPassword.value = ''
    }
  } catch (err) {
    error.value = 'Server not reachable'
  } finally {
    loading.value = false
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
        <p>"Not all those who wander are lost — but all who read are found."</p>
        <cite>— After J.R.R. Tolkien</cite>
      </div>
      <div class="panel-steps">
        <p class="steps-label">Getting started is simple</p>
        <div class="step" v-for="(s, i) in ['Create your account', 'Explore the collection', 'Build your reading list']" :key="i">
          <span class="step-num">0{{ i + 1 }}</span>
          <span class="step-text">{{ s }}</span>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="auth-panel auth-panel--right">
      <div class="auth-form-wrap">
        <div class="form-header">
          <p class="form-eyebrow">✦ Begin your journey</p>
          <h1 class="form-title">Create Account</h1>
          <div class="form-rule"></div>
          <p class="form-sub">Join Libra and discover a world of books.</p>
        </div>

        <transition name="success-fade">
          <div v-if="success" class="success-banner">
            <span class="success-icon">✦</span>
            <div>
              <strong>Account created!</strong>
              <p>Welcome to Libra. <router-link to="/login">Sign in now →</router-link></p>
            </div>
          </div>
        </transition>

        <div v-if="!success" class="auth-form">
          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Email Address</label>
              <input class="field-input" type="email" placeholder="your@email.com" v-model="email" />
            </div>
            <div class="field-group">
              <label class="field-label">Username</label>
              <input class="field-input" type="text" placeholder="yourname" v-model="username" />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <input class="field-input" type="password" placeholder="Min. 6 characters" v-model="password" />
          </div>

          <div class="field-group">
            <label class="field-label">Confirm Password</label>
            <input class="field-input" type="password" placeholder="Repeat your password" v-model="confirmPassword" @keyup.enter="handleSignup" />
          </div>

          <transition name="err-fade">
            <div v-if="error" class="field-error">
              <span>⚠</span> {{ error }}
            </div>
          </transition>

          <button class="submit-btn" @click="handleSignup" :disabled="loading">
            <span v-if="!loading">Create Account</span>
            <span v-else class="loading-dots">Creating<span>.</span><span>.</span><span>.</span></span>
          </button>
        </div>

        <p class="form-footer-link">
          Already have an account?
          <router-link to="/login">Sign in →</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.auth-page {
  min-height: 100vh;
  display: flex;
  font-family: 'Jost', sans-serif;
}

.auth-panel--left {
  background: #1a3a2a;
  width: 42%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem;
  overflow: hidden;
  position: relative;
}

.panel-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.9rem;
  font-weight: 600;
  color: #f5f0e8;
  text-decoration: none;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.panel-ornament { color: #c9a84c; font-size: 0.8rem; }

.panel-quote {
  max-width: 300px;
}

.panel-quote p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(245,240,232,0.75);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.panel-quote cite {
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a84c;
}

.panel-steps { padding-bottom: 0.5rem; }

.steps-label {
  font-family: 'Jost', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201,168,76,0.7);
  margin-bottom: 1.25rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.step-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 400;
  color: #c9a84c;
  min-width: 24px;
}

.step-text {
  font-family: 'Jost', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(245,240,232,0.65);
  letter-spacing: 0.04em;
}

/* RIGHT */
.auth-panel--right {
  flex: 1;
  background: #f5f0e8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
}

.auth-form-wrap { width: 100%; max-width: 420px; }

.form-header { margin-bottom: 2rem; }

.form-eyebrow {
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 0.75rem;
}

.form-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 400;
  color: #1a3a2a;
  line-height: 1;
  margin-bottom: 1rem;
}

.form-rule {
  width: 32px;
  height: 1px;
  background: #c9a84c;
  margin-bottom: 1rem;
}

.form-sub {
  font-size: 0.82rem;
  font-weight: 300;
  color: rgba(26,58,42,0.55);
}

/* FORM */
.auth-form { display: flex; flex-direction: column; gap: 1.1rem; margin-bottom: 1.5rem; }

.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.field-group { display: flex; flex-direction: column; gap: 0.4rem; }

.field-label {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(26,58,42,0.55);
}

.field-input {
  background: #fff;
  border: 1px solid rgba(26,58,42,0.2);
  padding: 0.8rem 1rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.88rem;
  color: #1a3a2a;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.field-input::placeholder { color: rgba(26,58,42,0.3); }
.field-input:focus {
  border-color: #c9a84c;
  box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
}

.field-error {
  background: #fff3f3;
  border-left: 3px solid #c0392b;
  padding: 0.65rem 1rem;
  font-size: 0.78rem;
  color: #c0392b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn {
  background: #1a3a2a;
  color: #f5f0e8;
  border: none;
  padding: 1rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease;
  margin-top: 0.25rem;
}

.submit-btn:hover:not(:disabled) { background: #c9a84c; color: #1a3a2a; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.loading-dots span {
  animation: blink 1.2s infinite;
  animation-fill-mode: both;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

.success-banner {
  background: #f0f7f2;
  border-left: 3px solid #1a3a2a;
  padding: 1.25rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.success-icon { color: #c9a84c; font-size: 0.9rem; margin-top: 2px; }

.success-banner strong {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a3a2a;
  display: block;
  margin-bottom: 0.25rem;
}

.success-banner p {
  font-size: 0.8rem;
  color: rgba(26,58,42,0.6);
}

.success-banner a {
  color: #c9a84c;
  text-decoration: none;
  font-weight: 500;
}

.form-footer-link {
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(26,58,42,0.5);
  text-align: center;
}

.form-footer-link a {
  color: #1a3a2a;
  font-weight: 500;
  text-decoration: none;
}

.form-footer-link a:hover { color: #c9a84c; }

.err-fade-enter-active, .err-fade-leave-active { transition: all 0.3s ease; }
.err-fade-enter-from, .err-fade-leave-to { opacity: 0; transform: translateY(-6px); }
.success-fade-enter-active, .success-fade-leave-active { transition: all 0.4s ease; }
.success-fade-enter-from { opacity: 0; transform: translateY(-10px); }

@media (max-width: 768px) {
  .auth-page { flex-direction: column; }
  .auth-panel--left { width: 100%; min-height: 200px; padding: 2rem; }
  .panel-steps { display: none; }
  .panel-quote { display: none; }
  .field-row { grid-template-columns: 1fr; }
}
</style>