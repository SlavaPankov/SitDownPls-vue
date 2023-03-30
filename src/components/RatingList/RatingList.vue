<template>
  <ul class="rating-list list-reset">
    <li v-for="product in getHighRatingProducts" :key="product.id">
      <item-card :product="product" />
    </li>
  </ul>
</template>

<script>
import './styles.scss';
import { mapGetters } from 'vuex';
import ItemCard from '@/components/ItemCard/ItemCard';

export default {
  name: 'RatingList',
  components: { ItemCard },

  computed: {
    ...mapGetters(['getHighRatingProducts']),
  },
};
</script>
