<script setup>
import Header from './header.vue'
import Footer from './footer.vue'
</script>

<template>
  <div>
    <Header />

    <div class="container my-5">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="mb-4">Browse Books</h2>
          <div class="input-group input-group-lg mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="Search by title, author, or category..."
            >
            <button class="btn btn-primary" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">The Great Gatsby</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> F. Scott Fitzgerald</p>
              <p class="card-text"><span class="badge bg-info">Classic</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">To Kill a Mockingbird</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Harper Lee</p>
              <p class="card-text"><span class="badge bg-info">Classic</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">1984</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> George Orwell</p>
              <p class="card-text"><span class="badge bg-info">Dystopian</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">Pride and Prejudice</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Jane Austen</p>
              <p class="card-text"><span class="badge bg-info">Romance</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">The Catcher in the Rye</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> J.D. Salinger</p>
              <p class="card-text"><span class="badge bg-info">Coming of Age</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">The Hobbit</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> J.R.R. Tolkien</p>
              <p class="card-text"><span class="badge bg-info">Fantasy</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">Brave New World</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Aldous Huxley</p>
              <p class="card-text"><span class="badge bg-info">Dystopian</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">Jane Eyre</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Charlotte Brontë</p>
              <p class="card-text"><span class="badge bg-info">Romance</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">Moby-Dick</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Herman Melville</p>
              <p class="card-text"><span class="badge bg-info">Adventure</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">The Odyssey</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Homer</p>
              <p class="card-text"><span class="badge bg-info">Epic</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">Wuthering Heights</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Emily Brontë</p>
              <p class="card-text"><span class="badge bg-info">Gothic</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-img-top bg-secondary" style="height: 250px;"></div>
            <div class="card-body">
              <h5 class="card-title">Crime and Punishment</h5>
              <p class="card-text text-muted mb-1"><strong>Author:</strong> Fyodor Dostoevsky</p>
              <p class="card-text"><span class="badge bg-info">Psychological</span></p>
              <button class="btn btn-sm btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.btn-outline-primary:hover {
  transform: scale(1.02);
}
</style>
