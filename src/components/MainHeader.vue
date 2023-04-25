<template>
  <header class="header">
    <div class="header__top header-top">
      <div class="container header-top__container">
        <div class="header-top__region region">
          Ваш регион:
          <span class="region__selected"
                :class="{ 'region__selected--open': isRegionOpen }"
                tabindex="0"
                @click="regionDropdownOpen"
                @keydown.space="regionDropdownOpen">
            <span class="region__selected-text">
              {{ selectedRegion.name }}
            </span>
          </span>
          <ul class="region__dropdown dropdown list-reset"
              :class="{ 'dropdown--open': isRegionOpen }">
            <li class="dropdown__item"
                v-for="region in regionList"
                :key="region.name"
                @click="selectRegion"
                @keydown.enter="selectRegion">
              {{ region.name }}
            </li>
          </ul>
        </div>
        <a class="header-top__phone-link phone-link" href="tel:84958854547">
          <svg class="phone-link__icon">
            <use xlink:href="../assets/img/sprite.svg#phone"></use>
          </svg>
          <span class="phone-link__number">
            +7 (495) 885-45-47
          </span>
        </a>
        <top-nav class="top-nav--1024"/>
      </div>
    </div>
    <div class="header__top header-top header-top--1024">
      <div class="container header-top__container">
        <router-link :to="{ name: 'home' }" class="header__logo logo logo--mobile">
          <picture>
            <source srcset="../assets/img/logo.webp" type="image/webp">
            <img loading="lazy"
                 src="../assets/img/logo.png"
                 class="image"
                 width="187"
                 height="27"
                 alt="Логотип">
          </picture>
        </router-link>
        <top-nav/>
        <personal-list/>
      </div>
    </div>
    <div class="header__middle header-middle">
      <div class="container header-middle__container">
        <button class="header__burger burger"
                aria-label="Открыть меню"
                @click.prevent="burgerOpen"
        >
          <span class="burger__line"></span>
        </button>
        <router-link :to="{ name: 'home' }" class="header__logo logo">
          <picture>
            <source srcset="../assets/img/logo.webp" type="image/webp">
            <img loading="lazy"
                 src="../assets/img/logo.png"
                 class="image"
                 width="187"
                 height="27"
                 alt="Логотип">
          </picture>
        </router-link>
        <nav class="nav header-middle__nav middle-nav"
             :class="{ open: burgerIsOpen }"
             title="Меню"
        >
          <svg class="middle-nav__icon" @click.prevent="burgerOpen" @keydown="burgerOpen">
            <use xlink:href="@/assets/img/sprite.svg#cross"></use>
          </svg>
          <ul class="middle-nav__list list-reset">
            <li class="middle-nav__item">
              <router-link :to="{ name: 'catalog' }" class="middle-nav__link">
                <span class="middle-nav__text">Каталог</span>
              </router-link>
            </li>
            <li class="middle-nav__item">
              <a href="#" class="middle-nav__link">
                <span class="middle-nav__text">Магазины</span>
              </a>
            </li>
            <li class="middle-nav__item">
              <a href="#" class="middle-nav__link">
                <span class="middle-nav__text">Шоу-рум</span>
              </a>
            </li>
            <li class="middle-nav__item">
              <a href="#" class="middle-nav__link">
                <span class="middle-nav__text">Доставка и оплата</span>
              </a>
            </li>
            <li class="middle-nav__item">
              <a href="#" class="middle-nav__link">
                <span class="middle-nav__text">Дисконт</span>
              </a>
            </li>
            <li class="middle-nav__item">
              <a href="#" class="middle-nav__link">
                <span class="middle-nav__text">Контакты</span>
              </a>
            </li>
          </ul>
          <top-nav class="top-nav--mobile" />
        </nav>
        <personal-list />
      </div>
    </div>
    <div class="header__bottom header-bottom">
      <div class="container header-bottom__container">
        <form class="header__form search-form" action="#" method="get">
          <label class="search-form__label" for="search">
            <input class="search-form__input input-reset"
                   type="text"
                   name="search"
                   id="search"
                   placeholder="Я хочу купить..."
                   @input=isWritten>
            <svg class="search-form__icon">
              <use xlink:href="../assets/img/sprite.svg#loupe"></use>
            </svg>
            <button class="search-form__button btn-reset" type="submit"></button>
          </label>
          <div class="search-form__dropdown categories">
            <div
              class="categories__selected"
              tabindex="0"
              @click="categoriesDropdownOpen"
              @keydown.space="categoriesDropdownOpen"
            >
              Категория
            </div>
            <ul class="list-reset categories__list categories-list"
                :class="{ 'categories-list--open': isCategoriesOpen }">
              <li class="categories-list__item"
                  v-for="category in categories"
                  :key="category.id"
                  :data-slug="category.slug"
                  tabindex="0">
                {{ category.name }}
              </li>
            </ul>
          </div>
        </form>
        <personal-list class="personals-list--1024"/>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import TopNav from '@/components/TopNav';
