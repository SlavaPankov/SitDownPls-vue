<template>
  <section class="product" v-show="dataIsLoaded">
    <div class="container product__container">
      <swiper
        @click="openModalSlider = true"
        :loop="true"
        :spaceBetween="10"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[Thumbs]"
        class="mySwiper2"
      >
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/1-product-card.png"
                 class="image"
                 width="624"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/2-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/3-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/4-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/5-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
      </swiper>
      <swiper
        @swiper="setThumbsSwiper"
        :loop="true"
        :spaceBetween="38"
        :slidesPerView="4"
        :watchSlidesProgress="true"
        :modules="[Thumbs]"
        :breakpoints="breakpoints"
        class="mySwiper"
      >
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/1-product-card-small.png"
                 class="image"
                 height="61"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/2-product-card-small.png"
                 class="image"
                 height="61"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/3-product-card-small.png"
                 class="image"
                 height="61"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/4-product-card-small.png"
                 class="image"
                 height="61"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/5-product-card-small.png"
                 class="image"
                 height="61"
                 :alt="product.name">
          </picture>
        </swiper-slide>
      </swiper>
      <p class="heading-reset product__description">
          {{ product.description }}
        </p>
      <div class="product__actions">

        <div class="product__grade">
          <svg class="product__icon">
            <use xlink:href="@/assets/img/sprite.svg#rating-star"></use>
          </svg>
          {{ roundRating(product.rating) }}
        </div>
        <h1 class="heading-reset product__heading">
          {{ product.name }}
        </h1>
        <div class="product__price">
          {{ formattedPrice(product.price) }} руб
        </div>
        <div class="product__colors">
          <ul class="colors-list list-reset">
            <li class="colors-list__item" v-for="color in product.colors" :key="color.id">
              <label :for="color.slug" class="custom-checkbox">
                <input class="custom-checkbox__field"
                       type="radio"
                       name="colorId"
                       :id="color.slug"
                       :value="color.id"
                       v-model="colorId"
                >
                <span class="custom-checkbox__content"
                      :style="{ backgroundColor: color.code }"
                >
                  </span>
              </label>
            </li>
          </ul>
        </div>
        <div class="product__quantity quantity">
          <button class="btn-reset quantity__button"
                  @click="quantity <= 1 ? 1 : quantity--"
          >
            -
          </button>
          <label for="quantity" class="quantity__label">
            <input class="input-reset quantity__input"
                   type="number"
                   name="quantity"
                   id="quantity"
                   v-model="quantity"
            >
          </label>
          <button class="btn-reset quantity__button"
                  @click="quantity++"
          >
            +
          </button>
        </div>
        <button
          class="btn-reset product__button"
          @click.prevent="addToCart"
          :disabled="productAddSending"
        >
          <span v-show="!productAddSending && !productAdded">Добавить в корзину</span>
          <svg v-show="productAdded" height="16" width="16" version="1.1" id="Capa_1"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 0 17.837 17.837" xml:space="preserve">
                <g>
                  <!--                 eslint-disable-next-line max-len -->
                  <path style="fill:#ffffff;" d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0 L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
                </g>
                </svg>
          <svg v-show="productAddSending" width="16" height="16" viewBox="0 0 18 18"
               xmlns="http://www.w3.org/2000/svg">
            <!--                 eslint-disable-next-line max-len -->
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                  class="spinner_P7sC"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
  <section class="similar" v-show="similar.length > 0 && dataIsLoaded">
    <div class="container similar__container">
      <h2 class="similar__heading heading-reset">
        Похожие товары
      </h2>
      <div class="similar__buttons">
        <button class="similar__button similar__button--prev btn-reset"></button>
        <button class="similar__button similar__button--next btn-reset"></button>
      </div>
      <similar-slider :products="similar" class="similar__swiper" />
    </div>
  </section>
  <base-spinner v-show="dataIsLoading"/>
  <base-modal v-model:open="openModalSlider">
    <div class="card">
      <svg class="card__cross"
           width="20"
           height="20"
           viewBox="0 0 20 20"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
           @click="openModalSlider = false"
           @keydown.esc="openModalSlider = false"
      >
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M2.3812 0.397739L11.2581 9.03977C11.8029 9.57009 11.8029 10.4299 11.2581
              10.9602L2.3812 19.6023C1.83647 20.1326 0.953281 20.1326 0.408549
              19.6023C-0.136183 19.0719 -0.136183 18.2121 0.408549 17.6818L8.29915
               10L0.40855 2.31819C-0.136182 1.78787 -0.136181 0.928057 0.408551 0.397739C0.953283
                -0.13258 1.83647 -0.13258 2.3812 0.397739Z"
              fill="#999999"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.6188 0.397739L8.74188 9.03977C8.19715 9.57009 8.19715 10.4299 8.74188
               10.9602L17.6188 19.6023C18.1635 20.1326 19.0467 20.1326 19.5915 19.6023C20.1362
                19.0719 20.1362 18.2121 19.5915 17.6818L11.7009 10L19.5914 2.31819C20.1362 1.78787
                 20.1362 0.928057 19.5914 0.397739C19.0467 -0.13258 18.1635
                  -0.13258 17.6188 0.397739Z"
              fill="#999999"/>
      </svg>
      <swiper
        :loop="true"
        :spaceBetween="10"
        class="mySwiper2"
      >
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/1-product-card.png"
                 class="image"
                 width="624"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/2-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/3-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/4-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
        <swiper-slide>
          <picture>
            <img loading="lazy"
                 src="@/assets/img/5-product-card.png"
                 class="image"
                 height="245"
                 :alt="product.name">
          </picture>
        </swiper-slide>
      </swiper>
    </div>
  </base-modal>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { ref } from 'vue';
