<template>
  <section class="catalog" v-if="this.$route.name === 'catalog'">
    <div class="catalog__container container">
      <categories-list :categories="getCategories" />
    </div>
  </section>
  <router-view />
</template>

<script>
import CategoriesList from '@/components/CategoriesList';
import { mapGetters } from 'vuex';

export default {
  name: 'CatalogView',
  components: { CategoriesList },

  computed: {
    ...mapGetters(['getCategories']),
  },
};
</script>

<style lang="scss" scoped>
.catalog {
  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
  }
}
</style>
