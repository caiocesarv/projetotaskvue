import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Importar views
import Home from './views/Home.vue'
import TaskList from './views/TaskList.vue'
import TaskDetail from './views/TaskDetail.vue'
import Statistics from './views/Statistics.vue'

// Configurar rotas
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tasks', name: 'TaskList', component: TaskList },
  { path: '/tasks/:id', name: 'TaskDetail', component: TaskDetail, props: true },
  { path: '/statistics', name: 'Statistics', component: Statistics }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')