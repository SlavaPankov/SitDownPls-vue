<template>
  <article class="rating__card rating-card">
    <div class="rating-card__grade">
      <svg class="rating-card__icon">
        <use xlink:href="@/assets/img/sprite.svg#rating-star"></use>
      </svg>
      {{ helper.roundRating(product) }}
    </div>
    <router-link class="rating-card__link" :to="{
      name: 'product',
        params: {
          category: product.categories[0].slug,
          slug: product.slug
        }
      }"
    >
    <picture class="rating-card__picture">
      <img loading="lazy"
           src="../assets/img/1-rating.png"
           class="image"
           :alt="product.name">
    </picture>
    </router-link>
    <router-link
      :to="{
        name: 'product',
        params: {
          category: product.categories[0].slug,
          slug: product.slug
        }
      }"
      class="rating-card__title">
      {{ product.name }}
    </router-link>
    <div class="rating-card__price">
      {{ helper.formattedPrice(product.price) }} руб
    </div>
    <router-link :to="{
        name: 'product',
        params: {
          category: product.categories[0].slug,
          slug: product.slug
        }
      }" class="btn-reset rating-card__button">
      Купить
    </router-link>
  </article>
</template>

<script>
import Helper from '@/api/Helper';

export default {
  name: 'ItemCard',
  props: {
    product: {
      require: true,
      type: Object,
    },
    mode: {
      type: String,
      default: 'item',
    },
  },

  data() {
    return {
      helper: new Helper(),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_mixins.scss";

.rating-card {
  max-width: 296px;
  width: 100%;
  @include card;
  box-sizing: border-box;

  &__link {
    margin-bottom: 16px;
  }
}
</style>
