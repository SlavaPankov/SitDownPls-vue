<template>
  <section class="order" v-if="getOrderInfo">
    <div class="container order__container">
      <h1 class="order__heading heading-reset">
        Заказ №{{ getOrderInfo.id }}
      </h1>
      <p class="order__content heading-reset">
        Уважаемый(-ая) {{ getOrderInfo.user.sur_name }} {{ getOrderInfo.user.name }}
        {{ getOrderInfo.user.middle_name }},
      </p>
      <p class="order__content order__content--last heading-reset">
        Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;
        деталями заказа.
        Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки. Для
        вас создан личный кабинет, в котором вы можете отлеживать статус заказа.
      </p>
      <h2 class="order__heading heading-reset">Ваш заказ:</h2>
      <cart-list :products="getOrderInfo.basket.products"/>
      <h2 class="order__heading heading-reset">
        Детали заказа:
      </h2>
      <ul class="detail-list list-reset">
        <li class="detail-list__item">
          <span class="order__bold">Получатель:</span>
          <span>{{ getOrderInfo.user.sur_name }}
          {{ getOrderInfo.user.name }}
          {{ getOrderInfo.user.middle_name }}
          </span>
        </li>
        <li class="detail-list__item">
          <span class="order__bold">Телефон:</span> <span>{{ getOrderInfo.user.phone }}</span>
        </li>
        <li class="detail-list__item">
          <span class="order__bold">Email:</span> <span>{{ getOrderInfo.user.email }}</span>
        </li>
        <li class="detail-list__item">
          <span class="order__bold">Доставка:</span> <span>{{ getOrderInfo.delivery.name }}</span>
        </li>
        <li class="detail-list__item">
          <span class="order__bold">Оплата:</span> <span>{{ getOrderInfo.payment.name }}</span>
        </li>
        <li class="detail-list__item">
          <span class="order__bold">Статус:</span> <span>{{ getOrderInfo.status.name }}</span>
        </li>
      </ul>
      <p class="heading-reset">
        <span class="order__bold">Сумма заказа:</span> {{ getOrderInfo.total_price }}
      </p>
      <router-link class="order__link" :to="{ name: 'home' }">На главную</router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartList from '@/components/CartList';

export default {
  name: 'CreatedOrder',
  components: {
    CartList,
  },

  computed: {
    ...mapGetters(['getOrderInfo']),
  },

  methods: {
    ...mapActions(['loadOrder']),
  },

  created() {
    this.loadOrder(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.order {
  &__container {
    padding-top: 32px;
    padding-bottom: 70px;
  }

  &__heading {
    margin-bottom: 26px;
    font-size: 32px;
    line-height: 32px;
    font-weight: 400;
    color: var(--black);
  }

  &__content {
    font-size: 16px;
    line-height: 130%;
    font-weight: 400;
    color: var(--black);

    &--last {
      margin-bottom: 26px;
    }
  }

  &__bold {
    font-weight: 600;
  }

  &__link {
    @include btn-primary;
    max-width: fit-content;
    display: block;
    margin: 26px auto 0;
  }
}

.detail-list {
  max-width: 50%;
  width: 100%;
  margin-bottom: 26px;

  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      top: 70%;
      left: 0;
      width: 100%;
      height: 2px;
      border: 1px dashed var(--black);
      z-index: -1;
    }

    & span {
      background-color: var(--white);
    }

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}
</style>
