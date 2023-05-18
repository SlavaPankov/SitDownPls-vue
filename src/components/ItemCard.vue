<template>
  <article class="rating__card rating-card">
    <div class="rating-card__grade">
      <svg class="rating-card__icon">
        <use xlink:href="@/assets/img/sprite.svg#rating-star"></use>
      </svg>
      {{ roundRating }}
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
      {{ formattedPrice(product.price) }} руб
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

  computed: {
    roundRating() {
      if (this.product.reviews && this.product.reviews.length > 0) {
        const sum = this.product.reviews.reduce((a, b) => a + Number(b.rating), 0);
        return (sum / this.product.reviews.length).toFixed(1).replace('.', ',');
      }

      return 0;
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

  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price).split(',')[0];
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
</style>
