import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView';
import NotFoundView from '../views/NotFoundView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFoundView,
  },
  {
    path: '/personal',
    name: 'personal',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
