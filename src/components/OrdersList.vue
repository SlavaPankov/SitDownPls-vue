<template>
  <ul class="list-reset orders-list">
    <li class="orders-list__item" v-for="order in orders" :key="order.id">
      <OrderItem :order="order" />
    </li>
  </ul>
</template>

<script>
import OrderItem from '@/components/OrderItem';

export default {
  name: 'OrdersList',
  components: {
    OrderItem,
  },

  props: {
    orders: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 26px;
  margin-bottom: 26px;

  @include small-tablet {
    grid-template-columns: repeat(auto-fill, 190px);
  }

  @include mobile {
    grid-template-columns: repeat(auto-fill, calc(50% - 13px));
    justify-items: center;
  }

  @include small-mobile {
    grid-template-columns: repeat(auto-fill, 100%);
  }

  &__item {
    @include mobile {
      width: 100%;
    }
  }
}
</style>
