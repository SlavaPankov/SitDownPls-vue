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
import LogInView from '@/views/LogInView';
import ContactsView from '@/views/ContactsView';
import SearchView from '@/views/SearchView';
import PostView from '@/views/PostView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      breadcrumb: 'Главная',
    },
    children: [
      {
        path: '/catalog',
        name: 'catalog',
        component: CatalogView,
        meta: {
          breadcrumb: 'Каталог',
        },
        children: [
          {
            path: '/catalog/:category',
            name: 'category',
            component: CategoryView,
            meta: {
              breadcrumb(route) {
                return `${route.params.category}`;
              },
            },
            children: [
              {
                path: '/catalog/:category/:slug',
                name: 'product',
                component: ProductView,
                meta: {
                  breadcrumb(route) {
                    return `${route.params.slug}`;
                  },
                },
              },
            ],
          },
        ],
      },
      {
        path: '/cart',
        name: 'cart',
        component: CartView,
        meta: {
          breadcrumb: 'Корзина',
        },
      },
      {
        name: 'createOrder',
        path: '/order',
        component: OrderView,
        meta: {
          breadcrumb: 'Оформление заказа',
        },
      },
      {
        name: 'createdOrder',
        path: '/order/:id',
        component: CreatedOrder,
        meta: {
          breadcrumb(route) {
            return `Заказ №${route.params.id}`;
          },
        },
      },
      {
        path: '/personal',
        name: 'personal',
        component: PersonalView,
        meta: {
          breadcrumb: 'Личный кабинет',
        },
      },
      {
        path: '/personal/login',
        name: 'auth',
        component: LogInView,
        meta: {
          breadcrumb: 'Войти',
        },
      },
      {
        path: '/personal/set-password',
        name: 'resetPassword',
        component: ResetPasswordView,
        meta: {
          breadcrumb: 'Установить пароль',
        },
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: ContactsView,
        meta: {
          breadcrumb: 'Контакты',
        },
      },
      {
        path: '/search',
        name: 'search',
        component: SearchView,
        meta: {
          breadcrumb: 'Результаты поиска',
        },
      },
      {
        path: '/blog/:id',
        name: 'post',
        component: PostView,
        meta: {
          breadcrumb: 'пост',
        },
      },
    ],
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
