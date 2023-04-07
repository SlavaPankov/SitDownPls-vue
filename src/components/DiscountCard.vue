<template>
  <article class="specials__card special-card">
    <span class="special-card__label">
      - {{ formattedPrice(discount) }}
    </span>
    <router-link :to="{
      name: 'product',
          params: {
            slug: product.slug,
            subcategory: product.subcategories[0] ? product.subcategories[0].slug : 'test',
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
                subcategory: product.subcategories[0] ? product.subcategories[0].slug : 'test',
                category: product.categories[0].slug } }"
      class="heading-reset special-card__title"
    >
      {{ nameWithoutLastWord }} <span class="block">{{ nameLastWord }}</span>
    </router-link>
    <div class="special-card__prices">
      <div class="special-card__prices-current">
        {{ formattedPrice(product.price) }} руб
      </div>
      <div class="special-card__prices-old">
        {{ formattedPrice(product.old_price) }} руб
      </div>
    </div>
    <router-link
      :to="{ name: 'product',
             params: {
              slug: product.slug,
              subcategory: product.subcategories[0] ? product.subcategories[0].slug : 'test',
              category: product.categories[0].slug } }"
      class="special-card__button btn-reset">
      Купить
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'DiscountCard',
  props: {
    product: {
      require: true,
      type: Object,
    },
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

  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price).split(',')[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_mixins.scss";

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
