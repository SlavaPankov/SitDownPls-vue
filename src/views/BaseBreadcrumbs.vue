<template>
  <section class="breadcrumbs">
    <div class="container breadcrumbs__container">
      <ul class="list-reset breadcrumbs__list breadcrumbs-list">
        <li class="breadcrumbs-list__item" v-for="(crumb, index) in breadcrumbsList" :key="index">
          <router-link v-if="!crumb.current"
             :to="crumb.link"
             class="breadcrumbs-list__link"
             :class="{ 'breadcrumbs-list__link--current': crumb.current }"
          >
            {{ crumb.label }}
          </router-link>
          <span v-if="crumb.current"
             class="breadcrumbs-list__link"
             :class="{ 'breadcrumbs-list__link--current': crumb.current }"
          >
            {{ crumb.label }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseBreadcrumbs',

  computed: {
    breadcrumbsList() {
      return this.$breadcrumbs.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__container {
    padding-bottom: 35px;
  }
}

.breadcrumbs-list {
  display: flex;
  align-items: center;

  &__item {
    position: relative;

    &:not(:last-child) {
      padding-right: 6px;
      margin-right: 6px;

      &::after {
        content: '/';
        position: relative;
        right: -6px;
        font-size: 14px;
        line-height: 100%;
        color: var(--grey);
      }
    }
  }

  &__link {
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: var(--grey);
    transition: color .3s ease-in-out;

    &:hover {
      color: var(--primary_light);
    }

    &--current {
      color: var(--primary_shade);

      &:hover {
        color: var(--primary_shade);
      }
    }
  }
}
</style>
