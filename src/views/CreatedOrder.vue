<template>
  <section class="order" v-if="orderLoaded">
    <div class="container order__container">
      <h1 class="order__heading heading-reset">
        Заказ №{{ getOrderInfo.id }}
      </h1>
      <div v-if="enterFromOrderPage">
        <p class="order__content heading-reset">
          Уважаемый(-ая) {{ getOrderInfo.user.sur_name }} {{ getOrderInfo.user.name }}
          {{ getOrderInfo.user.middle_name }},
        </p>
        <p class="order__content order__content--last heading-reset">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;
          деталями заказа.
          Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          Для
          вас создан личный кабинет, в котором вы можете отлеживать статус заказа.
        </p>
      </div>
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
      <div v-if="getOrderInfo.store !== null">
        <p>
          <span class="order__bold">
            Адрес выдачи заказа:
          </span>
          {{ getOrderInfo.store.address }}
        </p>
        <p>
          <span class="order__bold">
            Часы работы:
          </span>
          {{ getOrderInfo.store.opening_hours }}
        </p>
      </div>
      <div class="order__info" v-if="getOrderInfo.address !== null">
        <span class="order__bold">
          Адрес доставки:
        </span>
        <address class="order__address">
          {{ getOrderInfo.address.address }}
        </address>
      </div>
      <p class="heading-reset">
        <span class="order__bold">
          Сумма заказа:
        </span> {{ formattedPrice(getOrderInfo.total_price) }} руб.
      </p>
      <router-link class="order__link" :to="{ name: 'home' }">На главную</router-link>
    </div>
  </section>
  <base-spinner v-if="!orderLoaded"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartList from '@/components/CartList';
import BaseSpinner from '@/components/BaseSpinner';

export default {
  name: 'CreatedOrder',
  components: {
    CartList,
    BaseSpinner,
  },

  data() {
    return {
      orderLoaded: false,
      enterFromOrderPage: false,
    };
  },

  computed: {
    ...mapGetters(['getOrderInfo']),
  },

  methods: {
    ...mapActions(['loadOrder']),

    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(price)
        .split(',')[0];
    },
  },

  created() {
    this.loadOrder(this.$route.params.id)
      .then(() => {
        this.orderLoaded = true;
      });
  },

  beforeRouteEnter(to, from, next) {
    if (from.name === 'createOrder') {
      next((page) => {
        page.enterFromOrderPage = true;
      });
    } else {
      next((page) => {
        page.enterFromOrderPage = false;
      });
    }
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
    @include h2;
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

  &__info {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }

  &__address {
    font-style: normal;
  }
}

.detail-list {
  max-width: 50%;
  width: 100%;
  margin-bottom: 26px;

  @include small-tablet {
    max-width: 100%;
  }

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
      height: 1px;
      border-bottom: 1px dashed var(--black);
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
