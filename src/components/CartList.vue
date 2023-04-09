<template>
  <ul class="list-reset basket-list">
    <li class="basket-list__item" v-for="product in getBasketProducts" :key="product.id">
      <cart-item :product="product" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem';

export default {
  name: 'CartList',
  components: { CartItem },
  computed: {
    ...mapGetters(['getBasketProducts']),
  },
};
</script>

<style lang="scss" scoped>
.basket-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  &__item {
    padding: 42px 30px;

    &:not(:last-child) {
      border-bottom: 1px solid var(--primary);
    }
  }
}
</style>
