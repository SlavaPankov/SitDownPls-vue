import { createRouter, createWebHistory } from 'vue-router';
import CatalogView from '@/views/CatalogView';
import CategoryView from '@/views/CategoryView';
import ProductView from '@/views/ProductView';
import HomeView from '@/views/HomeView';
import NotFoundView from '@/views/NotFoundView';
import CartView from '@/views/CartView';
import OrderView from '@/views/OrderView';
import CreatedOrder from '@/views/CreatedOrder';

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
    path: '/catalog/:category',
    name: 'category',
    component: CategoryView,
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
    path: '/:category/:slug',
    name: 'product',
    component: ProductView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    name: 'createOrder',
    path: '/order',
    component: OrderView,
  },
  {
    name: 'createdOrder',
    path: '/order/:id',
    component: CreatedOrder,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
