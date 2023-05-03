<template>
  <div class="empty">
    <svg class="empty__icon">
      <use xlink:href="@/assets/img/sprite.svg#elephant"></use>
    </svg>
    <h2 class="empty__heading heading-reset">
      По вашему запросу ничего не нашлось
    </h2>
  </div>
</template>

<script>
export default {
  name: 'BaseEmptyResult',
};
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 510px;
  background-color: var(--grey_light);
  gap: 30px;

  &__icon {
    width: 161px;
    height: 112px;
    opacity: 0.2;
    fill: var(--grey_shade);
  }

  &__heading {
    max-width: 276px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 100%;
    text-align: center;
    color: var(--grey);
  }
}
</style>
