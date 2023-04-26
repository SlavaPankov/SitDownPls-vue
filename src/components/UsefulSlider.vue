<template>
  <swiper
    class="useful__slider"
    :slides-per-view="2"
    :slides-per-group="2"
    :space-between="32"
    :navigation="navigation"
    :modules="modules"
    :breakpoints="breakpoints"
  >
    <swiper-slide
      v-for="post in getPosts"
      :key="post.id"
    >
      <useful-card :post="post" />
    </swiper-slide>
  </swiper>
</template>

<script>
import UsefulCard from '@/components/UsefulCard';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import { mapGetters } from 'vuex';

export default {
  name: 'UsefulSlider',
  components: {
    Swiper,
    SwiperSlide,
    UsefulCard,
  },

  setup() {
    return {
      navigation: {
        nextEl: '.useful__button--next',
        prevEl: '.useful__button--prev',
      },

      breakpoints: {
        1025: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },

        769: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },

        577: {
          slidesPerGroup: 2,
          slidesPerView: 2,
        },

        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      },

      modules: [Navigation],
    };
  },

  computed: {
    ...mapGetters(['getPosts']),
  },
};
</script>

<style lang="scss" scoped>
.useful {
  &__slider {
    width: 100%;
  }
}
</style>
