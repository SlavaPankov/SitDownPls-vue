<template>
  <ul class="list-reset cart-list">
    <li class="cart-list__item" v-for="product in products" :key="product.id">
      <cart-item :product="product" />
    </li>
  </ul>
</template>

<script>
import CartItem from '@/components/CartItem';

export default {
  name: 'CartList',
  components: { CartItem },
  props: {
    products: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.cart-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  &__item {
    padding: 42px 30px;

    @include small-tablet {
      padding: 30px 15px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--primary);
    }
  }
}
</style>
