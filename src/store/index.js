import { createStore } from 'vuex';
import { BASE_URL } from '@/api/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export default createStore({
  state: {
    categories: [],
    products: [],
    posts: [],
    colors: [],
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

    getDiscountProducts(state) {
      return state.products.filter((product) => parseInt(product.old_price, 10) > 0);
    },

    getHighRatingProducts(state) {
      return state.products
        .filter((product) => product.rating > 4
        && parseInt(product.old_price, 10) === 0)
        .sort((a, b) => (a.rating > b.rating ? -1 : 1))
        .slice(0, 20);
    },

    getBasket(state) {
      return state.basket;
    },

    getTopCategories(state) {
      return state.categories.slice(0, 5);
    },

    getPosts(state) {
      return state.posts
        .filter((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? -1 : 1));
    },

    getColors(state) {
      return state.colors;
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

    updatePosts(state, value) {
      state.posts = value;
    },

    updateColors(state, value) {
      state.colors = value;
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

    loadPosts(ctx) {
      return axios
        .get(`${BASE_URL}/api/posts`)
        .then((response) => ctx.commit('updatePosts', response.data.payload));
    },

    loadColors(ctx) {
      return axios
        .get(`${BASE_URL}/api/colors`)
        .then((response) => ctx.commit('updateColors', response.data.payload));
    },
  },
  modules: {
  },
});
