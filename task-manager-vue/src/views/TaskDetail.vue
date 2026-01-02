<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTasks } from '../composables/useTasks.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { tasks, toggleTask, deleteTask } = useTasks()

const task = computed(() => tasks.value.find(t => t.id === props.id))

const priorityColor = computed(() => {
  if (!task.value) return '#999'
  const colors = {
    high: '#dc3545',
    medium: '#ffc107',
    low: '#28a745'
  }
  return colors[task.value.priority] || '#999'
})

const handleDelete = () => {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    deleteTask(props.id)
    router.push('/tasks')
  }
}

const goBack = () => router.push('/tasks')
</script>

<template>
  <div v-if="!task" class="not-found">
    <h2>Tarefa não encontrada</h2>
    <button @click="goBack" class="btn-secondary">Voltar para Tarefas</button>
  </div>

  <div v-else class="task-detail">
    <button @click="goBack" class="btn-back">← Voltar</button>
    
    <div class="task-card card">
      <div class="task-header">
        <h1>{{ task.title }}</h1>
        <span 
          class="priority-badge" 
          :style="{ background: priorityColor }"
        >
          {{ task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa' }}
        </span>
      </div>

      <div class="task-meta">
        <span class="meta-item">
          📁 {{ task.category }}
        </span>
        <span class="meta-item">
          📅 {{ new Date(task.createdAt).toLocaleDateString('pt-BR') }}
        </span>
        <span class="meta-item">
          {{ task.completed ? '✅ Concluída' : '⏳ Pendente' }}
        </span>
      </div>

      <div class="task-description">
        <h3>Descrição</h3>
        <p>{{ task.description || 'Sem descrição' }}</p>
      </div>

      <div class="task-actions">
        <button 
          @click="toggleTask(task.id)" 
          :class="task.completed ? 'btn-warning' : 'btn-success'"
        >
          {{ task.completed ? '↩ Reabrir' : ' Concluir' }}
        </button>
        <button @click="handleDelete" class="btn-danger">
          🗑️ Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem;
}

.btn-back {
  background: transparent;
  color: #667eea;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border: 2px solid #667eea;
  font-weight: bold;
}

.task-card {
  max-width: 800px;
  margin: 0 auto;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.task-header h1 {
  font-size: 2rem;
  color: #333;
}

.priority-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
}

.task-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  color: #666;
  font-size: 0.95rem;
}

.task-description {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.task-description h3 {
  margin-bottom: 1rem;
  color: #667eea;
}

.task-description p {
  line-height: 1.8;
  color: #555;
}

.task-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.task-actions button {
  flex: 1;
  min-width: 150px;
}

@media (max-width: 768px) {
  .task-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .task-actions button {
    width: 100%;
  }
}
</style>