import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicsView from '../views/BasicsView.vue'
import ComponentsView from '../views/ComponentsView.vue'
import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/basics',
    name: 'basics',
    component: BasicsView
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
