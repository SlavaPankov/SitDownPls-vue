<template>
  <ul class="rating-list list-reset">
    <li v-for="product in products" :key="product.id">
      <item-card :product="product" />
    </li>
  </ul>
</template>

<script>
import ItemCard from '@/components/ItemCard';

export default {
  name: 'RatingList',
  components: { ItemCard },
  props: {
    products: {
      require: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.rating-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 32px;
}
</style>
