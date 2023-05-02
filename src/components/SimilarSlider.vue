<template>
  <swiper
    class="similar__slider"
    :slides-per-view="4"
    :space-between="32"
    :navigation="navigation"
    :modules="modules"
    :breakpoints="breakpoints"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <item-card :product="product"/>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import ItemCard from '@/components/ItemCard';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

export default {
  name: 'SimilarSlider',
  components: {
    Swiper,
    SwiperSlide,
    ItemCard,
  },

  props: {
    products: {
      required: true,
      type: Array,
    },
  },

  setup() {
    return {
      navigation: {
        nextEl: '.similar__button--next',
        prevEl: '.similar__button--prev',
      },

      breakpoints: {
        1025: {
          slidesPerView: 4,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 32,
        },

        320: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
      },

      modules: [Navigation],
    };
  },
};
</script>

<style lang="scss" scoped>
.similar {
  &__slider {
    width: 100%;
  }
}
</style>
