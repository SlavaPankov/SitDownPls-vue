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
        <nav class="header-top__nav top-nav nav" title="Навигация">
          <ul class="top-nav__list list-reset">
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">
                <span class="top-nav__text">
                  О компании
                </span>
              </a>
            </li>
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">
                <span class="top-nav__text">
                  Гарантия и возврат
                </span>
              </a>
            </li>
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">
                <span class="top-nav__text">
                  Корпоративным клиентам
                </span>
              </a>
            </li>
            <li class="top-nav__item">
              <a href="#" class="top-nav__link">
                <span class="top-nav__text">
                  Дизайн-решение
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="header__middle header-middle">
      <div class="container header-middle__container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officia?
      </div>
    </div>
    <div class="header__bottom header-bottom">
      <div class="container header-bottom__container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      isRegionOpen: false,
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
    };
  },

  methods: {
    regionDropdownOpen() {
      this.isRegionOpen = !this.isRegionOpen;
    },

    selectRegion(evt) {
      this.regionList.forEach((region) => {
        // eslint-disable-next-line no-param-reassign
        region.selected = region.name === evt.target.textContent.trim();
      });

      this.isRegionOpen = false;
    },
  },

  computed: {
    selectedRegion() {
      return this.regionList.filter((item) => item.selected)[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
}

.header-top {
  background-color: var(--grey_light);

  &__container {
    display: flex;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
  }
}

.header-middle {
  &__container {
    padding-top: 32px;
    padding-bottom: 32px;
  }
}

.header-bottom {
  &__container {
    padding-bottom: 32px;
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
  border: 2px solid var(--grey_light);
  background-color: var(--white);
  transition: padding .3s ease-in-out, height .3s ease-in-out;

  &--open {
    padding: 16px;
    height: fit-content;
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
  margin-left: auto;

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    &:not(:last-child) {
      margin-right: 64px;
    }
  }

  &__link {
    position: relative;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: var(--grey);
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
      color: var(--primary_shade);

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

}
</style>
