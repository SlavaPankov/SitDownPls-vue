<template>
  <ul class="list-reset paginate-list">
    <li class="paginate-list__item paginate-bw">
      <button
        class="btn-reset paginate-list__button paginate-list__button--bw"
        :disabled="currentPage === 1"
        @click.prevent="saveCurrentPage(paginationBackward)"
      >
      </button>
    </li>
    <li class="paginate-list__item" v-for="page in pages" :key="page">
      <button
        class="btn-reset paginate-list__button"
        :class="page === +this.currentPage ? 'paginate-list__button--current' : ''"
        @click.prevent="saveCurrentPage(page)"
      >
        {{ page }}
      </button>
    </li>
    <li class="paginate-list__item paginate-fw">
      <button
        class="btn-reset paginate-list__button paginate-list__button--fw"
        :disabled="currentPage >= pages"
        @click.prevent="saveCurrentPage(paginationForward)"
      >
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BasePagination',

  props: {
    currentPage: {
      required: true,
      type: Number,
    },
    countPerPage: {
      required: true,
      type: Number,
    },
    totalCount: {
      required: true,
      type: Number,
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.totalCount / this.countPerPage);
    },

    paginationForward() {
      return this.currentPage >= this.pages ? +this.currentPage : +this.currentPage + 1;
    },

    paginationBackward() {
      return this.currentPage === 1 ? +this.currentPage : +this.currentPage - 1;
    },
  },

  methods: {
    saveCurrentPage(page) {
      this.$emit('update:currentPage', page);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginate-list {
  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--primary);
    border-radius: 10px;
    font-size: 16px;
    line-height: 100%;
    font-weight: 600;
    color: var(--primary);
    transition: color .3s ease-in-out,
      border-color .3s ease-in-out,
      background-color .3s ease-in-out;

    &--current {
      color: var(--white);
      border-color: var(--primary_shade);
      background-color: var(--primary_shade);
    }

    &--fw,
    &--bw {
      position: relative;

      &::after {
        content: '';
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 48%;
        border-bottom: 2px solid var(--primary);
        border-right: 2px solid var(--primary);
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: border-color .3s ease-in-out;
      }
    }

    &--bw {
      &::after {
        left: 58%;
        transform: translate(-50%, -50%) rotate(135deg);
      }
    }

    &:hover {
      background-color: var(--primary);
      color: var(--white);

      &::after {
        border-color: var(--white);
      }
    }

    &:disabled {
      border-color: var(--grey);
      color: var(--grey);

      &:hover {
        background-color: var(--white);
      }

      &::after {
        border-color: var(--grey);
      }
    }
  }
}
</style>
