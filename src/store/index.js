import { createStore } from 'vuex';
import { BASE_URL } from '@/api/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export default createStore({
  state: {
    categories: [],
    products: [],
    basket: {},
    userAccessToken: '',
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },

    getProducts(state) {
      return state.products;
    },

    getBasket(state) {
      return state.basket;
    },
  },
  mutations: {
    updateCategories(state, value) {
      state.categories = value;
    },

    updateProducts(state, value) {
      state.products = value;
    },

    updateBasket(state, value) {
      state.basket = value;
    },

    updateUserAccessToken(state, value) {
      state.userAccessToken = value;
    },
  },
  actions: {
    loadCategories(ctx) {
      return axios
        .get(`${BASE_URL}/api/categories`)
        .then((response) => ctx.commit('updateCategories', response.data.payload));
    },

    loadProducts(ctx) {
      return axios
        .get(`${BASE_URL}/api/products`)
        .then((response) => ctx.commit('updateProducts', response.data.payload));
    },

    loadBasket(ctx) {
      return axios
        .get(`${BASE_URL}/api/baskets`, {
          params: {
            userAccessToken: ctx.state.userAccessToken,
          },
        })
        .then((response) => {
          const userAccessToken = response.data.payload.user.remember_token;
          ctx.commit('updateBasket', response.data.payload);

          if (!localStorage.getItem('userAccessToken')) {
            ctx.commit('updateUserAccessToken', userAccessToken);
            localStorage.setItem('userAccessToken', userAccessToken);
          }
        });
    },
  },
  modules: {
  },
});
