<template>
  <router-link :to="{ name: 'cart' }" class="personals-list__link basket-link">
    <span class="basket-link__count">{{ getCountProductsBasket }}</span>
    <svg class="personals-list__icon">
      <use xlink:href="@/assets/img/sprite.svg#basket"></use>
    </svg>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartIcon',

  computed: {
    ...mapGetters(['getCountProductsBasket']),
  },
};
</script>

<style lang="scss" scoped>
.personals-list {
  display: flex;
  margin-left: auto;

  &__item {
    &:not(:last-child) {
      margin-right: 28px;
    }
  }

  &__link {
    position: relative;
    display: block;

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
  }

  &__link:hover &__icon {
    fill: var(--primary_light);
  }

  &__link:focus {
    outline: none;
  }

  &__link:focus::after {
    background-color: var(--primary_light);
  }

  &__link:focus &__icon {
    fill: var(--white);
  }

  &__link:active &__icon {
    fill: var(--primary_shade);
  }

  &__link:active::after {
    background-color: transparent;
  }

  &__icon {
    display: block;
    width: 26px;
    height: 28px;
    fill: var(--primary);
    transition: fill .3s ease-in-out;
  }
}

.basket-link {
  position: relative;
  padding-left: 15px;

  &__count {
    position: absolute;
    top: 52%;
    left: 0;
    transform: translateY(-70%);
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    line-height: 10px;
    font-weight: 400;
    color: var(--white);
    background-color: var(--secondary);
    border-radius: 100%;
  }
}
</style>
