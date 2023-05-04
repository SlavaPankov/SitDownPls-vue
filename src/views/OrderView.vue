<template>
  <section v-if="paymentIsLoaded || deliveryIsLoaded" class="order">
    <div class="container order__container">
      <h1 class="heading-reset order__heading">
        Оформление заказа
      </h1>
      <div class="order__content">
        <div class="order__left">
          <form class="order-form" action="" @submit.prevent="submit">
            <base-form-text-input title="Фамилия:"
                                  placeholder="Фамилия"
                                  type="text"
                                  name="surName"
                                  :require="true"
                                  :error="formError.surName"
                                  v-model:value="formData.surName"/>
            <base-form-text-input title="Имя:"
                                  placeholder="Имя"
                                  type="text"
                                  name="name"
                                  :require="true"
                                  :error="formError.name"
                                  v-model:value="formData.name"/>
            <base-form-text-input title="Отчество:"
                                  placeholder="Отчество"
                                  type="text"
                                  name="middleName"
                                  :error="formError.middleName"
                                  v-model:value="formData.middleName"/>
            <base-form-text-input class="order-form__label--phone" title="Телефон:"
                                  placeholder="+7 (999)-999-99-99"
                                  type="tel"
                                  name="phone"
                                  :require="true"
                                  :error="formError.phone"
                                  v-model:value="formData.phone"/>
            <base-form-text-input class="order-form__label--email" title="Email:"
                                  placeholder="example@email.com"
                                  type="email"
                                  name="email"
                                  :require="true"
                                  :error="formError.email"
                                  v-model:value="formData.email"/>
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
                       required
                >
                <span class="custom-checkbox__content"></span>
                {{ delivery.name }}
              </label>
            </fieldset>
            <base-map :stores="getStoreIssue"
                      v-model:chosen-store="chosenStore"
                      v-if="formData.deliveryId === 2"
            />
            <base-form-text-input v-if="formData.deliveryId === 1"
                                  title="Адрес доставки:"
                                  placeholder="Адрес"
                                  type="text"
                                  name="address"
                                  :require="formData.deliveryId === 1"
                                  :error="formError.address"
                                  v-model:value="formData.address"/>
            <fieldset>
              Способ оплаты:
              <label class="custom-checkbox"
                     :for="payment.name"
                     v-for="payment in getPaymentTypes"
                     :key="payment.id"
              >
                <input class="custom-checkbox__field visually-hidden"
                       type="radio"
                       name="payment"
                       :id="payment.name"
                       :value="payment.id"
                       v-model="formData.paymentId"
                       required
                >
                <span class="custom-checkbox__content"></span>
                {{ payment.name }}
              </label>
            </fieldset>
            <span v-if="formErrorGlobal.name">{{ formErrorGlobal.name }}</span>
            <button class="btn-reset order-form__button" type="submit">Оформить заказ</button>
          </form>
        </div>
        <div class="order__right">
          <div class="order__info">
            <ul class="list-reset order__list">
              <li class="order__item product"
                  v-for="product in getBasketProducts"
                  :key="product.id"
              >
                <router-link :to="{
                              name: 'product',
                              params: {
                                category: product.categories[0].slug,
                                slug: product.slug
                              }
                            }"
                             class="product__name">
                  {{ product.name }}
                </router-link>
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
  <base-modal :open="orderSending">
    <base-spinner />
  </base-modal>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';
import BaseFormTextInput from '@/components/BaseFormTextInput';
import { BASE_URL } from '@/api/config';
import BaseModal from '@/components/BaseModal';
import BaseMap from '@/components/BaseMap';

export default {
  name: 'OrderView',
  components: {
    BaseFormTextInput,
    BaseSpinner,
    BaseModal,
    BaseMap,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorGlobal: {},
      deliveryIsLoaded: false,
      paymentIsLoaded: false,
      orderSending: false,
      chosenStore: {},
    };
  },

  computed: {
    ...mapGetters([
      'getUserAccessToken',
      'getDeliveryTypes',
      'getPaymentTypes',
      'getBasketProducts',
      'cartTotalPrice',
      'getBasket',
      'getStores',
      'getStoreIssue',
    ]),
  },

  methods: {
    ...mapActions(['loadDeliveryTypes', 'loadPaymentTypes', 'loadBasket', 'loadStores']),
    ...mapMutations(['updateBasket', 'updateOrderInfo']),

    submit() {
      this.formError = {};

      this.formError.surName = this.checkLength(this.formData.surName.length)
        || this.isValidTextInput(this.formData.surName);
      this.formError.name = this.checkLength(this.formData.name.length)
        || this.isValidTextInput(this.formData.name);
      this.formError.phone = this.checkPhoneLength(this.formData.phone.length);

      if (this.formData.deliveryId === 2 && !this.formData.storeId) {
        this.formErrorGlobal.name = 'Выберите пункт выдачи';
        return;
      }

      Object.keys(this.formError).forEach((key) => {
        if (this.formError[key] === undefined) {
          delete this.formError[key];
        }
      });

      if (Object.keys(this.formError).length === 0) {
        this.orderSending = true;

        axios.post(`${BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessToken: this.getUserAccessToken,
          },
        }).then((response) => {
          this.orderSending = false;
          this.updateOrderInfo(response.data.payload);
          this.loadBasket();
          this.$router.push({ name: 'createdOrder', params: { id: response.data.payload.id } });
        });
      }
    },

    // eslint-disable-next-line consistent-return
    checkLength(value) {
      if (value < 3) {
        return 'Минимальная длина 3 символа';
      }

      if (value > 30) {
        return 'Максимальная длина 30 символов';
      }
    },

    // eslint-disable-next-line consistent-return
    checkPhoneLength(value) {
      if (value < 18) {
        return 'Некорректный формат';
      }
    },

    // eslint-disable-next-line consistent-return
    isValidTextInput(value) {
      if (!/^[а-я-]+$/i.test(value)) {
        return 'Неверный формат';
      }
    },

    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price).split(',')[0];
    },
  },

  watch: {
    chosenStore(newValue) {
      this.formData.storeId = newValue.id;
    },
  },

  created() {
    // eslint-disable-next-line no-return-assign
    this.loadDeliveryTypes().then(() => this.deliveryIsLoaded = true);
    // eslint-disable-next-line no-return-assign
    this.loadPaymentTypes().then(() => this.paymentIsLoaded = true);

    this.formData.surName = this.getBasket.user.sur_name;
    this.formData.name = this.getBasket.user.name;
    this.formData.middleName = this.getBasket.user.middle_name;
    this.formData.phone = this.getBasket.user.phone;
    this.formData.email = this.getBasket.user.email;

    if (this.getStores.length === 0) {
      this.loadStores();
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
    font-weight: 400;
    font-size: 32px;
    line-height: 100%;
    color: var(--black);
  }

  &__content {
    display: flex;
    gap: 32px;

    @include extra-tablet {
      flex-direction: column-reverse;
    }
  }

  &__left {
    max-width: 66%;
    width: 100%;

    @include extra-tablet {
      max-width: 100%;
    }
  }

  &__right {
    max-width: 33%;
    width: 100%;

    @include extra-tablet {
      max-width: 100%;
    }
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

  &__button {
    @include btn-primary;
  }

  &__label {
    &--phone {
      max-width: calc(50% - 15px);
    }

    &--email {
      max-width: 50%;
    }
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
