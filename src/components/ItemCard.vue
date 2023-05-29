<template>
  <article v-if="mode === 'item'" class="rating__card rating-card">
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
  <article v-if="mode === 'discount'" class="specials__card special-card">
    <span class="special-card__label">
      - {{ helper.formattedPrice(discount) }}
    </span>
    <router-link :to="{
      name: 'product',
          params: {
            slug: product.slug,
            category: product.categories[0].slug
          }
        }"
                 class="special-card__img-link"
    >
      <picture class="special-card__picture">
        <img loading="lazy"
             src="../assets/img/1-specials.png"
             class="image special-card__image"
             :alt="product.name"
        >
      </picture>
    </router-link>
    <router-link
      :to="{ name: 'product',
             params: {
                slug: product.slug,
                category: product.categories[0].slug } }"
      class="heading-reset special-card__title"
    >
      {{ nameWithoutLastWord }} <span class="block">{{ nameLastWord }}</span>
    </router-link>
    <div class="special-card__prices">
      <div class="special-card__prices-current">
        {{ helper.formattedPrice(product.price) }} руб
      </div>
      <div class="special-card__prices-old">
        {{ helper.formattedPrice(product.old_price) }} руб
      </div>
    </div>
    <router-link
      :to="{ name: 'product',
             params: {
              slug: product.slug,
              category: product.categories[0].slug } }"
      class="special-card__button btn-reset">
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

  computed: {
    discount() {
      return Number(this.product.old_price) - Number(this.product.price);
    },

    nameLastWord() {
      const arrFromString = this.product.name.split(' ');

      return arrFromString[arrFromString.length - 1];
    },

    nameWithoutLastWord() {
      const arrFromString = this.product.name.split(' ');
      arrFromString.pop();

      return arrFromString.join(' ');
    },
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

.special-card {
  @include special-card;
}

.specials__slider .swiper-slide {
  flex-basis: 25%;
  max-width: 296px;

  &:nth-child(3n+2) {
    flex-basis: 50%;
    max-width: 624px;
  }
}
</style>
