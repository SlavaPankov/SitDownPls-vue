<template>
  <section class="cart">
    <div class="container cart__container">
      <h1 class="heading-reset">
        Корзина
      </h1>
      <cart-list />
      <div class="cart__total">
        <h3 class="heading-reset cart__total-heading">
          Сумма заказа:
        </h3>
        <span class="cart__total-price">{{ formattedPrice(cartTotalPrice) }} руб.</span>
        <router-link :to="{ name: 'createOrder' }"
                     class="btn-reset cart__order"
        >
          Оформить заказ
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartList from '@/components/CartList';

export default {
  name: 'CartView',
  components: { CartList },
  methods: {
    ...mapActions(['addProductToCart']),

    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price).split(',')[0];
    },
  },

  computed: {
    ...mapGetters(['cartTotalPrice']),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.cart {
  &__container {
    padding-top: 32px;
    padding-bottom: 70px;
  }

  &__heading {
    margin-bottom: 26px;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    color: var(--black);
  }

  &__total {
    display: flex;
    align-items: center;

    &-heading {
      font-weight: 600;
      font-size: 20px;
      line-height: 130%;
      color: var(--black);
    }

    &-price {
      margin-left: 15px;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
    }
  }

  &__order {
    @include btn-primary;
    margin-left: auto;
  }
}
</style>
