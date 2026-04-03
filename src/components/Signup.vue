<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
</script>

<template>
  <div class="login-container">
    <Header />

    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-5 col-lg-4">
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <h2 class="text-center mb-4 fw-bold">Login</h2>
              <p class="text-center text-muted mb-4">Welcome back! Please login to your account.</p>

              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    id="email"
                    placeholder="Enter your email"
                  >
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    id="password"
                    placeholder="Enter your password"
                  >
                </div>

                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="remember">
                  <label class="form-check-label" for="remember">Remember me</label>
                </div>

                <button type="button" class="btn btn-primary btn-lg w-100 mb-3">
                  Login
                </button>

                <div class="text-center">
                  <p class="text-muted">
                    Don't have an account?
                    <router-link to="/signup" class="text-decoration-none">Sign Up</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
  border-radius: 15px;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}
</style>
