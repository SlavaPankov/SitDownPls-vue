<template>
  <main-header />

  <router-view />
</template>

<script>
import MainHeader from '@/components/MainHeader';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: { MainHeader },

  methods: {
    ...mapActions(['loadCategories', 'loadBasket', 'loadProducts', 'loadPosts']),
    ...mapMutations(['updateUserAccessToken']),
  },

  computed: {
    ...mapGetters(['getCategories', 'getProducts', 'getBasket', 'getPosts']),
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
  },
};
</script>
