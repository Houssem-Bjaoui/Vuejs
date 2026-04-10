<template>
  <footer class="libra-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="brand-mark">✦ Libra</span>
        <p class="footer-sub">A curated digital library for curious minds.</p>
      </div>
      <div class="footer-links">
        <router-link to="/">Home</router-link>
        <router-link to="/books">Collection</router-link>
        <router-link to="/login">Sign In</router-link>
        <router-link to="/signup">Join</router-link>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="divider-line"></span>
      <p class="footer-copy">© {{ new Date().getFullYear() }} Libra — All rights reserved</p>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400&display=swap');

.libra-footer {
  background: #1a3a2a;
  padding: 3rem 2rem 1.5rem;
  margin-top: auto;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2rem;
}

.brand-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f5f0e8;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.5rem;
}

.footer-sub {
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(245, 240, 232, 0.5);
  letter-spacing: 0.05em;
  margin: 0;
  max-width: 240px;
}

.footer-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.footer-links a {
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.55);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover { color: #c9a84c; }

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.divider-line {
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c 30%, #c9a84c 70%, transparent);
  opacity: 0.3;
  margin-bottom: 1.25rem;
}

.footer-copy {
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  color: rgba(245, 240, 232, 0.3);
  letter-spacing: 0.08em;
  margin: 0;
}

@media (max-width: 640px) {
  .footer-inner { flex-direction: column; }
  .footer-links { flex-wrap: wrap; gap: 1rem; }
}
</style>