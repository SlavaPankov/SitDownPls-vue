<template>
  <section class="banner">
    <swiper
    :slides-per-view="1"
    :pagination="{ clickable: true }"
    :modules="modules"
  >
    <swiper-slide class="banner__slide">
      <div class="banner__container container">
        <h2 class="heading-reset banner__heading">
          Скидка 15% на <span class="block">первую покупку</span>
        </h2>
        <button class="btn-reset banner__button">Получить</button>
      </div>
    </swiper-slide>
    <swiper-slide class="banner__slide">
      <div class="banner__container container">
        <h2 class="heading-reset banner__heading">
          1000+ аксессуаров <span class="block">для дома</span>
        </h2>
        <button class="btn-reset banner__button">Подробнее</button>
      </div>
    </swiper-slide>
    <swiper-slide class="banner__slide">
      <div class="banner__container container">
        <h2 class="heading-reset banner__heading">
          Коллекция стильного <span class="block">и яркого текстиля</span>
        </h2>
        <button class="btn-reset banner__button">Подробнее</button>
      </div>
    </swiper-slide>
  </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles.scss';

export default {
  name: 'MainSlider',
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>
