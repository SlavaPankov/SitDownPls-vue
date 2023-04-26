<template>
  <ul class="header__personals personals-list list-reset">
    <li class="personals-list__item">
      <button @click.prevent="navigation" class="personals-list__link btn-reset">
        <svg class="personals-list__icon">
          <use xlink:href="../assets/img/sprite.svg#person"></use>
        </svg>
      </button>
    </li>
    <li class="personals-list__item">
      <cart-icon />
    </li>
  </ul>
</template>

<script>
import CartIcon from '@/components/CartIcon';
import { mapGetters } from 'vuex';

export default {
  name: 'PersonalList',
  components: { CartIcon },

  methods: {
    navigation() {
      if (this.rememberToken === '') {
        this.$router.push({ name: 'auth' });
      } else {
        this.$router.push({ name: 'personal' });
      }
    },
  },

  computed: {
    ...mapGetters({
      rememberToken: 'getRememberToken',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.personals-list {
  display: flex;
  margin-left: auto;

  @include extra-tablet {
    margin: 0;
  }

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
