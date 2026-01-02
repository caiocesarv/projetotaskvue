<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTasks } from '../composables/useTasks'
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'

const router = useRouter()
const { tasks, addTask, toggleTask, deleteTask } = useTasks()

const showForm = ref(false)
const filter = ref('all')
const searchQuery = ref('')

const filteredTasks = computed(() => {
  let result = tasks.value

  if (searchQuery.value) {
    result = result.filter(task => 
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filter.value === 'completed') {
    result = result.filter(task => task.completed)
  } else if (filter.value === 'pending') {
    result = result.filter(task => !task.completed)
  }

  return result
})

const handleAddTask = (taskData) => {
  addTask(taskData)
  showForm.value = false
}

const viewTaskDetail = (id) => {
  router.push(`/tasks/${id}`)
}
</script>

<template>
  <div class="task-list">
    <div class="header">
      <h1>Minhas Tarefas</h1>
      <button @click="showForm = !showForm" class="btn-primary">
        {{ showForm ? 'Cancelar' : '➕ Nova Tarefa' }}
      </button>
    </div>

    <TaskForm v-if="showForm" @submit="handleAddTask" @cancel="showForm = false" />

    <div class="filters">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 Buscar tarefas..."
        class="search-input"
      />
      
      <div class="filter-buttons">
        <button 
          @click="filter = 'all'" 
          :class="['filter-btn', { active: filter === 'all' }]"
        >
          Todas
        </button>
        <button 
          @click="filter = 'pending'" 
          :class="['filter-btn', { active: filter === 'pending' }]"
        >
          Pendentes
        </button>
        <button 
          @click="filter = 'completed'" 
          :class="['filter-btn', { active: filter === 'completed' }]"
        >
          Concluídas
        </button>
      </div>
    </div>

    <div v-if="filteredTasks.length === 0" class="empty-state">
      <p>{{ searchQuery ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa cadastrada' }}</p>
    </div>

    <div v-else class="tasks-grid">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask(task.id)"
        @delete="deleteTask(task.id)"
        @view="viewTaskDetail(task.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 250px;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #f0f0f0;
}

.filter-btn.active {
  background: #667eea;
  color: white;
}

.tasks-grid {
  display: grid;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: #999;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .filter-buttons {
    justify-content: stretch;
  }
  
  .filter-btn {
    flex: 1;
  }
}
</style>