import BaseModal from '@/components/BaseModal';
import BaseSpinner from '@/components/BaseSpinner';
import SimilarSlider from '@/components/SimilarSlider';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs } from 'swiper';
import { BASE_URL } from '@/api/config';
import { mapGetters, mapActions } from 'vuex';

import 'swiper/css';
import 'swiper/css/thumbs';

export default {
  name: 'ProductView',
  components: {
    SimilarSlider,
    BaseSpinner,
    Swiper,
    SwiperSlide,
    BaseModal,
  },

  setup() {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    return {
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
      breakpoints: {
        995: {
          direction: 'horizontal',
        },

        577: {
          direction: 'vertical',
          slidesPerView: 4,
        },

        320: {
          direction: 'horizontal',
          slidesPerView: 2.5,
        },
      },
    };
  },

  data() {
    return {
      product: {},
      dataIsLoading: true,
      dataIsLoaded: false,
      openModalSlider: false,
      similar: [],
      quantity: 1,
      colorId: 0,
      productAddSending: false,
      productAdded: false,
    };
  },

  methods: {
    ...mapActions(['addProductToCart']),

    loadProduct(slug) {
      this.dataIsLoaded = false;
      this.dataIsLoading = true;

      return axios.get(`${BASE_URL}/api/products/${slug}`, {
        method: 'GET',
      })
        .then((response) => {
          this.product = response.data.payload;
          this.colorId = response.data.payload.colors[0].id;

          if (response.data.error === null) {
            this.dataIsLoaded = true;
            this.dataIsLoading = false;
          }
        });
    },

    roundRating() {
      return Number(this.product.rating)
        .toFixed(1)
        .replace('.', ',');
    },

    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(price)
        .split(',')[0];
    },

    similarProducts() {
      const subcategoriesSlug = [];

      if (this.product) {
        this.product.subcategories.forEach((subcategory) => {
          subcategoriesSlug.push(subcategory.slug);
        });
      }

      return this.getProducts
        // eslint-disable-next-line max-len
        .filter((item) => item.subcategories.some((subcategory) => subcategoriesSlug.includes(subcategory.slug)) && item.id !== this.product.id)
        .slice(0, 12);
    },

    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.product.id,
        quantity: this.quantity,
        colorId: this.colorId,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
        this.changeProductAdded();
      });
    },

    changeProductAdded() {
      if (this.productAdded) {
        setTimeout(() => {
          this.productAdded = false;
        }, 1500);
      }
    },
  },

  watch: {
    product() {
      this.similar = this.similarProducts();
    },
  },

  beforeRouteUpdate(to) {
    this.loadProduct(to.params.slug);
  },

  computed: {
    ...mapGetters(['getProducts']),
  },

  created() {
    this.loadProduct(this.$route.params.slug);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.product {
  &__container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px 32px;
    padding-top: 35px;
    padding-bottom: 40px;

    @include tablet {
      grid-template-columns: repeat(9, 1fr);
    }

    @include extra-tablet {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__actions {
    grid-area: 1 / 7 / 2 / 13;

    @include tablet {
      grid-area: 1 / 6 / 2 / 10;
    }

    @include extra-tablet {
      grid-area: 2 / 3 / 3 / 7;
      align-self: center;
    }

    @include mobile {
      grid-area: 3 / 1 / 4 / 7;
    }
  }

  &__heading {
    margin-bottom: 21px;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    color: var(--black);

    @include mobile {
      font-size: 16px;
    }
  }

  &__description {
    grid-area: 3 / 1 / 4 / 7;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: var(--black);

    @include tablet {
      grid-area: 3 / 1 / 4 / 6;
    }

    @include extra-tablet {
      grid-area: 3 / 1 / 4 / 6;
    }

    @include mobile {
      grid-area: 4 / 1 / 5 / 7;
    }
  }

  &__price {
    margin-bottom: 21px;
    font-weight: 400;
    font-size: 36px;
    line-height: 130%;
    color: var(--black);

    @include mobile {
      font-size: 24px;
    }
  }

  &__grade {
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 20.8px;
    font-weight: 400;
    color: var(--secondary);
  }

  &__icon {
    display: block;
    width: 15px;
    height: 15px;
    margin-right: 7px;
    fill: var(--secondary);
  }

  &__button {
    @include btn-primary;
    max-width: 256px;
    width: 100%;

    @include mobile {
      max-width: 100%;
    }
  }
}

.mySwiper {
  max-width: 624px;
  width: 100%;
  grid-area: 2 / 1 / 3 / 7;
  margin-bottom: 32px;
  padding: 10px 25px;
  background-color: var(--grey_light);

  @include tablet {
    grid-area: 2 / 1 / 3 / 6;
  }

  @include extra-tablet {
    grid-area: 2 / 1 / 3 / 3;
    max-height: 349px;
    margin-bottom: 0;
    padding: 25px 10px;
  }

  @include mobile {
    grid-area: 2 / 1 / 3 / 7;
    padding: 10px;
  }

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.mySwiper2 {
  max-width: 624px;
  width: 100%;
  grid-area: 1 / 1 / 2 / 7;
  margin-bottom: 16px;

  @include tablet {
    grid-area: 1 / 1 / 2 / 6;
  }

  @include extra-tablet {
    grid-area: 1 / 1 / 2 / 7;
  }

  & .swiper-slide {
    display: flex;
    justify-content: center;
    cursor: pointer;

    & picture {
      @include mobile {
        display: flex;
        align-items: center;
      }

      & img {
        @include small-mobile {
          max-height: 146px;;
        }
      }
    }
  }
}

.card {
  position: relative;
  max-width: 624px;
  padding: 50px;
  background-color: var(--white);

  &__cross {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;

    & path {
      transition: fill .3s ease-in-out;
    }

    &:hover path {
      fill: var(--black);
    }
  }
}

.similar {
  &__container {
    padding-top: 41px;
    padding-bottom: 70px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 26px;
  }

  &__swiper {
    @include mobile {
      order: 2;
    }
  }

  &__heading {
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    color: var(--black);

    @include mobile {
      order: 1;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    margin-left: auto;

    @include mobile {
      order: 3;
      margin: 0 auto;
    }
  }

  &__button {
    @include arrow-round;

    &__disabled {
      border-color: var(--grey);

      &::after {
        border-color: var(--grey)
      }
    }

    &--prev {
      @include arrow-round-left;
      margin-right: 13px;
    }

    &--next {
      @include arrow-round-right;
    }
  }
}

.quantity {
  max-width: 256px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 21px;
  gap: 15px;

  @include mobile {
    max-width: 100%;
  }

  &__label {
    max-width: calc(256px - 30px - 62px);

    @include mobile {
      max-width: calc(100% - 30px - 62px);
    }
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

.colors-list {
  display: flex;
  align-items: center;
  margin-bottom: 21px;

  &__item {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.custom-checkbox {
  @include custom-checkbox;

  &__content {
    display: block;
    padding: 2px;
    width: 30px;
    height: 30px;
    border-radius: 100%;

    @include mobile {
      width: 20px;
      height: 20px;
    }

    &::before {
      display: none;
    }

    &::after {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: transparent;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      @include mobile {
        width: 30px;
        height: 30px;
      }
    }
  }
}

.custom-checkbox__field:checked + .custom-checkbox__content::after {
  border-color: var(--primary);
}

.custom-checkbox__field:focus + .custom-checkbox__content::after {
  border-color: var(--primary);
}
</style>
