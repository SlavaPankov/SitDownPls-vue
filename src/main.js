import './assets/scss/main.scss';
import { createApp } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import breadcrumbs from 'vue-3-breadcrumbs';
import App from './App';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .use(breadcrumbs)
  .mount('#app');

// TODO: add chose store
// TODO: add address to order
// TODO: add reviews to product
// TODO: add user rating to product
// TODO: add style to 404 page
