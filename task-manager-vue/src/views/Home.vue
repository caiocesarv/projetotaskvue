<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTasks } from '../composables/useTasks'

const router = useRouter()
const { tasks } = useTasks()

const stats = computed(() => {
  const total = tasks.value.length
  const completed = tasks.value.filter(t => t.completed).length
  const pending = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { total, completed, pending, completionRate }
})

const goToTasks = () => router.push('/tasks')
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Bem-vindo ao TaskMaster! 🚀</h1>
      <p class="hero-subtitle">Organize suas tarefas de forma eficiente e produtiva</p>
      <button @click="goToTasks" class="btn-primary hero-btn">
        Começar Agora
      </button>
    </section>

    <section class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon">📊</div>
        <h3>{{ stats.total }}</h3>
        <p>Total de Tarefas</p>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon">✅</div>
        <h3>{{ stats.completed }}</h3>
        <p>Concluídas</p>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon">⏳</div>
        <h3>{{ stats.pending }}</h3>
        <p>Pendentes</p>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon">📈</div>
        <h3>{{ stats.completionRate }}%</h3>
        <p>Taxa de Conclusão</p>
      </div>
    </section>

    <section class="features">
      <h2>Recursos Principais</h2>
      <div class="features-grid">
        <div class="feature card">
          <h3>Categorização</h3>
          <p>Organize tarefas por prioridade e categoria</p>
        </div>
        <div class="feature card">
          <h3>Persistência</h3>
          <p>Seus dados são salvos automaticamente</p>
        </div>
        <div class="feature card">
          <h3>Responsivo</h3>
          <p>Funciona perfeitamente em qualquer dispositivo</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.hero-btn {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.stat-card {
  text-align: center;
  padding: 2rem;
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-card h3 {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.features {
  margin-top: 4rem;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature {
  text-align: center;
  padding: 2rem;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>