<template>
  <swiper
    class="specials__slider"
    :slides-per-view="3"
    :slides-per-group="3"
    :space-between="32"
    :navigation="navigation"
    :modules="modules"
    :breakpoints="breakpoints"
    :loop="true"
  >
    <swiper-slide
      v-for="product in getDiscountProducts"
      :key="product.id">
      <discount-card :product="product" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import DiscountCard from '@/components/DiscountCard';
import { Navigation } from 'swiper';
import { mapGetters } from 'vuex';

import 'swiper/css';
import 'swiper/css/navigation';

export default {
  name: 'SpecialsSlider',
  components: {
    Swiper,
    SwiperSlide,
    DiscountCard,
  },

  setup() {
    return {
      navigation: {
        nextEl: '.specials__button--next',
        prevEl: '.specials__button--prev',
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },

        699: {
          slidesPerGroup: 2,
          slidesPerView: 2,
        },

        320: {
          slidesPerGroup: 1,
          slidesPerView: 1,
        },
      },
      modules: [Navigation],
    };
  },

  computed: {
    ...mapGetters(['getDiscountProducts']),
  },
};
</script>

<style lang="scss" scoped>
.specials {
  &__slider {
    width: 100%;
  }
}

.swiper-button-lock {
  display: block;
}
</style>
