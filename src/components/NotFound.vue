<template>
  <section class="not-found">
    <div class="not-found__card">
      <p class="not-found__code">404</p>
      <h1 class="not-found__title">Page not found</h1>
      <p class="not-found__text">
        The page you are looking for does not exist or you do not have access.
      </p>
      <router-link class="not-found__link" to="/">Go back home</router-link>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.not-found__card {
  max-width: 480px;
  text-align: center;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  background: #f5f7fb;
  box-shadow: 0 16px 30px rgba(14, 24, 52, 0.12);
}

.not-found__code {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  color: #1f2a44;
}

.not-found__title {
  margin: 0.5rem 0 0.75rem;
  font-size: 1.75rem;
  color: #1f2a44;
}

.not-found__text {
  margin: 0 0 1.5rem;
  color: #5b677a;
}

.not-found__link {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  background: #1f2a44;
  color: #ffffff;
}
</style>
