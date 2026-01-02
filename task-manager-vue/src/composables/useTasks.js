import { ref, watch } from 'vue'

const STORAGE_KEY = 'taskmaster-tasks'

// Estado global reativo
const tasks = ref([])

// Carregar tarefas do localStorage
const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      tasks.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
  }
}

// Salvar tarefas no localStorage
const saveTasks = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error)
  }
}

// Inicializar ao carregar
loadTasks()

// Watch para salvar automaticamente
watch(tasks, saveTasks, { deep: true })

export function useTasks() {
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    }
    tasks.value.unshift(newTask)
  }

  const updateTask = (id, updates) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  const clearCompleted = () => {
    tasks.value = tasks.value.filter(t => !t.completed)
  }

  return {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted
  }
}