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
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-0">Book Management</h2>
            <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#addBookModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="me-2">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Add New Book
            </button>
          </div>
        </div>
      </div>

      <div class="card shadow">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>The Great Gatsby</td>
                  <td>F. Scott Fitzgerald</td>
                  <td><span class="badge bg-info">Classic</span></td>
                  <td>978-0-7432-7356-5</td>
                  <td><span class="badge bg-success">Available</span></td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>To Kill a Mockingbird</td>
                  <td>Harper Lee</td>
                  <td><span class="badge bg-info">Classic</span></td>
                  <td>978-0-06-112008-4</td>
                  <td><span class="badge bg-warning">Borrowed</span></td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>1984</td>
                  <td>George Orwell</td>
                  <td><span class="badge bg-info">Dystopian</span></td>
                  <td>978-0-452-28423-4</td>
                  <td><span class="badge bg-success">Available</span></td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Pride and Prejudice</td>
                  <td>Jane Austen</td>
                  <td><span class="badge bg-info">Romance</span></td>
                  <td>978-0-14-143951-8</td>
                  <td><span class="badge bg-success">Available</span></td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>The Catcher in the Rye</td>
                  <td>J.D. Salinger</td>
                  <td><span class="badge bg-info">Coming of Age</span></td>
                  <td>978-0-316-76948-0</td>
                  <td><span class="badge bg-danger">Maintenance</span></td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>The Hobbit</td>
                  <td>J.R.R. Tolkien</td>
                  <td><span class="badge bg-info">Fantasy</span></td>
                  <td>978-0-547-92822-7</td>
                  <td><span class="badge bg-success">Available</span></td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-4">
        <p class="text-muted mb-0">Showing 6 of 6 books</p>
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="modal fade" id="addBookModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Add New Book</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="bookTitle" class="form-label">Book Title</label>
                  <input type="text" class="form-control" id="bookTitle" placeholder="Enter book title">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="bookAuthor" class="form-label">Author</label>
                  <input type="text" class="form-control" id="bookAuthor" placeholder="Enter author name">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="bookCategory" class="form-label">Category</label>
                  <select class="form-select" id="bookCategory">
                    <option selected>Choose category...</option>
                    <option value="classic">Classic</option>
                    <option value="dystopian">Dystopian</option>
                    <option value="romance">Romance</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="mystery">Mystery</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="bookISBN" class="form-label">ISBN</label>
                  <input type="text" class="form-control" id="bookISBN" placeholder="Enter ISBN">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="bookStatus" class="form-label">Status</label>
                  <select class="form-select" id="bookStatus">
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="bookPublisher" class="form-label">Publisher</label>
                  <input type="text" class="form-control" id="bookPublisher" placeholder="Enter publisher">
                </div>
              </div>
              <div class="mb-3">
                <label for="bookDescription" class="form-label">Description</label>
                <textarea class="form-control" id="bookDescription" rows="3" placeholder="Enter book description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary">Add Book</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editBookModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-warning">
            <h5 class="modal-title">Edit Book</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="editBookTitle" class="form-label">Book Title</label>
                  <input type="text" class="form-control" id="editBookTitle" value="The Great Gatsby">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="editBookAuthor" class="form-label">Author</label>
                  <input type="text" class="form-control" id="editBookAuthor" value="F. Scott Fitzgerald">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="editBookCategory" class="form-label">Category</label>
                  <select class="form-select" id="editBookCategory">
                    <option selected value="classic">Classic</option>
                    <option value="dystopian">Dystopian</option>
                    <option value="romance">Romance</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="mystery">Mystery</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="editBookISBN" class="form-label">ISBN</label>
                  <input type="text" class="form-control" id="editBookISBN" value="978-0-7432-7356-5">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="editBookStatus" class="form-label">Status</label>
                  <select class="form-select" id="editBookStatus">
                    <option selected value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="editBookPublisher" class="form-label">Publisher</label>
                  <input type="text" class="form-control" id="editBookPublisher" value="Scribner">
                </div>
              </div>
              <div class="mb-3">
                <label for="editBookDescription" class="form-label">Description</label>
                <textarea class="form-control" id="editBookDescription" rows="3">A masterpiece of American literature set in the Jazz Age.</textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-warning">Update Book</button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.btn-sm {
  transition: transform 0.2s ease;
}

.btn-sm:hover {
  transform: scale(1.05);
}

.card {
  border: none;
}
</style>
