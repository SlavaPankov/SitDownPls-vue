<template>
  <article class="tag"
           :class="{
              subcategories: mode === 'subcategories',
              price: mode === 'price',
              discount: mode === 'discount',
              color: mode === 'color',
           }"
  >
    <span class="tag__title">
      {{ title }}
    </span>
    <button class="btn-reset"
            @click.prevent="this.$emit('delete', id)"
    >
      <svg class="tag__cross">
        <use xlink:href="@/assets/img/sprite.svg#cross"></use>
      </svg>
    </button>
  </article>
</template>

<script>
export default {
  name: 'FilterTag',
  props: {
    title: {
      type: String,
    },

    mode: {
      type: String,
    },

    id: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  padding: 5.5px 9px;
  display: flex;
  align-items: center;
  gap: 9.4px;
  border-radius: 3px;

  &__title {
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: var(--grey_shade);
  }

  &__cross {
    width: 7px;
    height: 7px;
    fill: var(--grey_shade);
    cursor: pointer;
  }
}

.subcategories {
  background-color: var(--lime_color);;
}

.price {
  background-color: var(--bone);
}

.discount {
  background-color: var(--pink_violet);
}

.color {
  background-color: var(--md_grey);
}
</style>
