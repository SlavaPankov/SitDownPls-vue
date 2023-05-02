<template>
  <div class="filters">
    <h2 class="filters__heading heading-reset">
      Фильтровать по:
    </h2>
    <h2 class="heading-reset filters__heading filters__heading--tablet">
      Фильтры:
    </h2>
    <form action="" class="filters__form">
      <fieldset class="filters__category category">
        <h3 class="category__heading filters__subheading heading-reset"
            @click="toggleListOpen"
            @keydown.space="toggleListOpen"
        >
          Категория
        </h3>
        <ul class="category__list filter-list list-open list-reset">
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
                     @change="saveFilterToQueryParams(currentCategorySlug, 'subcategories')"
              >
              <span class="custom-checkbox__content"></span>
              {{ subcategory.name }}
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="filters__price price">
        <h3 class="price__heading filters__subheading heading-reset"
            @click="toggleListOpen"
            @keydown.space="toggleListOpen"
        >
          Цена
        </h3>
        <div class="price__inputs filter-list">
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
        <Slider class="filters__range"
                v-model="prices"
                :max="maxRange"
                :tooltips="false"
                :lazy="false"
                :step="1000"/>
      </fieldset>
      <fieldset class="filters__category discount">
        <h3 class="discount__heading filters__subheading heading-reset"
            @click="toggleListOpen"
            @keydown.space="toggleListOpen"
        >
          Скидка
        </h3>
        <ul class="discount__list filter-list list-reset">
          <li class="discount__item filters__item">
            <label class="custom-checkbox" for="more">
              <input class="custom-checkbox__field visually-hidden"
                     type="radio"
                     name="discount"
                     value="5000"
                     id="more"
                     v-model.number="currentDiscount"
                     @change="saveFilterToQueryParams(currentDiscount, 'discount')"
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
                     @change="saveFilterToQueryParams(currentDiscount, 'discount')"
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
                     @change="saveFilterToQueryParams(currentDiscount, 'discount')"
              >
              <span class="custom-checkbox__content"></span>
              Не важно
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="filters__category color">
        <h3 class="color__heading filters__subheading heading-reset"
            @click="toggleListOpen"
            @keydown.space="toggleListOpen"
        >
          Цвет
        </h3>
        <ul class="color__list filter-list list-reset">
          <li class="color__item filters__item" v-for="color in getColors" :key="color.id">
            <label class="custom-checkbox" :for="color.slug">
              <input class="custom-checkbox__field agreement-checkbox visually-hidden"
                     type="checkbox"
                     name="color"
                     :value="color.slug"
                     :id="color.slug"
                     v-model="currentColorSlug"
                     @change="saveFilterToQueryParams(currentColorSlug ,'colors')"
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
    subcategories: {
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
    colors: {
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

  data() {
    return {
      prices: [this.priceFrom, this.priceTo],
      currentCategorySlug: this.subcategories,
      currentDiscount: this.discount,
      currentColorSlug: this.colors,
      isOpenSubcategories: false,
    };
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

    saveFilterToQueryParams(value, key) {
      let strValue = value;

      if (Array.isArray(value)) {
        strValue = value.join(' ');
      }

      const url = new URL(window.location);
      url.searchParams.set(key, strValue);
      window.history.pushState({}, '', url);

      this.$emit('update:subcategories', this.currentCategorySlug);
      this.$emit('update:discount', +this.currentDiscount);
      this.$emit('update:colors', this.currentColorSlug);
    },

    toggleListOpen(evt) {
      evt.target.classList.toggle('list-open');
    },
  },

  watch: {
    prices(newValue, oldValue) {
      if (newValue[0] !== oldValue[0]) {
        this.$emit('update:priceFrom', this.prices[0]);
        this.saveFilterToQueryParams(this.prices[0], 'priceFrom');
      }

      if (newValue[1] !== oldValue[1]) {
        this.$emit('update:priceTo', this.prices[1]);
        this.saveFilterToQueryParams(this.prices[1], 'priceTo');
      }
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

    @include tablet {
      display: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      margin-bottom: 0;
    }

    &--tablet {
      display: none;

      @include tablet {
        display: block;
        margin-right: 43px;
      }
    }
  }

  & fieldset {
    padding: 0;
    border: none;

    &:not(:last-child) {
      margin-bottom: 27px;

      @include tablet {
        margin: 0;
      }
    }

    @include tablet {
      max-width: 187px;
      margin: 0;
      width: 100%;
    }

    @include mobile {
      max-width: 140px;
    }
  }

  &__subheading {
    margin-bottom: 9px;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: var(--grey_shade);
    transition: color .3s ease-in-out,
                background-color .3s ease-in-out,
                border-color .3s ease-in-out;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      width: 7px;
      height: 7px;
      transform: translateY(-50%) rotate(45deg);
      border-bottom: 1px solid var(--primary);
      border-right: 1px solid var(--primary);
      display: none;
      transition: transform .3s ease-in-out;
    }

    @include tablet {
      position: relative;
      padding: 9px 15px;
      border-radius: 10px;
      font-weight: 400;
      background-color: var(--grey_light);
      border: 2px solid transparent;
      color: var(--black);
      margin: 0;
      z-index: 4;

      &::after {
        display: block;
      }
    }

    @include extra-tablet {
      z-index: 1;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }

  &__form {
    @include tablet {
      display: flex;
      gap: 32px;
      max-width: 843px;
      width: 100%;
    }

    @include extra-tablet {
      max-width: 100%;
      flex-wrap: wrap;
      gap: 16px 32px;
      justify-content: flex-start;
    }

    @include mobile {
      gap: 16px;
    }
  }

  &__range {
    @include tablet {
      display: none;
    }
  }
}

.price {
  position: relative;

  &__inputs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    @include tablet {
      flex-direction: column;
      gap: 12px;
      position: absolute;
      top: calc(100% - 18px);
      left: 0;
      width: 100%;
      background-color: var(--white);
      border-radius: 10px;
      z-index: 3;
      transition: height .3s ease-in-out, border-width .3s ease-in-out, padding .3s ease-in-out;
    }
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

.category {
  @include tablet {
    position: relative;
  }

  &__list {
    @include tablet {
      position: absolute;
      top: calc(100% - 18px);
      left: 0;
      width: 100%;
      padding: 0;
      height: 0;
      background-color: var(--white);
      border-radius: 10px;
      border: 0 solid var(--md_grey);
      z-index: 3;
      overflow: hidden;
      transition: height .3s ease-in-out, border-width .3s ease-in-out, padding .3s ease-in-out;
    }
  }
}

.discount {
  position: relative;

  &__list {
    @include tablet {
      position: absolute;
      top: calc(100% - 18px);
      left: 0;
      width: 100%;
      padding: 40px 13px 30px 30px;
      background-color: var(--white);
      border-radius: 10px;
      border: 1px solid var(--md_grey);
      z-index: 3;
    }
  }
}

.color {
  position: relative;
  z-index: 2;

  &__list {
    @include tablet {
      position: absolute;
      top: calc(100% - 18px);
      left: 0;
      width: 100%;
      padding: 40px 13px 30px 30px;
      background-color: var(--white);
      border-radius: 10px;
      border: 1px solid var(--md_grey);
      z-index: 3;
    }
  }
}

.list-open {
  border-color: var(--primary_shade);
  background-color: var(--white);

  &::after {
    transform: translateY(0%) rotate(225deg);
  }
}

.filter-list {
  transition: height .3s ease-in-out, border-width .3s ease-in-out, padding .3s ease-in-out;

  @include tablet {
    padding: 0;
    height: 0;
    border: 0 solid var(--md_grey);
    overflow: hidden;
  }
}

.list-open {
  z-index: 4;
}

.list-open + ul,
.list-open + div {
  padding: 40px 13px 30px 30px;
  height: fit-content;
  z-index: 3;

  @include mobile {
    padding: 40px 13px 30px 15px;
  }
}
</style>
