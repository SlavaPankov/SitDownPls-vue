<template>
  <main-header />

  <router-view />

  <main-footer />
</template>

<script>
import MainHeader from '@/components/MainHeader';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MainFooter from '@/components/MainFooter';

export default {
  components: { MainFooter, MainHeader },

  methods: {
    ...mapActions(['loadCategories', 'loadBasket', 'loadProducts', 'loadPosts', 'loadColors']),
    ...mapMutations(['updateUserAccessToken']),
  },

  computed: {
    ...mapGetters(['getCategories', 'getProducts', 'getBasket', 'getPosts', 'getColors']),
  },

  created() {
    const userAccessToken = localStorage.getItem('userAccessToken');

    if (userAccessToken) {
      this.updateUserAccessToken(userAccessToken);
    }

    if (this.getCategories.length === 0) {
      this.loadCategories();
    }

    if (Object.keys(this.getBasket).length === 0) {
      this.loadBasket();
    }

    if (this.getProducts.length === 0) {
      this.loadProducts();
    }

    if (this.getPosts.length === 0) {
      this.loadPosts();
    }

    if (this.getColors.length === 0) {
      this.loadColors();
    }
  },
};
</script>
