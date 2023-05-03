<template>
  <section class="search" v-if="searchResult.length !== 0">
    <div class="container search__container">
      <h1>Результаты поиска по запросу: {{ $route.query.q }}</h1>
      <products-list :products="searchResult" />
    </div>
  </section>
  <base-empty-result v-if="nullResult" />
  <base-spinner v-if="searchResult.length === 0 && !nullResult" />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import ProductsList from '@/components/ProductsList';
import BaseSpinner from '@/components/BaseSpinner';
import { BASE_URL } from '@/api/config';
import BaseEmptyResult from '@/components/BaseEmptyResult';

export default {
  name: 'SearchView',
  components: {
    ProductsList,
    BaseSpinner,
    BaseEmptyResult,
  },

  data() {
    return {
      searchResult: [],
      nullResult: false,
    };
  },

  methods: {
    loadQueryResults() {
      this.nullResult = false;
      this.searchResult = [];

      return axios.get(`${BASE_URL}/api/search`, {
        params: {
          search: this.$route.query.q,
          category: this.$route.query.category,
        },
      }).then((response) => {
        if (response.data.payload === null || response.data.payload.length === 0) {
          this.nullResult = true;
        } else {
          this.searchResult = response.data.payload;
        }
      });
    },
  },

  watch: {
    $route() {
      this.loadQueryResults();
    },
  },

  created() {
    this.loadQueryResults();
  },

};
</script>

<style scoped>

</style>
