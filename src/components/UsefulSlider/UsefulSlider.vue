<template>
  <swiper
    class="useful__slider"
    :slides-per-view="2"
    :slides-per-group="2"
    :space-between="32"
    :navigation="navigation"
    :modules="modules"
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
import UsefulCard from '@/components/UsefulCard/UsefulCard';
import './styles.scss';
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
      modules: [Navigation],
    };
  },

  computed: {
    ...mapGetters(['getPosts']),
  },
};
</script>
