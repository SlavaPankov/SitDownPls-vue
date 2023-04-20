<template>
  <main v-if="this.$route.name === 'home'">
    <main-slider/>
    <section class="specials">
      <div class="container specials__container">
        <h2 class="specials__heading heading-reset">
          Специальные предложения
        </h2>
        <div class="specials__buttons">
          <button class="specials__button specials__button--prev btn-reset"></button>
          <button class="specials__button specials__button--next btn-reset"></button>
        </div>
        <specials-slider/>
      </div>
    </section>
    <section class="rating">
      <div class="rating__container container">
        <h2 class="rating__heading heading-reset">
          Высокий рейтинг
        </h2>
        <rating-list :products="slicedProducts"/>
        <button class="btn-reset rating__button"
                v-if="getHighRatingProducts.length > 8 && slicedProducts.length < 20"
                @click="showMore"
        >
          Смотреть больше товаров
        </button>
      </div>
    </section>
    <section class="commercial">
      <div class="commercial__container container">
        <h2 class="commercial__heading heading-reset">
          Оксфорд 1950
        </h2>
        <p class="commercial__subtitle heading-reset">
          Новая коллекция изысканных кресел
        </p>
        <button class="commercial__button btn-reset">
          Ознакомиться
        </button>
      </div>
    </section>
    <section class="top-categories">
      <div class="top-categories__container container">
        <h2 class="top-categories__heading heading-reset">
          Топ категории
        </h2>
        <categories-list :categories="getTopCategories"/>
      </div>
    </section>
    <section class="useful">
      <div class="useful__container container">
        <h2 class="useful__heading heading-reset">
          Полезное
        </h2>
        <div class="useful__buttons">
          <button class="useful__button useful__button--prev btn-reset"></button>
          <button class="useful__button useful__button--next btn-reset"></button>
        </div>
        <useful-slider/>
      </div>
    </section>
    <base-callback />
  </main>
  <router-view v-if="this.$route.name !== 'home'" />
</template>

<script>
import MainSlider from '@/components/MainSlider';
import SpecialsSlider from '@/components/SpecialsSlider';
import RatingList from '@/components/RatingList';
import CategoriesList from '@/components/CategoriesList';
import { mapGetters } from 'vuex';
import UsefulSlider from '@/components/UsefulSlider';
import BaseCallback from '@/components/BaseCallback';

export default {
  name: 'HomeView',
  components: {
    UsefulSlider,
    SpecialsSlider,
    MainSlider,
    RatingList,
    CategoriesList,
    BaseCallback,
  },
  data() {
    return {
      RatingListLength: 0,
      ratingStep: 4,
      offsetStep: 8,
    };
  },

  computed: {
    ...mapGetters([
      'getHighRatingProducts',
      'getProducts',
      'getPosts',
      'getTopCategories',
    ]),

    slicedProducts() {
      return this.getHighRatingProducts.slice(0, this.offsetStep);
    },
  },

  methods: {
    showMore() {
      this.offsetStep += this.ratingStep;

      return this.slicedProducts;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins.scss';

.specials {
  &__container {
    padding-top: 70px;
    padding-bottom: 35px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 26px
  }

  &__heading {
    @include h2;
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

.rating {
  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
  }

  &__heading {
    @include h2;
    margin-bottom: 26px;
  }

  &__button {
    @include btn-primary;
    display: block;
    margin: 0 auto;
  }
}

.commercial {
  background: url("../assets/img/commercial.jpg") center center no-repeat var(--grey);
  background-size: 100% 100%;

  &__container {
    padding-top: 150px;
    padding-bottom: 150px;
  }

  &__heading {
    font-family: 'PlayfairDisplay', 'OpenSans', sans-serif;
    font-size: 60px;
    line-height: 72px;
    font-weight: 900;
    color: var(--gold);
  }

  &__subtitle {
    max-width: 580px;
    margin-bottom: 49px;
    font-size: 48px;
    line-height: 57.6px;
    font-weight: 400;
    color: var(--white);
  }

  &__button {
    @include btn-primary;
  }
}

.top-categories {
  &__container {
    padding-top: 69px;
    padding-bottom: 35px;
  }

  &__heading {
    padding-left: 1.5px;
    margin-bottom: 26px;
    @include h2;
  }
}

.useful {
  &__container {
    padding-top: 35px;
    padding-bottom: 35px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 26px;
  }

  &__heading {
    @include h2;
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
