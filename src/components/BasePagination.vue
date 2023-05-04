<template>
  <ul class="list-reset paginate-list">
    <li class="paginate-list__item paginate-bw">
      <button
        class="btn-reset paginate-list__button paginate-list__button--bw"
        :disabled="page === 1"
        @click.prevent="saveCurrentPage(paginationBackward)"
      >
      </button>
    </li>
    <li class="paginate-list__item">
      <button
        class="btn-reset paginate-list__button"
        :class="this.page === 1 ? 'paginate-list__button--current' : ''"
        @click.prevent="saveCurrentPage(1)"
      >
        1
      </button>
    </li>
    <li class="paginate-list__item"
        v-if="first"
    >
      <button
        class="btn-reset paginate-list__button"
        @click.prevent="saveCurrentPage(page - 3)"
      >
        ...
      </button>
    </li>
    <li class="paginate-list__item"
        v-for="page in pages - 2"
        :key="page"
        v-show="Math.abs(page - this.page) < 3"
    >
      <button
        class="btn-reset paginate-list__button"
        :class="page + 1 === +this.page ? 'paginate-list__button--current' : ''"
        @click.prevent="saveCurrentPage(page + 1)"
      >
        {{ page + 1 }}
      </button>
    </li>
    <li class="paginate-list__item"
        v-if="last"
    >
      <button
        class="btn-reset paginate-list__button"
        @click.prevent="saveCurrentPage(page + 3)"
      >
        ...
      </button>
    </li>
    <li class="paginate-list__item">
      <button
        class="btn-reset paginate-list__button"
        :class="this.page === pages ? 'paginate-list__button--current' : ''"
        @click.prevent="saveCurrentPage(pages)"
      >
        {{ pages }}
      </button>
    </li>
    <li class="paginate-list__item paginate-fw">
      <button
        class="btn-reset paginate-list__button paginate-list__button--fw"
        :disabled="page >= pages"
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
    page: {
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
      return this.page >= this.pages ? +this.page : +this.page + 1;
    },

    paginationBackward() {
      return this.page === 1 ? +this.page : +this.page - 1;
    },

    last() {
      return Math.abs(this.page - this.pages) > 3;
    },

    first() {
      return Math.abs(this.page - this.pages) < 10 && this.pages > 3;
    },
  },

  methods: {
    saveCurrentPage(page) {
      this.$emit('update:page', page);
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

.d-none {
  display: none;
}
</style>
