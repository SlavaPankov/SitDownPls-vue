<template>
  <div class="filters">
    <h2 class="filters__heading heading-reset">
      Фильтровать по:
    </h2>
    <form action="" class="filters__form">
      <fieldset class="filters__category category">
        <h3 class="category__heading filters__subheading heading-reset">
          Категория
        </h3>
        <ul class="category__list list-reset" v-if="categoryData">
          <li class="category__item filters__item"
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
        <h3 class="price__heading filters__subheading heading-reset">
          Цена
        </h3>
        <div class="price__inputs">
          <label class="price__label" for="priceFrom">
            от
            <input
              v-model="prices[0]"
              class="price__input input-reset"
              type="number"
              name="priceFrom"
              id="priceFrom"
            >
          </label>
          <label class="price__label" for="priceTo">
            до
            <input
              v-model="prices[1]"
              class="price__input input-reset"
              type="number"
              name="priceTo"
              id="priceTo"
            >
          </label>
        </div>
        <Slider v-model="prices"
                :max="maxRange"
                :tooltips="false"
                :lazy="false"
                :step="1000"/>
      </fieldset>
      <fieldset class="filters__category discount">
        <h3 class="discount__heading filters__subheading heading-reset">
          Скидка
        </h3>
        <ul class="discount__list list-reset">
          <li class="discount__item filters__item">
            <label class="custom-checkbox" for="more">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="5000"
                     id="more"
                     v-model.number="currentDiscount"
                     @change="this.$emit('update:discount', +currentDiscount)"
              >
              <span class="custom-checkbox__content"></span>
              Более 5 000
            </label>
          </li>
          <li class="discount__item filters__item">
            <label class="custom-checkbox" for="less">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="-5000"
                     id="less"
                     v-model.number="currentDiscount"
                     @change="this.$emit('update:discount', +currentDiscount)"
              >
              <span class="custom-checkbox__content"></span>
              Менее 5 000
            </label>
          </li>
          <li class="discount__item filters__item">
            <label class="custom-checkbox" for="dont">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="0"
                     id="dont"
                     v-model.number="currentDiscount"
                     @change="this.$emit('update:discount', +currentDiscount)"
              >
              <span class="custom-checkbox__content"></span>
              Не важно
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="filters__category color">
        <h3 class="color__heading filters__subheading heading-reset">
          Цвет
        </h3>
        <ul class="color__list list-reset">
          <li class="color__item filters__item" v-for="color in getColors" :key="color.id">
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
      required: true,
      type: Array,
    },
    priceFrom: {
      required: true,
      type: Number,
    },
    priceTo: {
      required: true,
      type: Number,
    },
    discount: {
      required: true,
      type: Number,
    },
    colorSlug: {
      require: true,
      type: Array,
    },
    categoryData: {
      required: true,
      type: Object,
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
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: var(--grey_shade);
  display: flex;
  align-items: center;
}

.filters {
  &__heading {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 130%;
    color: var(--black);
  }

  & fieldset {
    padding: 0;
    border: none;

    &:not(:last-child) {
      margin-bottom: 27px;
    }
  }

  &__subheading {
    margin-bottom: 9px;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: var(--grey_shade);
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }
}

.price {
  &__inputs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__label {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: var(--grey_shade);
  }

  &__input {
    max-width: 86px;
    padding: 4px 13px;
    border: 1px solid var(--grey);
    border-radius: 2px;
    margin-left: 9px;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: var(--grey_shade);
  }
}
</style>
