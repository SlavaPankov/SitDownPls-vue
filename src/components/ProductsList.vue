<template>
  <ul class="products-list list-reset">
    <li class="products-list__item" v-for="product in products" :key="product.id">
      <item-card :product="product" />
    </li>
  </ul>
</template>

<script>
import ItemCard from '@/components/ItemCard';

export default {
  name: 'ProductsList',

  components: { ItemCard },

  props: {
    products: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 296px);
  justify-content: center;
  gap: 32px;
  margin-bottom: 32px;

  @include tablet {
    grid-template-columns: repeat(auto-fill, calc(33% - 32px));
  }

  @include small-tablet {
    grid-template-columns: repeat(auto-fill, calc(50% - 32px));
  }

  @include mobile {
    grid-template-columns: repeat(auto-fill, calc(50% - 16px));
    justify-content: space-between;
    gap: 16px;
  }
}
</style>
