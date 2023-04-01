import { createRouter, createWebHistory } from 'vue-router';
import CatalogView from '@/views/CatalogView';
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
    path: '/catalog',
    name: 'catalog',
    component: CatalogView,
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
    path: '/:category/:subcategory/:slug',
    name: 'product',
    component: ProductView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
