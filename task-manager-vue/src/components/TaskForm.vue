<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  title: '',
  description: '',
  priority: 'medium',
  category: 'Pessoal'
})

const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    alert('Por favor, preencha o título da tarefa')
    return
  }
  
  emit('submit', { ...formData.value })
  
  // Reset form
  formData.value = {
    title: '',
    description: '',
    priority: 'medium',
    category: 'Pessoal'
  }
}
</script>

<template>
  <div class="task-form card">
    <h2>Nova Tarefa</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título *</label>
        <input 
          id="title"
          v-model="formData.title" 
          type="text" 
          placeholder="Ex: Estudar Vue Router"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea 
          id="description"
          v-model="formData.description" 
          placeholder="Detalhes da tarefa..."
          rows="4"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="priority">Prioridade</label>
          <select id="priority" v-model="formData.priority">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div class="form-group">
          <label for="category">Categoria</label>
          <select id="category" v-model="formData.category">
            <option>Pessoal</option>
            <option>Trabalho</option>
            <option>Estudos</option>
            <option>Saúde</option>
            <option>Compras</option>
            <option>Outros</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">
          ➕ Adicionar Tarefa
        </button>
        <button type="button" @click="emit('cancel')" class="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.task-form {
  margin-bottom: 2rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-form h2 {
  margin-bottom: 1.5rem;
  color: #667eea;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions button {
  flex: 1;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>