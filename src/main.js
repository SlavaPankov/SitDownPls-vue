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

// TODO: implement load data error component (1 hour)
// TODO: implement checkUserRole function (30 minutes)
// TODO: create Blog view (2 hour)
// TODO: create Posts view (2 hour)
// TODO: refactor (1 day)
// TODO: implement admin (1 week)
// TODO: add style to 404 page (30 minutes)
