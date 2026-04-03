<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
</script>

<template>
  <div>
    <Header />

    <section class="hero-section bg-light py-5">
      <div class="container text-center py-5">
        <h1 class="display-3 fw-bold mb-3">Welcome to LibraryMS</h1>
        <p class="lead text-muted mb-4">Your Digital Library Management System</p>
        <router-link to="/books" class="btn btn-primary btn-lg px-5">Browse Books</router-link>
      </div>
    </section>

    <section class="featured-books py-5">
      <div class="container">
        <h2 class="text-center mb-5">Featured Books</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-img-top bg-secondary" style="height: 300px;"></div>
              <div class="card-body">
                <h5 class="card-title">The Great Gatsby</h5>
                <p class="card-text text-muted mb-2">F. Scott Fitzgerald</p>
                <span class="badge bg-info">Classic</span>
                <p class="card-text mt-3">A masterpiece of American literature set in the Jazz Age.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-img-top bg-secondary" style="height: 300px;"></div>
              <div class="card-body">
                <h5 class="card-title">To Kill a Mockingbird</h5>
                <p class="card-text text-muted mb-2">Harper Lee</p>
                <span class="badge bg-info">Classic</span>
                <p class="card-text mt-3">A gripping tale of racial injustice and childhood innocence.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-img-top bg-secondary" style="height: 300px;"></div>
              <div class="card-body">
                <h5 class="card-title">1984</h5>
                <p class="card-text text-muted mb-2">George Orwell</p>
                <span class="badge bg-info">Dystopian</span>
                <p class="card-text mt-3">A chilling dystopian novel about totalitarianism.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-img-top bg-secondary" style="height: 300px;"></div>
              <div class="card-body">
                <h5 class="card-title">Pride and Prejudice</h5>
                <p class="card-text text-muted mb-2">Jane Austen</p>
                <span class="badge bg-info">Romance</span>
                <p class="card-text mt-3">A timeless romantic novel of manners and social standing.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-img-top bg-secondary" style="height: 300px;"></div>
              <div class="card-body">
                <h5 class="card-title">The Catcher in the Rye</h5>
                <p class="card-text text-muted mb-2">J.D. Salinger</p>
                <span class="badge bg-info">Coming of Age</span>
                <p class="card-text mt-3">A powerful exploration of teenage alienation and angst.</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-img-top bg-secondary" style="height: 300px;"></div>
              <div class="card-body">
                <h5 class="card-title">The Hobbit</h5>
                <p class="card-text text-muted mb-2">J.R.R. Tolkien</p>
                <span class="badge bg-info">Fantasy</span>
                <p class="card-text mt-3">An epic fantasy adventure in Middle-earth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
