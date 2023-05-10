<template>
  <ul class="list-reset review-list" >
    <li class="review-list__item" v-for="review in reviews" :key="review.id">
      <review-item :review="review" />
    </li>
  </ul>
</template>

<script>
import ReviewItem from '@/components/ReviewItem';

export default {
  name: 'ReviewsList',
  components: { ReviewItem },
  props: {
    reviews: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.review-list {
  &__item {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
}
</style>
