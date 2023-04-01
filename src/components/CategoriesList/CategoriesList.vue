<template>
  <ul class="top-categories__list list-reset">
    <li class="top-categories__item"
        v-for="category in categories"
        :key="category.id"
    >
      <category-card :category="category" />
    </li>
  </ul>
</template>

<script>
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import './styles.scss';

export default {
  name: 'CategoriesList',
  components: { CategoryCard },
  props: {
    categories: {
      type: Array,
    },
  },
};
</script>
