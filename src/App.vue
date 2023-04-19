<template>
  <main-header />

  <router-view v-if="getStateIsLoaded"/>
  <base-spinner v-if="getStateIsLoading"/>

  <main-footer />
</template>

<script>
import MainHeader from '@/components/MainHeader';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MainFooter from '@/components/MainFooter';
import BaseSpinner from '@/components/BaseSpinner';

export default {
  components: { BaseSpinner, MainFooter, MainHeader },

  methods: {
    ...mapActions([
      'loadCategories',
      'loadBasket',
      'loadProducts',
      'loadPosts',
      'loadColors',
    ]),
    ...mapMutations(['updateUserAccessToken', 'updateRememberToken']),
  },

  computed: {
    ...mapGetters([
      'getCategories',
      'getProducts',
      'getBasket',
      'getPosts',
      'getColors',
      'getStateIsLoading',
      'getStateIsLoaded',
    ]),
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

    if (localStorage.getItem('rememberToken')) {
      this.updateRememberToken(localStorage.getItem('rememberToken'));
    }
  },
};
</script>
