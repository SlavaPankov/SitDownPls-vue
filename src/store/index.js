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
    user: {},
    userAccessToken: '',
    rememberToken: '',
    dataIsLoaded: false,
    dataIsLoading: true,
    dataLoadError: false,
    orderInfo: null,
    stores: [],
  },
  getters: {
    getUserAccessToken(state) {
      return state.userAccessToken;
    },

    getRememberToken(state) {
      return state.rememberToken;
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
        .filter((product) => product.reviews.reduce((a, b) => a + Number(b.rating), 0) > 4);
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

    getStateLoadError(state) {
      return state.dataLoadError;
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

    getStores(state) {
      return state.stores;
    },

    getStoreIssue(state) {
      return state.stores.filter((store) => store.store_types.some((type) => type.name.toLowerCase() === 'пункт выдачи'));
    },

    getUser(state) {
      return state.user;
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

    updateRememberToken(state, value) {
      state.rememberToken = value;
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

    updateDataLoadError(state, value) {
      state.dataLoadError = value;
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

    deleteProduct(state, productId) {
      const item = state.basket.products.find((p) => p.id === productId);

      if (item) {
        state.basket.products = state.basket.products.filter((p) => p.id !== item.id);
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

    updateStores(state, value) {
      state.stores = value;
    },

    updateUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    loadError(ctx) {
      ctx.commit('updateDataLoadError', true);
      ctx.commit('updateIsLoading', false);
    },

    loadCategories(ctx) {
      return axios
        .get(`${BASE_URL}/api/categories`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateCategories', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadProducts(ctx) {
      ctx.commit('updateIsLoaded', false);
      ctx.commit('updateIsLoading', true);
      ctx.commit('updateDataLoadError', false);

      return axios
        .get(`${BASE_URL}/api/products`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateProducts', response.data.payload);
            ctx.commit('updateIsLoaded', true);
            ctx.commit('updateIsLoading', false);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
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
          if (response.data.error === null) {
            const userAccessToken = response.data.payload.user.remember_token;
            ctx.commit('updateBasket', response.data.payload);

            if (!localStorage.getItem('userAccessToken')) {
              ctx.commit('updateUserAccessToken', userAccessToken);
              localStorage.setItem('userAccessToken', userAccessToken);
            }
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadPosts(ctx) {
      return axios
        .get(`${BASE_URL}/api/posts`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updatePosts', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadColors(ctx) {
      return axios
        .get(`${BASE_URL}/api/colors`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateColors', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadDeliveryTypes(ctx) {
      return axios
        .get(`${BASE_URL}/api/delivery-types`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateDeliveryTypes', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadPaymentTypes(ctx) {
      return axios
        .get(`${BASE_URL}/api/payment-types`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updatePaymentTypes', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    addProductToCart(ctx, {
      productId,
      quantity,
      colorId,
    }) {
      return axios.post(`${BASE_URL}/api/baskets`, {
        productId,
        quantity,
        colorId,
      }, {
        params: {
          userAccessToken: ctx.state.userAccessToken,
        },
      }).then((response) => {
        if (response.data.error === null) {
          ctx.commit('updateBasket', response.data.payload);
        } else {
          ctx.dispatch('loadError');
        }
      })
        .catch(() => {
          ctx.dispatch('loadError');
        });
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
      }).then((response) => {
        if (response.data.payload === null) {
          ctx.commit('updateBasket', response.data.payload);
        } else {
          ctx.dispatch('loadError');
        }
      })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    deleteCartProduct(ctx, productId) {
      ctx.commit('deleteProduct', productId);

      return axios.delete(`${BASE_URL}/api/baskets/product`, {
        data: {
          productId,
        },
        params: {
          userAccessToken: ctx.state.userAccessToken,
        },
      }).then((response) => {
        if (response.data.error === null) {
          ctx.commit('updateBasket', response.data.payload);
        } else {
          ctx.dispatch('loadError');
        }
      })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadOrder(ctx, orderId) {
      return axios
        .get(`${BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessToken: ctx.state.userAccessToken,
          },
        })
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateOrderInfo', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadStores(ctx) {
      return axios.get(`${BASE_URL}/api/stores`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateStores', response.data.payload);
          } else {
            ctx.dispatch('loadError');
          }
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },

    loadUserInfo(ctx) {
      return axios.get(`${BASE_URL}/api/users/${ctx.state.rememberToken}`)
        .then((response) => {
          if (response.data.error === null) {
            ctx.commit('updateUser', response.data.payload);
          } else {
            ctx.dispatch('loadError');
            return response;
          }
          return response;
        })
        .catch(() => {
          ctx.dispatch('loadError');
        });
    },
  },
  modules: {
  },
});
