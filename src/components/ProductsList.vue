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
.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 32px;
}
</style>
