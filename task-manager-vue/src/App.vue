<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">📋 TaskMaster</h1>
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Início</RouterLink>
          <RouterLink to="/tasks" class="nav-link">Tarefas</RouterLink>
          <RouterLink to="/statistics" class="nav-link">Estatísticas</RouterLink>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <RouterView />
    </main>
    
    <footer class="footer">
      <p>Desenvolvido com Vue 3 + Vite + Vue Router</p>
    </footer>
  </div>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255,255,255,0.2);
}

.nav-link.router-link-active {
  background: rgba(255,255,255,0.3);
  font-weight: bold;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  min-height: calc(100vh - 200px);
}

.footer {
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  margin-top: 4rem;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
}
</style>