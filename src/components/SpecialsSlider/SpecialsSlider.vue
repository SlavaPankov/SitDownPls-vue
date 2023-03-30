<template>
  <swiper
    class="specials__slider"
    :slides-per-view="3"
    :slides-per-group="3"
    :space-between="32"
    :navigation="navigation"
    :modules="modules"
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
import DiscountCard from '@/components/DiscountCard/DiscountCard';
import { Navigation } from 'swiper';
import { mapGetters } from 'vuex';

import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';

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
      modules: [Navigation],
    };
  },

  computed: {
    ...mapGetters(['getDiscountProducts']),
  },
};
</script>
