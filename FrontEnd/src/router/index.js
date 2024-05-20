import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import User from '@/components/User.vue'
import todo from '@/todo/todo.vue'
import { path } from 'd3'
const routes = [
  {
    path:'/',
    redirect: '/home',
    
  },
  {
    path: '/home',
    name: 'home',
    component: todo,
    props: route=>({
      todos: route.params.todos,
    }),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
  {

    path: '/login',

    name: 'Login',

    component: Login

  },

  {

    path: '/register',

    name: 'Register',

    component: Register

  },
  {

    path: '/user',

    name: 'User',

    component: User

  }

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router
