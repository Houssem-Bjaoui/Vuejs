import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/Login.vue'
import SignUpPage from '../components/Signup.vue'
import BooksPage from '../components/Books.vue'
import AdminPage from '../components/Admin.vue'
import FavorisPage from '../components/Favoris.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: FavorisPage
    },


    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: '/books',
      name: 'books',
      component: BooksPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    }
  ]
})

export default router
