<script setup>
import { computed } from 'vue'
import { useTasks } from '../composables/useTasks'

const { tasks } = useTasks()

const stats = computed(() => {
  const total = tasks.value.length
  const completed = tasks.value.filter(t => t.completed).length
  const pending = total - completed
  
  const byPriority = {
    high: tasks.value.filter(t => t.priority === 'high').length,
    medium: tasks.value.filter(t => t.priority === 'medium').length,
    low: tasks.value.filter(t => t.priority === 'low').length
  }
  
  const byCategory = tasks.value.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {})
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return {
    total,
    completed,
    pending,
    byPriority,
    byCategory,
    completionRate
  }
})
</script>

<template>
  <div class="statistics">
    <h1>📊 Estatísticas</h1>

    <div class="stats-overview">
      <div class="overview-card card">
        <h3>Visão Geral</h3>
        <div class="overview-grid">
          <div class="overview-item">
            <span class="number">{{ stats.total }}</span>
            <span class="label">Total</span>
          </div>
          <div class="overview-item">
            <span class="number" style="color: #28a745">{{ stats.completed }}</span>
            <span class="label">Concluídas</span>
          </div>
          <div class="overview-item">
            <span class="number" style="color: #ffc107">{{ stats.pending }}</span>
            <span class="label">Pendentes</span>
          </div>
        </div>
        
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: stats.completionRate + '%' }"
          ></div>
        </div>
        <p class="progress-text">{{ stats.completionRate }}% Concluído</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-section card">
        <h3>Por Prioridade</h3>
        <div class="stat-list">
          <div class="stat-item">
            <span class="stat-label">
              <span class="dot" style="background: #dc3545"></span>
              Alta
            </span>
            <span class="stat-value">{{ stats.byPriority.high }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">
              <span class="dot" style="background: #ffc107"></span>
              Média
            </span>
            <span class="stat-value">{{ stats.byPriority.medium }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">
              <span class="dot" style="background: #28a745"></span>
              Baixa
            </span>
            <span class="stat-value">{{ stats.byPriority.low }}</span>
          </div>
        </div>
      </div>

      <div class="stat-section card">
        <h3>Por Categoria</h3>
        <div class="stat-list">
          <div 
            v-for="(count, category) in stats.byCategory" 
            :key="category"
            class="stat-item"
          >
            <span class="stat-label">{{ category }}</span>
            <span class="stat-value">{{ count }}</span>
          </div>
          <div v-if="Object.keys(stats.byCategory).length === 0" class="empty">
            Nenhuma categoria
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics h1 {
  margin-bottom: 2rem;
}

.stats-overview {
  margin-bottom: 2rem;
}

.overview-card h3 {
  margin-bottom: 1.5rem;
  color: #667eea;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.overview-item {
  text-align: center;
}

.number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
}

.label {
  display: block;
  color: #666;
  margin-top: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background: #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
}

.progress-text {
  text-align: center;
  font-weight: bold;
  color: #667eea;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.stat-section h3 {
  margin-bottom: 1.5rem;
  color: #667eea;
}

.stat-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.stat-value {
  font-weight: bold;
  font-size: 1.25rem;
  color: #667eea;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>