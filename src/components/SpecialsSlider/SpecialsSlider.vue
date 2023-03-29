<template>
  <swiper
    :slides-per-view="3"
    :slides-per-group="3"
    :space-between="32"
    :navigation="navigation"
    :modules="modules"
  >
    <swiper-slide>
      1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius molestiae, voluptate! At
      debitis delectus distinctio, doloremque earum expedita fugiat, id illum magni minima non
      quaerat quam quod sapiente tenetur voluptatibus.
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
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
    ...mapGetters(['getProducts']),

    discountProducts() {
      return this.getProducts.filter((product) => parseInt(product.old_price, 10) > 0);
    },
  },
};
</script>
