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
import CategoryCard from '@/components/CategoryCard';

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

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.top-categories {
  &__list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 32px;
    grid-auto-flow: row dense;
    row-gap: 32px;

    @include tablet {
      grid-template-columns: repeat(9, 1fr);
    }

    @include small-tablet {
      grid-template-columns: repeat(6, 1fr);
      gap: 32px 16px;
    }
  }

  &__item {
    grid-column: span 4;

    @include tablet {
      grid-column: span 3;
    }

    &:nth-child(5n+1) {
      grid-column: span 6;
    }

    &:nth-child(5n+2) {
      grid-column: span 6;

      @include tablet {
        grid-column: span 3;
      }
    }
  }
}
</style>
