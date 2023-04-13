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
    paymentTypes: [],
    deliveryTypes: [],
    basket: {},
    userAccessToken: '',
    dataIsLoaded: false,
    dataIsLoading: true,
    orderInfo: null,
  },
  getters: {
    getUserAccessToken(state) {
      return state.userAccessToken;
    },

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

    getBasketProducts(state) {
      return Object.keys(state.basket).length !== 0 ? state.basket.products : [];
    },

    getCountProductsBasket(state) {
      return Object.keys(state.basket).length !== 0 ? state.basket.products.length : 0;
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

    getStateIsLoading(state) {
      return state.dataIsLoading;
    },

    getStateIsLoaded(state) {
      return state.dataIsLoaded;
    },

    cartTotalPrice(state) {
      // eslint-disable-next-line max-len
      return state.basket.products.reduce((acc, item) => (item.price * item.pivot.quantity) + acc, 0);
    },

    getDeliveryTypes(state) {
      return state.deliveryTypes;
    },

    getPaymentTypes(state) {
      return state.paymentTypes;
    },

    getOrderInfo(state) {
      return state.orderInfo;
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

    updateIsLoading(state, value) {
      state.dataIsLoading = value;
    },

    updateIsLoaded(state, value) {
      state.dataIsLoaded = value;
    },

    updateCartProductCount(state, {
      productId,
      quantity,
    }) {
      const item = state.basket.products.find((p) => p.id === productId);

      if (item) {
        item.pivot.quantity = quantity;
      }
    },

    updateDeliveryTypes(state, value) {
      state.deliveryTypes = value;
    },

    updatePaymentTypes(state, value) {
      state.paymentTypes = value;
    },

    updateOrderInfo(state, value) {
      state.orderInfo = value;
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
        .then((response) => {
          ctx.commit('updateProducts', response.data.payload);
          ctx.commit('updateIsLoaded', true);
          ctx.commit('updateIsLoading', false);
        });
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

    loadDeliveryTypes(ctx) {
      return axios.get(`${BASE_URL}/api/delivery-types`)
        .then((response) => ctx.commit('updateDeliveryTypes', response.data.payload));
    },

    loadPaymentTypes(ctx) {
      return axios.get(`${BASE_URL}/api/payment-types`)
        .then((response) => ctx.commit('updatePaymentTypes', response.data.payload));
    },

    addProductToCart(ctx, { productId, quantity, colorId }) {
      return axios.post(`${BASE_URL}/api/baskets`, {
        productId,
        quantity,
        colorId,
      }, {
        params: {
          userAccessToken: ctx.state.userAccessToken,
        },
      }).then((response) => ctx.commit('updateBasket', response.data.payload));
    },

    updateCartProductCount(ctx, {
      productId,
      quantity,
      colorId,
    }) {
      ctx.commit('updateCartProductCount', {
        productId,
        quantity,
      });

      if (quantity < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios.post(`${BASE_URL}/api/baskets`, {
        productId,
        quantity,
        colorId,
      }, {
        params: {
          userAccessToken: ctx.state.userAccessToken,
        },
      }).then((response) => ctx.commit('updateBasket', response.data.payload));
    },

    loadOrder(ctx, orderId) {
      return axios
        .get(`${BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessToken: ctx.state.userAccessToken,
          },
        })
        .then((response) => {
          ctx.commit('updateOrderInfo', response.data.payload);
        });
    },
  },
  modules: {
  },
});
