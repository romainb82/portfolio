vue
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/about">à Propos</router-link>
        <router-link to="/projects">Projets</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-links {
  display: flex;
  flex-direction: column;
}

.footer-links a {
  color: white;
  text-decoration: none;
  margin: 0.5rem 0;
}
</style>
