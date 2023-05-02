<template>
  <section class="category" v-if="this.$route.name === 'category'">
    <div class="category__container container">
      <div class="category__head category__head--tablet">
        <h1 class="heading-reset category__heading">
          {{ currentCategory.name }}
        </h1>
        <tags-list v-model:tags="tags" />
      </div>
      <catalog-filters
        class="category__left"
        v-model:subcategories="subcategories"
        v-model:price-to="priceTo"
        v-model:price-from="priceFrom"
        v-model:colors="colors"
        v-model:discount="discount"
        :category-data="currentCategory"
        :max-range="maxRange"
      />
      <div class="category__right">
        <div class="category__head">
          <h1 class="heading-reset category__heading">
            {{ currentCategory.name }}
          </h1>
          <tags-list v-model:tags="tags" />
        </div>
        <products-list :products="paginatedProducts" />
        <base-pagination
          :count-per-page="countPerPage"
          v-model:page="page"
          :total-count="filteredProducts.length"
          v-if="filteredProducts.length > countPerPage"
        />
      </div>
    </div>
  </section>
  <router-view v-if="this.$route.name !== 'category'" />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters } from 'vuex';
import CatalogFilters from '@/components/CatalogFilters';
import BasePagination from '@/components/BasePagination';
import ProductsList from '@/components/ProductsList';
import TagsList from '@/components/TagsList';

export default {
  name: 'CategoryView',

  components: {
    BasePagination,
    ProductsList,
    CatalogFilters,
    TagsList,
  },

  data() {
    return {
      subcategories: [],
      priceFrom: 0,
      priceTo: 0,
      discount: 0,
      colors: [],
      maxRange: 100,
      productsByCategory: [],
      countPerPage: 9,
      page: 1,
      tags: [],
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

    checkWindowSize(evt) {
      if (evt.target.innerWidth <= 995) {
        this.countPerPage = 6;
      } else {
        this.countPerPage = 9;
      }
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
          .some((subcategory) => this.subcategories.includes(subcategory.slug))
          || this.subcategories.length === 0)
        && (product.price >= this.priceFrom || this.priceFrom === 0)
        && (product.price <= this.priceTo || this.priceTo === this.maxPrice())
        && (product.colors.some((color) => this.colors.includes(color.slug))
          || this.colors.length === 0)
        && ((this.discount > 0
          ? product.old_price - product.price > this.discount
          : product.old_price - product.price < this.discount) || this.discount === 0));
    },

    paginatedProducts() {
      return this.filteredProducts.slice(
        this.countPerPage * (this.page - 1),
        this.countPerPage * this.page,
      );
    },
  },

  watch: {
    filteredProducts() {
      this.page = 1;
    },
  },

  created() {
    this.productsByCategory = this.getProducts
      .filter((product) => product.categories
        .some((category) => category.slug === this.$route.params.category));

    this.priceTo = this.maxPrice();
    this.maxRange = this.maxPrice();

    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries(),
    );

    const VALID_KEYS = ['subcategories', 'priceFrom', 'priceTo', 'colors', 'discount'];

    VALID_KEYS.forEach((key) => {
      if (windowData[key]) {
        if (key !== 'priceFrom' && key !== 'priceTo' && key !== 'page') {
          this[key] = windowData[key].split(' ');
        } else {
          this[key] = +windowData[key];
        }
      }
    });

    if (window.innerWidth <= 995) {
      this.countPerPage = 6;
    }

    window.addEventListener('resize', this.checkWindowSize);
  },

  unmount() {
    window.addEventListener('resize', this.checkWindowSize);
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

    @include tablet {
      flex-direction: column;
    }
  }

  &__left {
    max-width: 296px;
    width: 100%;

    @include tablet {
      max-width: 100%;
      display: flex;
      align-items: center;
    }

    @include extra-tablet {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  &__right {
    max-width: 952px;
    width: 100%;
  }

  &__head {
    margin-bottom: 24px;
    display: flex;
    gap: 17px;

    @include extra-tablet {
      display: none;
    }

    &--tablet {
      display: none;

      @include extra-tablet {
        display: flex;
        margin-bottom: 0;
      }
    }
  }

  &__heading {
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    color: var(--black);
  }
}
</style>
