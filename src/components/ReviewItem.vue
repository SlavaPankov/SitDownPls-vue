<template>
  <article class="review">
    <h2 class="heading-reset review__heading">
      <svg class="review__icon">
        <use xlink:href="@/assets/img/sprite.svg#person"></use>
      </svg>
      {{ review.user.name }} {{ review.user.sur_name }}
    </h2>
    <p class="heading-reset review__text reviews__advantages">
      <span class="review__bold">Преимущества: </span> {{ review.advantages }}
    </p>
    <p class="heading-reset review__text reviews__disadvantages">
      <span class="review__bold">Недостатки: </span> {{ review.disadvantages }}
    </p>
    <p class="heading-reset review__text review__comment">
      <span class="review__bold">Комментарий: </span> {{ review.comment }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    review: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>

.review {
  display: flex;
  flex-direction: column;
  padding: 25px 15px;
  background-color: var(--grey_light);
  border-radius: 10px;

  &__heading {
    font-size: 18px;
    line-height: 130%;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-bottom: 26px;
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: var(--primary);
    margin-right: 5px;
  }

  &__text {
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 130%;
  }

  &__bold {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
  }
}
</style>
