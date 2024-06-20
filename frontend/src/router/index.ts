import { createRouter, createWebHistory } from 'vue-router'
import SearchUser from '@/views/SearchUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'searchUser',
      component: SearchUser
    },
  ]
})

export default router
