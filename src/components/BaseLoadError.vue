<template>
  <section class="error-load">
    <svg class="error-load__icon">
      <use xlink:href="@/assets/img/sprite.svg#elephant"></use>
    </svg>
    <p class="error-load__text">
      Что-то пошло не так
    </p>
    <button class="error-load__button" @click.prevent="callback">
      Повторить
    </button>
  </section>
</template>

<script>
export default {
  name: 'BaseLoadError',
  props: {
    callback: {
      type: Function,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.error-load {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;

  &__icon {
    width: 161px;
    height: 112px;
    fill: var(--primary);
  }

  &__text {
    font-size: 24px;
    line-height: 130%;
    font-weight: 700;
    color: var(--primary);
  }

  &__button {
    @include btn-primary;
  }
}
</style>
