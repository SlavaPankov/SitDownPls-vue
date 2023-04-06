<template>
  <div class="filters">
    <h2 class="filters__heading heading-reset">
      Фильтровать по:
    </h2>
    <form action="" class="filters__form">
      <fieldset class="filters__category category">
        <h3 class="category__heading heading-reset">
          Категория
        </h3>
        <ul class="category__list list-reset" v-if="categoryData">
          <li class="category__item"
              v-for="subcategory in categoryData.subcategories"
              :key="subcategory.id"
          >
            <label class="custom-checkbox" :for="subcategory.slug">
              <input class="custom-checkbox__field agreement-checkbox visually-hidden"
                     type="checkbox"
                     name="subcategory"
                     :value="subcategory.slug"
                     :id="subcategory.slug"
                     v-model="currentCategorySlug"
                     @change="this.$emit('update:categorySlug', currentCategorySlug);"
              >
              <span class="custom-checkbox__content"></span>
              {{ subcategory.name }}
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="filters__price price">
        <h3 class="price__heading heading-reset">
          Цена
        </h3>
        <label class="price__label" for="priceFrom">
          <input
            v-model="prices[0]"
            class="price__input"
            type="number"
            name="priceFrom"
            id="priceFrom"
          >
        </label>
        <label class="price__label" for="priceTo">
          <input
            v-model="prices[1]"
            class="price__input"
            type="number"
            name="priceTo"
            id="priceTo"
          >
        </label>
        <Slider v-model="prices"
                :max="maxRange"
                :tooltips="false"
                :lazy="false"
                :step="1000"/>
      </fieldset>
      <fieldset class="filters__category discount">
        <h3 class="discount__heading heading-reset">
          Скидка
        </h3>
        <ul class="category__list list-reset">
          <li class="category__item">
            <label class="custom-checkbox" for="more">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="more"
                     id="more"
                     v-model="currentDiscount"
                     @change="this.$emit('update:discount', currentDiscount)"
              >
              <span class="custom-checkbox__content"></span>
              Более 5 000
            </label>
          </li>
          <li class="category__item">
            <label class="custom-checkbox" for="less">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="less"
                     id="less"
                     v-model="currentDiscount"
                     @change="this.$emit('update:discount', currentDiscount)"
              >
              <span class="custom-checkbox__content"></span>
              Менее 5 000
            </label>
          </li>
          <li class="category__item">
            <label class="custom-checkbox" for="dont">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="dont"
                     id="dont"
                     v-model="currentDiscount"
                     @change="this.$emit('update:discount', currentDiscount)"
              >
              <span class="custom-checkbox__content"></span>
              Не важно
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="filters__category color">
        <h3 class="color__heading heading-reset">
          Цвет
        </h3>
        <ul class="color__list list-reset">
          <li class="color__item" v-for="color in getColors" :key="color.id">
            <label class="custom-checkbox" :for="color.slug">
              <input class="custom-checkbox__field agreement-checkbox visually-hidden"
                     type="checkbox"
                     name="color"
                     :value="color.slug"
                     :id="color.slug"
                     v-model="currentColorSlug"
                     @change="this.$emit('update:colorSlug', currentColorSlug)"
              >
              <span class="custom-checkbox__content"></span>
              {{ color.name }}
            </label>
          </li>
        </ul>
      </fieldset>
    </form>
  </div>
</template>

<script>
import Slider from '@vueform/slider';
import { mapGetters } from 'vuex';

export default {
  name: 'CatalogFilters',
  components: {
    Slider,
  },

  props: {
    categorySlug: {
      require: true,
      type: Array,
    },
    priceFrom: {
      require: true,
      type: Number,
    },
    priceTo: {
      require: true,
      type: Number,
    },
    discount: {
      require: true,
      type: String,
    },
    colorSlug: {
      require: true,
      type: Array,
    },
    categoryData: {
      type: Object,
      required: true,
    },
    maxRange: {
      type: Number,
    },
  },

  computed: {
    ...mapGetters(['getColors']),
  },

  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(price)
        .split(',')[0];
    },
  },

  data() {
    return {
      prices: [this.priceFrom, this.priceTo],
      currentCategorySlug: this.categorySlug,
      currentDiscount: this.discount,
      currentColorSlug: this.colorSlug,
    };
  },

  watch: {
    prices() {
      this.$emit('update:priceFrom', this.prices[0]);
      this.$emit('update:priceTo', this.prices[1]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@vueform/slider/themes/default.css";
@import "../assets/scss/_mixins.scss";

.custom-checkbox {
  @include custom-checkbox;
}
</style>
