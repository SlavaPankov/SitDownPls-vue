<template>
  <section class="search" v-if="searchResult.length !== 0">
    <div class="container search__container">
      <h1 class="heading-reset search__heading">
        Результаты поиска по запросу: {{ $route.query.q }}
      </h1>
      <products-list :products="paginatedResult" />
      <base-pagination :total-count="searchResult.length"
                       :count-per-page="countPerPage"
                       v-model:page="page"
                       v-if="searchResult.length > countPerPage"
      />
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
import BasePagination from '@/components/BasePagination';

export default {
  name: 'SearchView',
  components: {
    ProductsList,
    BaseSpinner,
    BaseEmptyResult,
    BasePagination,
  },

  data() {
    return {
      searchResult: [],
      nullResult: false,
      countPerPage: 8,
      page: 1,

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

  computed: {
    paginatedResult() {
      return this.searchResult.slice(
        this.countPerPage * (this.page - 1),
        this.countPerPage * this.page,
      );
    },
  },

  watch: {
    $route() {
      if (this.$route.name === 'search') {
        this.loadQueryResults();
      }
    },
  },

  created() {
    this.loadQueryResults();
  },

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.search {
  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
  }

  &__heading {
    @include h2;
    margin-bottom: 26px;
  }
}
</style>
