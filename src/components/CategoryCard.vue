<template>
  <article class="top-categories__card top-card">
    <ul class="top-card__list list-reset">
      <li
        class="top-card__list-item"
        v-for="subcategory in category.subcategories"
        :key="subcategory.id"
      >
        <router-link :to="{ name: 'category', params: { category: category.slug } }"
                     class="top-card__list-link"
        >
          <span class="top-card__list-text">{{ subcategory.name }}</span>
        </router-link>
      </li>
    </ul>
    <h3 class="heading-reset top-card__heading">
      <router-link :to="{ name: 'category', params: { category: category.slug } }"
                   class="top-card__heading-link"
      >
        {{ category.name }}
      </router-link>
    </h3>
    <picture>
      <img loading="lazy" src="../assets/img/1-top-categories.png"
           class="image"
           :alt="category.name">
    </picture>
    <router-link
      :to="{ name: 'category', params: { category: category.slug } }"
      class="top-card__link"
    >
          <span class="top-card__link-text">
            В каталог
          </span>
      <span class="top-card__link-arrow"></span>
    </router-link>
  </article>
</template>

<script>
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

<style lang="scss" scoped>
@import "../assets/scss/_mixins.scss";

.top-card {
  @include top-card;
}
</style>
