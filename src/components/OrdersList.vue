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
.orders-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 26px;
  margin-bottom: 26px;
}
</style>
