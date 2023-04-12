<template>
  <!--  eslint-disable-next-line -->
  <label class="order-form__label" :for="forId">
    <span>{{ title }}</span>
    <slot />
    <span class="order-form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',
  props: {
    title: {
      type: String,
      default: 'Заголовок',
    },
    error: {
      type: String,
    },
    forId: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.order-form {
  &__label {
    width: 100%;
    max-width: 100%;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--black);

    & span {
      padding-left: 8px;
      display: block;
      margin-bottom: 5px;
    }

    &--phone {
      max-width: calc(50% - 15px);
    }

    &--email {
      max-width: 50%;
    }
  }

  &__error {
    display: block;
    margin-top: 10px;
    margin-bottom: 0 !important;
    font-size: 12px;
    line-height: 100%;
    font-weight: 400;
    color: var(--red_input);
  }
}
</style>
