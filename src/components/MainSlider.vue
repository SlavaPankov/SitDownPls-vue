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

<style lang="scss">
@import '../assets/scss/_mixins.scss';

.banner {
  &__container {
    padding-top: 80px;
    padding-bottom: 80px;

    @include mobile {
      padding-top: 55px;
      padding-bottom: 0;
    }

    @include small-mobile {
      padding-top: 30px;
    }
  }

  &__heading {
    margin-bottom: 49px;
    font-size: 48px;
    line-height: 65px;
    font-weight: 700;
    color: var(--grey);

    @include mobile {
      font-size: 6.25vw;
      line-height: 120%;
      margin-bottom: 43vw;
    }
  }

  &__button {
    @include btn-primary;

    @include mobile {
      width: 100%;
    }
  }

  &__slide {
    box-sizing: border-box;

    &:first-child {
      background: url("../assets/img/1-banner.webp") center center no-repeat var(--white);
      background-size: cover;

      @include tablet {
        background: url("@/assets/img/1-banner-1024.webp") center center no-repeat var(--white);
      }

      @include small-tablet {
        background: url("@/assets/img/1-banner-768.webp") center center no-repeat var(--white);
      }

      @include mobile {
        background: url("@/assets/img/1-banner-320.png") center center no-repeat var(--white);
        background-size: contain;
        background-position: center top;
      }
    }

    &:nth-child(2) {
      background: url("../assets/img/2-banner.webp") center center no-repeat var(--white);
      background-size: cover;

      @include tablet {
        background: url("@/assets/img/2-banner-1024.webp") center center no-repeat var(--white);
      }

      @include small-tablet {
        background: url("@/assets/img/2-banner-768.webp") center center no-repeat var(--white);
      }

      @include mobile {
        background: url("@/assets/img/2-banner-320.png") center center no-repeat var(--white);
        background-size: contain;
        background-position: center top;
      }
    }

    &:nth-child(3) {
      background: url("../assets/img/3-banner.webp") center center no-repeat var(--grey_shade);
      background-size: cover;

      @include tablet {
        background: url("@/assets/img/3-banner-1024.webp") center center no-repeat var(--white);
      }

      @include small-tablet {
        background: url("@/assets/img/3-banner-768.webp") center center no-repeat var(--white);
      }

      @include mobile {
        background: url("@/assets/img/3-banner-320.webp") center center no-repeat var(--white);
        background-size: contain;
        background-position: center top;
      }

      & .banner__heading {
        color: var(--white);
      }
    }
  }
}

.swiper-horizontal>.swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: var(--swiper-pagination-bottom, 23px);

  @include mobile {
    bottom: var(--swiper-pagination-bottom, 25%);
  }
}

.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 8px);
}

.block {
  display: block;
}
</style>
