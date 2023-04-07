<template>
  <section class="banner">
    <swiper
    :slides-per-view="1"
    :pagination="pagination"
    :modules="modules"
  >
    <swiper-slide class="banner__slide">
      <div class="banner__container container">
        <h2 class="heading-reset banner__heading">
          Скидка 15% на <span class="block">первую покупку</span>
        </h2>
        <button class="btn-reset banner__button">Получить!</button>
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

export default {
  name: 'MainSlider',
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    return {
      pagination: {
        clickable: true,
      },
      modules: [Pagination],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins.scss';

.banner {
  &__container {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  &__heading {
    margin-bottom: 49px;
    font-size: 48px;
    line-height: 65px;
    font-weight: 700;
    color: var(--grey);
  }

  &__button {
    @include btn-primary;
  }

  &__slide {
    box-sizing: border-box;

    &:first-child {
      background: url("../assets/img/1-banner.webp") center center no-repeat var(--white);
      background-size: cover;
    }

    &:nth-child(2) {
      background: url("../assets/img/2-banner.webp") center center no-repeat var(--white);
      background-size: cover;
    }

    &:nth-child(3) {
      background: url("../assets/img/3-banner.webp") center center no-repeat var(--grey_shade);
      background-size: cover;

      & .banner__heading {
        color: var(--white);
      }
    }
  }
}

.block {
  display: block;
}
</style>
