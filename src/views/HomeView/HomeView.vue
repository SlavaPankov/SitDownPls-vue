<template>
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
      <categories-list/>
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
</template>

<script>
import MainSlider from '@/components/MainSlider/MainSlider';
import SpecialsSlider from '@/components/SpecialsSlider/SpecialsSlider';
import RatingList from '@/components/RatingList/RatingList';
import CategoriesList from '@/components/CategoriesList/CategoriesList';
import './styles.scss';
import { mapGetters } from 'vuex';
import UsefulSlider from '@/components/UsefulSlider/UsefulSlider';
import BaseCallback from '@/components/BaseCallback/BaseCallback';

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
    ...mapGetters(['getHighRatingProducts', 'getProducts', 'getPosts']),

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