import PersonalList from '@/components/PersonalList';

export default {
  name: 'MainHeader',
  components: {
    TopNav,
    PersonalList,
  },
  data() {
    return {
      isRegionOpen: false,
      isCategoriesOpen: false,
      regionList: [{
        name: 'Москва',
        selected: true,
      }, {
        name: 'Казань',
        selected: false,
      }, {
        name: 'Уфа',
        selected: false,
      }, {
        name: 'Пермь',
        selected: false,
      }],
      burgerIsOpen: false,
    };
  },

  methods: {
    regionDropdownOpen() {
      this.isRegionOpen = !this.isRegionOpen;
    },

    categoriesDropdownOpen() {
      this.isCategoriesOpen = !this.isCategoriesOpen;
    },

    selectRegion(evt) {
      this.regionList.forEach((region) => {
        // eslint-disable-next-line no-param-reassign
        region.selected = region.name === evt.target.textContent.trim();
      });

      this.isRegionOpen = false;
    },

    isWritten(event) {
      event.target.classList.add('search-form__input--written');

      if (event.target.value === '') {
        event.target.classList.remove('search-form__input--written');
      }
    },

    burgerOpen() {
      this.burgerIsOpen = !this.burgerIsOpen;

      if (this.burgerIsOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  },

  computed: {
    ...mapGetters({
      categories: 'getCategories',
    }),

    selectedRegion() {
      return this.regionList.filter((item) => item.selected)[0];
    },
  },

  watch: {
    $route() {
      this.burgerIsOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.header {
  display: flex;
  flex-direction: column;

  &__logo {
    &:focus {
      outline: 2px solid var(--primary);
    }
  }
}

.header-top {
  background-color: var(--grey_light);

  @include big-desktop {
    background-color: transparent;
  }

  @include extra-mobile {
    order: 2;
  }

  &__container {
    display: flex;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;

    @include big-desktop {
      justify-content: space-between;
    }

    @include mobile {
      flex-wrap: wrap;
      row-gap: 18px;
    }
  }

  &--1024 {
    display: none;

    @include big-desktop {
      display: block;
      background-color: var(--grey_light);
    }

    @include extra-mobile {
      order: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & .personals-list {
      @include extra-tablet {
        display: none;
      }
    }

    & .top-nav {
      @include extra-mobile {
        display: none;
      }
    }
  }
}

.header-middle {
  @include extra-mobile {
    order: 3;
  }

  &__container {
    position: relative;
    padding-top: 32px;
    padding-bottom: 32px;
    display: flex;
    align-items: center;

    @include extra-tablet {
      justify-content: space-between;
    }
  }

  & .personals-list {
    display: none;

    @include extra-tablet {
      display: flex;
    }
  }
}

.header-bottom {
  @include extra-mobile {
    order: 4;
  }

  &__container {
    padding-bottom: 32px;
    display: flex;
    align-items: center;
  }
}

.region {
  position: relative;
  margin-right: 32px;

  &__selected {
    padding-right: 13px;
    position: relative;
    color: var(--primary);
    transition: color .3s ease-in-out;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -3px;
      width: calc(100% + 9px);
      height: calc(100% + 2px);
      background-color: transparent;
      transition: background-color .3s ease-in-out;
      z-index: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      width: 8px;
      height: 8px;
      transform: translateY(-70%) rotate(45deg);
      border-bottom: 1px solid var(--primary);
      border-right: 1px solid var(--primary);
      transition: transform .3s ease-in-out, border-color .3s ease-in-out;
      z-index: 2;
    }

    &--open {
      &::after {
        transform: translateY(-30%) rotate(225deg);
      }
    }

    &:hover {
      color: var(--primary_light);

      &::after {
        border-color: var(--primary_light);
      }
    }

    &:focus {
      outline: none;
      color: var(--primary_shade);

      &::after {
        border-color: var(--primary_shade);
      }

      &::before {
        background-color: var(--pink_violet);
      }
    }

    &:active {
      outline: none;
      color: var(--primary_shade);

      &::after {
        border-color: var(--primary_shade);
      }
    }

    &-text {
      position: relative;
      z-index: 2;
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: -8px;
  }
}

.dropdown {
  padding: 0;
  height: 0;
  overflow: hidden;
  border: 0 solid var(--grey_light);
  background-color: var(--white);
  transition: padding .3s ease-in-out, height .3s ease-in-out, border-width .3s ease-in-out;

  &--open {
    border-width: 2px;
    padding: 16px;
    height: fit-content;
    overflow: auto;
    z-index: 6;
  }

  &__item {
    font-size: 14px;
    line-height: 130%;
    font-weight: 400;
    color: var(--black);
    cursor: pointer;
    transition: color .3s ease-in-out;

    &:hover {
      color: var(--primary);
    }

    &:active {
      outline: none;
      color: var(--primary_shade);
    }

    &:not(:last-child) {
      margin-bottom: 11px;
    }
  }
}

.phone-link {
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -3px;
    width: calc(100% + 9px);
    height: calc(100% + 2px);
    background-color: transparent;
    transition: background-color .3s ease-in-out;
    z-index: 1;
  }

  &__icon {
    position: relative;
    width: 16.5px;
    height: 16.5px;
    margin-right: 3px;
    fill: var(--secondary);
    transition: fill .3s ease-in-out;
    z-index: 2;
  }

  &__number {
    position: relative;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: var(--secondary);
    transition: color .3s ease-in-out;
    z-index: 2;
  }

  &:hover &__icon {
    fill: var(--secondary_light);
  }

  &:hover &__number {
    color: var(--secondary_light);
  }

  &:focus {
    outline: none;

    &::after {
      background-color: var(--bone);
    }
  }

  &:focus &__icon {
    fill: var(--secondary);
  }

  &:focus &__number {
    color: var(--secondary)
  }

  &:active {
    &::after {
      background-color: transparent;
    }
  }

  &:active &__icon {
    fill: var(--secondary_shade);
  }

  &:active &__number {
    color: var(--secondary_shade);
  }
}

.top-nav {
  &--1024 {
    @include big-desktop {
      display: none;
    }
  }

  &--mobile {
    display: none;

    @include extra-mobile {
      display: block;
    }
  }
}

.personals-list--1024 {
  @include big-desktop {
    display: none !important;
  }
}

.middle-nav {
  margin-left: auto;
  max-width: 952px;
  width: 100%;

  @include big-desktop {
    max-width: 701px;
  }

  @include extra-tablet {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: 100%;
    transform: translateX(-101%);
    transition: transform .3s ease-in-out;
    padding: 24px 36px 60px;
    z-index: 5;
    background: url("@/assets/img/svg/elephant.svg")
                right 72px bottom 60px
                no-repeat
                var(--white);
    background-size: 161px 112px;
  }

  @include extra-mobile {
    padding: 12px 0 26px;
  }

  @include extra-mobile {
    padding: 12px 0 0;
    background: var(--white) none;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include extra-tablet {
      display: block;
      column-count: 2;
      max-width: 309px;
    }

    @include extra-tablet {
      padding: 0 72px 26px;
      max-width: 100%;
    }

    @include mobile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 41px;
      padding: 0 12px;
    }
  }

  &__item {
    &:not(:nth-child(3n)) {
      @include extra-tablet {
        margin-bottom: 41px;
      }

      @include mobile {
        margin: 0;
      }
    }
  }

  &__link {
    position: relative;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
    color: var(--black);
    transition: color .3s ease-in-out;

    &::after {
      content: '';
      position: absolute;
      top: -1px;
      left: -3px;
      width: calc(100% + 6px);
      height: calc(100% + 2px);
      background-color: transparent;
      transition: background-color .3s ease-in-out;
      z-index: 1;
    }

    &:hover {
      color: var(--primary);
    }

    &:focus {
      outline: none;
      color: var(--black);

      &::after {
        background-color: var(--pink_violet);
      }
    }

    &:active {
      color: var(--primary_shade);

      &::after {
        background-color: transparent;
      }
    }
  }

  &__text {
    position: relative;
    z-index: 2;
  }

  &__icon {
    display: none;
    width: 24px;
    height: 24px;
    margin-bottom: 34px;
    fill: var(--primary);

    @include extra-tablet {
      display: block;
    }

    @include extra-mobile {
      margin-bottom: 26px;
      margin-left: 72px;
    }

    @include mobile {
      margin-left: 12px;
    }
  }
}

.search-form {
  display: flex;
  max-width: 1061px;
  width: 100%;

  @include big-desktop {
    max-width: 100%;
  }

  @include mobile {
    flex-direction: column;
    gap: 16px;
  }

  &__label {
    position: relative;
    max-width: 761px;
    width: 100%;

    @include big-desktop {
      max-width: calc(100% - 300px);
    }

    @include extra-tablet {
      max-width: calc(100% - 189px);
    }

    @include mobile {
      max-width: 100%;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: 34px;
    transform: translateY(-50%);
    fill: var(--grey);
    transition: fill .3s ease-in-out;
  }

  &__input {
    width: 100%;
    height: 100%;
    padding: 18px 30px 18px 57px;
    background-color: var(--grey_light);
    border-radius: 10px 0 0 10px;
    border: 2px solid transparent;
    transition: background-color .3s ease-in-out, border-color .3s ease-in-out;
    font-size: 16px;
    line-height: 19.2px;
    color: var(--black);

    &::placeholder {
      font-size: 16px;
      line-height: 19.2px;
      font-weight: 400;
      color: var(--grey);
    }

    &:hover {
      background-color: var(--md_grey);
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      background-color: var(--pink_light);
    }

    &--written {
      background-color: var(--grey_light) !important;
      border-color: transparent !important;
    }

    &--written + svg {
      fill: var(--primary);
    }

    @include mobile {
      border-radius: 10px;
    }
  }

  &__button {
    @include arrow-round;
    @include arrow-round-right;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 32px;
  }
}

.categories {
  position: relative;
  max-width: 300px;
  width: 100%;

  @include extra-tablet {
    max-width: 189px;
  }

  @include mobile {
    max-width: 100%;
  }

  &__list {
    position: absolute;
    top: 80%;
    left: 0;
  }

  &__selected {
    position: relative;
    border: 2px solid var(--grey_light);
    border-radius: 0 10px 10px 0;
    padding: 17.5px 32px;
    cursor: pointer;
    background-color: var(--white);
    font-size: 16px;
    line-height: 21px;
    font-weight: 400;
    color: var(--primary);
    transition: border-color .3s ease-in-out, background-color .3s ease-in-out;
    z-index: 3;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 32px;
      transform: translateY(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      border-bottom: 1px solid var(--primary);
      border-right: 1px solid var(--primary);
      transition: transform .3s ease-in-out, border-color .3s ease-in-out;
    }

    &:hover {
      border-color: var(--primary)
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      background-color: var(--pink_light);
    }

    &:active {
      outline: none;
      background-color: var(--white);
      border-color: var(--primary_shade);
    }

    @include mobile {
      border-radius: 10px;
    }
  }
}

.categories-list {
  column-count: 2;
  width: 100%;
  height: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--white);
  border: 2px solid var(--grey_light);
  border-top: none;
  border-radius: 0 0 10px 10px;
  z-index: 2;
  transition: height .3s ease-in-out, padding .3s ease-in-out;

  &--open {
    height: 200px;
    padding: 30px 30px 23px;
  }

  &__item {
    position: relative;
    font-size: 16px;
    width: fit-content;
    line-height: 120%;
    font-weight: 400;
    color: var(--black);
    transition: color .3s ease-in-out;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      background-color: transparent;
      transition: background-color .3s ease-in-out;
      z-index: -1;
    }

    &:hover {
      color: var(--primary);
    }

    &:focus {
      outline: none;

      &::after {
        background-color: var(--pink_violet);
      }
    }

    &:active {
      color: var(--primary_shade);
    }

    &:not(:last-child) {
      margin-bottom: 11px;
    }
  }
}

.burger {
  @include burger;
  display: none;

  @include extra-tablet {
    display: block;
  }
}

.logo {
  @include extra-mobile {
    display: none;
  }

  &--mobile {
    display: none;

    @include extra-mobile {
      display: block;
    }
  }
}

.open {
  transform: none;

  @include extra-mobile {
    overflow: auto;
    height: fit-content;
  }
}
</style>
