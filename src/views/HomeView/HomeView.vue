<template>
  <main-slider/>
  <section class="specials">
    <div class="container specials__container">
      <h2 class="specials__heading heading-reset">
        Специальные предложения
      </h2>
      <div class="special__buttons">
        <button class="specials__button specials__button--next btn-reset"></button>
        <button class="specials__button specials__button--prev btn-reset"></button>
      </div>
      <specials-slider />
    </div>
  </section>
</template>

<script>
import MainSlider from '@/components/MainSlider/MainSlider';
import SpecialsSlider from '@/components/SpecialsSlider/SpecialsSlider';
import './style.scss';

export default {
  name: 'HomeView',
  components: { SpecialsSlider, MainSlider },
};
</script>
