<template>
  <ul class="list-reset star-list">
    <li class="star-list__item"
        v-for="index in starsLimit"
        :key="index"
        @click.prevent="handlerClick(index)"
        @keydown.space="handlerClick(index)"
        :data-value="index"
    >
      <svg class="star-list__icon star-list__icon--outline">
        <use xlink:href="@/assets/img/sprite.svg#rating-star-outline"></use>
      </svg>
    </li>
    <li class="star-list__item star-list__item--absolute" :style="starListStyle">
      <ul class="list-reset star-list">
        <li class="star-list__item"
            v-for="index in starsLimit"
            :key="index"
        >
          <svg class="star-list__icon">
            <use xlink:href="@/assets/img/sprite.svg#rating-star"></use>
          </svg>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      default: 0,
    },

    starsLimit: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      currentRating: this.rating,
    };
  },

  methods: {
    handlerClick(value) {
      this.currentRating = value;
      this.$emit('update:rating', value);
    },
  },

  computed: {
    starListWidth() {
      return (this.currentRating / this.starsLimit) * 100;
    },

    starListStyle() {
      return `width: ${this.starListWidth}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.star-list {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: fit-content;
  z-index: 5;

  &__item {
    position: relative;
    cursor: pointer;
    z-index: 3;

    &--absolute {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      overflow: hidden;
      z-index: 2;
    }
  }

  &__icon {
    width: 15px;
    height: 15px;
    fill: var(--secondary);

    &--outline {
      fill: none;
      stroke: var(--secondary);
    }
  }
}
</style>
