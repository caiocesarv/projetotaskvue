<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete', 'view'])

const priorityColor = computed(() => {
  const colors = {
    high: '#dc3545',
    medium: '#ffc107',
    low: '#28a745'
  }
  return colors[props.task.priority] || '#999'
})

const priorityLabel = computed(() => {
  const labels = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa'
  }
  return labels[props.task.priority] || props.task.priority
})
</script>

<template>
  <div class="task-item card" :class="{ completed: task.completed }">
    <div class="task-main">
      <input 
        type="checkbox" 
        :checked="task.completed"
        @change="emit('toggle')"
        class="task-checkbox"
      />
      
      <div class="task-content" @click="emit('view')">
        <h3 class="task-title">{{ task.title }}</h3>
        <p v-if="task.description" class="task-description">
          {{ task.description.substring(0, 100) }}{{ task.description.length > 100 ? '...' : '' }}
        </p>
        <div class="task-meta">
          <span 
            class="priority-badge" 
            :style="{ background: priorityColor }"
          >
            {{ priorityLabel }}
          </span>
          <span class="category-badge">{{ task.category }}</span>
          <span class="date">{{ new Date(task.createdAt).toLocaleDateString('pt-BR') }}</span>
        </div>
      </div>
    </div>

    <div class="task-actions">
      <button 
        @click="emit('view')" 
        class="btn-action"
        title="Ver detalhes"
      >
        👁️
      </button>
      <button 
        @click="emit('delete')" 
        class="btn-action btn-delete"
        title="Excluir"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.task-item:hover {
  transform: translateY(-2px);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-main {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.task-checkbox {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 0.25rem;
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.task-description {
  color: #666;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.category-badge {
  padding: 0.25rem 0.75rem;
  background: #e9ecef;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #495057;
}

.date {
  font-size: 0.875rem;
  color: #999;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  font-size: 1.25rem;
  transition: all 0.2s ease;
}

.btn-action:hover {
  background: #e9ecef;
  transform: scale(1.1);
}

.btn-delete:hover {
  background: #fee;
}

@media (max-width: 768px) {
  .task-item {
    flex-direction: column;
    align-items: stretch;
  }
  
  .task-actions {
    justify-content: flex-end;
  }
}
</style>