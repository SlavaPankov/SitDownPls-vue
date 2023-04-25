<template>
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
</template>

<script>
export default {
  name: 'TopNav',
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.top-nav {
  margin-left: auto;

  @include big-desktop {
    margin-left: 0;
  }

  @include extra-tablet {
    width: 100%;
  }

  @include extra-mobile {
    background: var(--grey_light);
    padding: 24px 72px;
  }

  @include mobile {
    padding: 24px 12px;
  }

  &__list {
    display: flex;
    align-items: center;

    @include extra-tablet {
      justify-content: space-between;
    }

    @include extra-mobile {
      align-items: flex-start;
      flex-wrap: wrap;
      row-gap: 12px;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-right: 64px;

      @include extra-tablet {
        margin-right: 0;
      }
    }

    @include extra-mobile {
      flex-basis: 50%;
    }

    &:nth-child(2n + 2) {
      @include extra-mobile {
        text-align: right;
      }
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
