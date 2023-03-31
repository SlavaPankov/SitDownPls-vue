<template>
  <article class="top-categories__card top-card">
    <ul class="top-card__list list-reset">
      <li
        class="top-card__list-item"
        v-for="subcategory in category.subcategories"
        :key="subcategory.id"
      >
        <a href="#" class="top-card__list-link">
          <span class="top-card__list-text">{{ subcategory.name }}</span>
        </a>
      </li>
    </ul>
    <h3 class="heading-reset top-card__heading">
      <a href="#" class="top-card__heading-link">
        {{ category.name }}
      </a>
    </h3>
    <picture>
      <img loading="lazy" src="../../assets/img/1-top-categories.png"
           class="image"
           :alt="category.name">
    </picture>
    <a href="#" class="top-card__link">
          <span class="top-card__link-text">
            В каталог
          </span>
      <span class="top-card__link-arrow"></span>
    </a>
  </article>
</template>

<script>
import './styles.scss';

export default {
  name: 'CategoryCard',
  props: {
    category: {
      require: true,
      type: Object,
    },
  },
};
</script>
