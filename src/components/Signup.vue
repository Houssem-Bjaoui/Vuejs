<script setup>
import { ref } from 'vue'
import Header from './header.vue'
import Footer from './footer.vue'

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

  // Validation
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.message || 'Signup failed'
    } else {
      success.value = true

      // reset form
      email.value = ''
      username.value = ''
      password.value = ''
      confirmPassword.value = ''
    }

  } catch (err) {
    error.value = 'Server not reachable'
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="signup-container">
    <Header />

    <div class="main-content">
      <div class="signup-box">
        <h2>Create Account</h2>
        <p class="subtitle">Join us today! Please fill in your details.</p>

        <form @submit.prevent="handleSignup">

          <!-- EMAIL -->
          <div class="form-group">
            <label>Email Address</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>

          <!-- USERNAME -->
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" class="form-control" required />
          </div>

          <!-- PASSWORD -->
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>

          <!-- CONFIRM PASSWORD -->
          <div class="form-group">
            <label>Confirm Password</label>
            <input v-model="confirmPassword" type="password" class="form-control" required />
          </div>

          <!-- BUTTON -->
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Sign Up' }}
          </button>

          <!-- LOGIN LINK -->
          <div class="text-center mt-4">
            <p class="text-muted">
              Already have an account?
              <router-link to="/login" class="text-decoration-none text-primary">
                Sign In
              </router-link>
            </p>
          </div>

        </form>

        <!-- ERROR -->
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>

        <!-- SUCCESS -->
        <div v-if="success" class="alert alert-success">
          Account created successfully!
        </div>

      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.signup-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.signup-box {
  background: white;
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

.signup-box h2 {
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary {
  background: #667eea;
  color: white;
  font-weight: bold;
}

.w-100 {
  width: 100%;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 20px;
}

.alert {
  margin-top: 15px;
  padding: 10px;
  border-radius: 6px;
}

.alert-error {
  background: #ffe5e5;
  color: #c00;
}

.alert-success {
  background: #e5ffe5;
  color: green;
}
</style>