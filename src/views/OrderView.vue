<template>
  <section v-if="paymentIsLoaded || deliveryIsLoaded" class="order">
    <div class="container order__container">
      <h1 class="heading-reset order__heading">
        Оформление заказа
      </h1>
      <div class="order__content">
        <div class="order__left">
          <form class="order-form" action="" @submit.prevent="submit">
            <label class="order-form__label" for="surName">
              <span>Фамилия:</span>
              <input class="input-reset order-form__input"
                     type="text"
                     name="surName"
                     id="surName"
                     placeholder="Фамилия"
                     v-model="formData.surName"
              >
            </label>
            <label class="order-form__label" for="name">
              <span>Имя:</span>
              <input class="input-reset order-form__input"
                     type="text"
                     name="name"
                     id="name"
                     placeholder="Имя"
                     v-model="formData.name"
              >
            </label>
            <label class="order-form__label" for="middleName">
              <span>Отчество:</span>
              <input class="input-reset order-form__input"
                     type="text"
                     name="middleName"
                     id="middleName"
                     placeholder="Отчество"
                     v-model="formData.middleName"
              >
            </label>
            <label class="order-form__label order-form__label--phone" for="phone">
              <span>Телефон:</span>
              <input class="input-reset order-form__input"
                     type="tel"
                     name="phone"
                     id="phone"
                     placeholder="Телефон"
                     v-model="formData.phone"
              >
            </label>
            <label class="order-form__label order-form__label--email" for="email">
              <span>Email:</span>
              <input class="input-reset order-form__input"
                     type="email"
                     name="email"
                     id="email"
                     placeholder="Email"
                     v-model="formData.email"
              >
            </label>
            <fieldset>
              Способ получения:
              <label class="custom-checkbox"
                     :for="delivery.name"
                     v-for="delivery in getDeliveryTypes"
                     :key="delivery.id"
              >
                <input class="custom-checkbox__field visually-hidden"
                       type="radio"
                       name="delivery"
                       :id="delivery.name"
                       :value="delivery.id"
                       v-model="formData.deliveryId"
                >
                <span class="custom-checkbox__content"></span>
                {{ delivery.name }}
              </label>
            </fieldset>
            <label class="order-form__label" for="address" v-if="formData.deliveryId === 1">
              <span>Адрес доставки:</span>
              <input class="input-reset order-form__input"
                     name="address"
                     id="address"
                     placeholder="Адрес доставки"
                     v-model="formData.address"
              >
            </label>
            <fieldset>
              Способ оплаты:
              <label class="custom-checkbox"
                     :for="payment.name"
                     v-for="payment in getPaymentTypes"
                     :key="payment.id"
              >
                <input class="custom-checkbox__field visually-hidden"
                       type="radio"
                       name="delivery"
                       :id="payment.name"
                       :value="payment.id"
                       v-model="formData.paymentId"
                >
                <span class="custom-checkbox__content"></span>
                {{ payment.name }}
              </label>
            </fieldset>
            <button type="submit">Оформить заказ</button>
          </form>
        </div>
        <div class="order__right">
          <div class="order__info">
            <ul class="list-reset order__list">
              <li class="order__item product"
                  v-for="product in getBasketProducts"
                  :key="product.id"
              >
                <span class="product__name">
                  {{ product.name }}
                </span>
                <span class="product__count">
                  {{ product.pivot.quantity }} шт.
                </span>
                <span class="product__price">
                  {{ formattedPrice(product.price * product.pivot.quantity) }} руб.
                </span>
              </li>
            </ul>
            <div class="total">
              Итого: <span class="total__bold">{{ formattedPrice(cartTotalPrice) }} руб.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <base-spinner v-if="!paymentIsLoaded || !deliveryIsLoaded"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';

export default {
  name: 'OrderView',
  components: { BaseSpinner },
  data() {
    return {
      formData: {},
      formError: {},
      deliveryIsLoaded: false,
      paymentIsLoaded: false,
    };
  },

  computed: {
    ...mapGetters([
      'getDeliveryTypes',
      'getPaymentTypes',
      'getBasketProducts',
      'cartTotalPrice',
    ]),
  },

  methods: {
    ...mapActions(['loadDeliveryTypes', 'loadPaymentTypes']),

    submit() {
      console.log(this.formData);
    },

    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price).split(',')[0];
    },
  },

  created() {
    // eslint-disable-next-line no-return-assign
    this.loadDeliveryTypes().then(() => this.deliveryIsLoaded = true);
    // eslint-disable-next-line no-return-assign
    this.loadPaymentTypes().then(() => this.paymentIsLoaded = true);
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
    font-weight: 400;
    font-size: 32px;
    line-height: 100%;
    color: var(--black);
  }

  &__content {
    display: flex;
    gap: 32px;
  }

  &__left {
    max-width: 66%;
    width: 100%;
  }

  &__right {
    max-width: 33%;
    width: 100%;
  }

  &__info {
    padding: 5px;
    border: 2px solid var(--primary_shade);
    border-radius: 10px;
  }

  &__item {
    padding: 10px 15px;

    &:not(:last-child) {
      border-bottom: 1px solid var(--primary);
    }
  }
}

.order-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;

  & fieldset {
    padding: 0;
    border: none;
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--black);
  }

  &__label {
    width: 100%;
    max-width: 100%;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--black);

    & span {
      padding-left: 8px;
      display: block;
      margin-bottom: 5px;
    }

    &--phone {
      max-width: calc(50% - 15px);
    }

    &--email {
      max-width: 50%;
    }
  }

  &__input {
    @include input-primary;
  }
}

.custom-checkbox {
  @include custom-checkbox;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: var(--black);
}

.product {
  display: flex;
  align-items: center;

  &__name {
    max-width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__count {
    margin-left: auto;
    margin-right: 10px;
  }
}

.total {
  padding: 10px 15px;

  &__bold {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    color: var(--black);
  }
}
</style>
