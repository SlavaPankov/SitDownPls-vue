<template>
  <ul class="rating-list list-reset">
    <li v-for="product in products" :key="product.id">
      <item-card :product="product" />
    </li>
  </ul>
</template>

<script>
import './styles.scss';
import ItemCard from '@/components/ItemCard/ItemCard';

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
