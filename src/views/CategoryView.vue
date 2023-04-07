<template>
  <div class="category__container container">
    <catalog-filters
      class="category__left"
      v-model:category-slug="categorySlug"
      v-model:price-to="priceTo"
      v-model:price-from="priceFrom"
      v-model:color-slug="colorSlug"
      v-model:discount="discount"
      :category-data="currentCategory"
      :max-range="maxRange"
    />
    <div class="category__right">
      <ul class="products-list list-reset">
        <li class="products-list__item" v-for="product in filteredProducts" :key="product.id">
          <item-card :product="product" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import ItemCard from '@/components/ItemCard/ItemCard';
import { mapGetters } from 'vuex';
import CatalogFilters from '@/components/CatalogFilters';

export default {
  name: 'CategoryView',

  components: {
    ItemCard,
    CatalogFilters,
  },

  data() {
    return {
      categorySlug: [],
      priceFrom: 0,
      priceTo: 0,
      discount: 0,
      colorSlug: [],
      maxRange: 100,
      productsByCategory: [],
    };
  },

  methods: {
    maxPrice() {
      if (this.productsByCategory.length === 0) {
        return 100;
      }

      const maxPriceProduct = this.productsByCategory
        .reduce((acc, value) => (acc.price > value.price ? acc : value));

      return Number(maxPriceProduct.price);
    },
  },

  computed: {
    ...mapGetters(['getProducts', 'getCategories']),

    currentCategory() {
      return this.getCategories
        .filter((category) => category.slug === this.$route.params.category)[0];
    },

    filteredProducts() {
      // eslint-disable-next-line func-names,array-callback-return,max-len
      return this.productsByCategory.filter((product) =>
      // eslint-disable-next-line implicit-arrow-linebreak
        (product.subcategories
          .some((subcategory) => this.categorySlug.includes(subcategory.slug))
          || this.categorySlug.length === 0)
        && (product.price >= this.priceFrom || this.priceFrom === 0)
        && (product.price <= this.priceTo || this.priceTo === this.maxPrice())
        && (product.colors.some((color) => this.colorSlug.includes(color.slug))
          || this.colorSlug.length === 0)
        && ((this.discount > 0
          ? product.old_price - product.price > this.discount
          : product.old_price - product.price < this.discount) || this.discount === 0));
    },
  },

  created() {
    this.productsByCategory = this.getProducts
      .filter((product) => product.categories
        .some((category) => category.slug === this.$route.params.category));

    this.priceTo = this.maxPrice();
    this.maxRange = this.maxPrice();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_mixins.scss";

.category {
  &__container {
    display: flex;
    gap: 32px;
    padding-top: 32px;
    padding-bottom: 70px;
  }

  &__left {
    max-width: 296px;
    width: 100%;
  }

  &__right {
    max-width: 952px;
    width: 100%;
  }
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

</style>
