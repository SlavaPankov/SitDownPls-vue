<template>
  <section class="product" v-if="dataIsLoaded">
    <div class="container product__container">
      <div class="product__left">
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
      </div>
      <div class="product__right">
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
        <button class="btn-reset product__button">
          Добавить в корзину
        </button>
      </div>
    </div>
  </section>
  <section class="similar" v-if="similar.length > 0 && dataIsLoaded">
    <div class="container similar__container">
      <h2 class="similar__heading heading-reset">
        Похожие товары
      </h2>
      <div class="similar__buttons">
        <button class="similar__button similar__button--prev btn-reset"></button>
        <button class="similar__button similar__button--next btn-reset"></button>
      </div>
      <similar-slider :products="similar" />
    </div>
  </section>
  <base-spinner v-if="dataIsLoading"/>
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
import { mapGetters } from 'vuex';

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
    };
  },

  data() {
    return {
      product: {},
      dataIsLoading: true,
      dataIsLoaded: false,
      openModalSlider: false,
      similar: [],
    };
  },

  methods: {
    loadProduct() {
      this.dataIsLoaded = false;
      this.dataIsLoading = true;

      return axios.get(`${BASE_URL}/api/products/${this.$route.params.slug}`, {
        method: 'GET',
      })
        .then((response) => {
          this.product = response.data.payload;

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
  },

  watch: {
    product() {
      this.similar = this.similarProducts();
    },

    $route() {
      window.location.reload();
    },
  },

  computed: {
    ...mapGetters(['getProducts']),
  },

  created() {
    this.loadProduct();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.product {
  &__container {
    display: flex;
    gap: 32px;
    padding-bottom: 40px;
  }

  &__left,
  &__right {
    flex-basis: 50%;
    max-width: 50%;
    width: 100%;
  }

  &__heading {
    margin-bottom: 40px;
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    color: var(--black);
  }

  &__description {
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: var(--black);
  }

  &__price {
    margin-bottom: 21px;
    font-weight: 400;
    font-size: 36px;
    line-height: 130%;
    color: var(--black);
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
  }
}

.mySwiper {
  margin-bottom: 32px;
  padding: 10px 25px;
  background-color: var(--grey_light);

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.mySwiper2 {
  margin-bottom: 16px;

  & .swiper-slide {
    display: flex;
    justify-content: center;
    cursor: pointer;
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

  &__heading {
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    color: var(--black);
  }

  &__buttons {
    display: flex;
    align-items: center;
    margin-left: auto;
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
</style>
