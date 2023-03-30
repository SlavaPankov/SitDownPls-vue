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
      <specials-slider />
    </div>
  </section>
  <section class="rating">
    <div class="rating__container container">
      <h2 class="rating__heading heading-reset">
        Высокий рейтинг
      </h2>
      <rating-list />
    </div>
  </section>
</template>

<script>
import MainSlider from '@/components/MainSlider/MainSlider';
import SpecialsSlider from '@/components/SpecialsSlider/SpecialsSlider';
import RatingList from '@/components/RatingList/RatingList';
import './style.scss';

export default {
  name: 'HomeView',
  components: { SpecialsSlider, MainSlider, RatingList },
};
</script>
