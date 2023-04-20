<template>
  <article class="cart-item">
    <router-link class="cart-item__link" :to="{
            name: 'product',
              params: {
                category: product.categories[0].slug,
                slug: product.slug
              }
            }"
    >
      <picture class="cart-item__picture">
        <img loading="lazy"
             src="../assets/img/1-rating.png"
             class="image"
             :alt="product.name">
      </picture>
    </router-link>
    <div class="cart-item__head">
      <h2 class="heading-reset cart-item__heading">
        <router-link :to="{
                name: 'product',
                params: {
                  category: product.categories[0].slug,
                  slug: product.slug
                }
              }"
        >
          {{ product.name }}
        </router-link>
      </h2>
      <div class="cart-item__color">
        <span class="cart-item__bold">Цвет:</span> {{ product.colors.name }}
      </div>
    </div>
    <div class="quantity">
      <button class="btn-reset quantity__button"
              @click="quantity === 1 ? quantity : quantity--"
              v-if="isCartPage"
      >
        -
      </button>
      <label for="quantity" class="quantity__label">
        <input class="input-reset quantity__input"
               type="number"
               name="quantity"
               id="quantity"
               v-model.number="quantity"
               :disabled="!isCartPage"
        >
      </label>
      <button class="btn-reset quantity__button"
              @click="quantity++"
              v-if="isCartPage"
      >
        +
      </button>
    </div>
    <div class="cart-item__price">
      {{ totalProductPrice }} руб.
    </div>
    <button class="btn-reset"
            @click.prevent="deleteCartProduct(product.id)"
            v-if="isCartPage"
    >
      <svg class="delete-icon">
          <use xlink:href="@/assets/img/sprite.svg#trash"></use>
      </svg>
    </button>
  </article>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',

  data() {
    return {
      isCartPage: this.$route.name === 'cart',
    };
  },

  props: {
    product: {
      required: true,
      type: Object,
    },
  },

  computed: {
    quantity: {
      get() {
        return this.product.pivot.quantity;
      },

      set(value) {
        this.updateCartProductCount({
          productId: this.product.id,
          quantity: value,
          colorId: this.product.colors.id,
        });
      },
    },

    totalProductPrice() {
      return this.formattedPrice(this.product.price * this.product.pivot.quantity);
    },
  },

  methods: {
    ...mapActions(['updateCartProductCount', 'deleteCartProduct']),

    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price).split(',')[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.cart-item {
  display: flex;
  align-items: center;

  &__heading {
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;

    & a {
      color: var(--black);
      transition: color .3s ease-in-out;

      &:hover {
        color: var(--primary);
      }
    }
  }

  &__link {
    max-width: 150px;
    margin-right: 21px;
  }

  &__price {
    margin-right: 30px;
    max-width: 150px;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: var(--grey_shade);
    text-align: right;
  }

  &__color {
    font-size: 12px;
    line-height: 12px;
    font-weight: 400;
    color: var(--black);
  }

  &__bold {
    font-weight: 600;
  }
}

.quantity {
  margin-left: auto;
  max-width: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: 21px;
  gap: 15px;

  &__label {
    max-width: calc(150px - 30px - 62px);
  }

  &__input {
    max-width: 100%;
    padding: 4px 15px;
    border: 1px solid var(--grey);
    border-radius: 2px;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: var(--black);
    text-align: center;
  }

  &__button {
    width: 31px;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include btn-secondary;
    border-radius: 5px;
    padding: 0;
    border-width: 1px;
    font-weight: 400;
  }
}

.delete-icon {
  width: 25px;
  height: 25px;
  fill: var(--primary);
  transition: fill .3s ease-in-out;

  &:hover {
    fill: var(--primary_light);
  }

  &:focus {
    outline: none;
    fill: var(--primary_shade);
  }

  &:active {
    fill: var(--primary_shade);
  }
}
</style>
