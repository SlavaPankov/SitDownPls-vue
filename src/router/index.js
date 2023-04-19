import { createRouter, createWebHistory } from 'vue-router';
import CatalogView from '@/views/CatalogView';
import CategoryView from '@/views/CategoryView';
import ProductView from '@/views/ProductView';
import HomeView from '@/views/HomeView';
import NotFoundView from '@/views/NotFoundView';
import CartView from '@/views/CartView';
import OrderView from '@/views/OrderView';
import CreatedOrder from '@/views/CreatedOrder';
import PersonalView from '@/views/PersonalView';
import ResetPasswordView from '@/views/SetPasswordView';

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
  {
    path: '/personal',
    name: 'personal',
    component: PersonalView,
  },
  {
    path: '/personal/set-password',
    name: 'resetPassword',
    component: ResetPasswordView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
