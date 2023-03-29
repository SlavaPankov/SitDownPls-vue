import { createRouter, createWebHistory } from 'vue-router';
import ProductView from '../views/ProductView';
import HomeView from '../views/HomeView/HomeView';
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
  {
    path: '/catalog/:category/:slug',
    name: 'product',
    component: ProductView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
