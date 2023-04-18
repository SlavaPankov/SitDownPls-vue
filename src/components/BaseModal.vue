<template>
  <div class="modal"
       v-if="open"
       @click="close"
       @keydown.esc="close"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    open: {
      required: true,
      type: Boolean,
    },
  },

  watch: {
    open() {
      if (this.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  },

  methods: {
    close(event) {
      if (event.target === document.querySelector('.modal')) {
        document.body.style.overflow = 'auto';
        this.$emit('update:open', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
  background-color: rgba(51, 51, 51, .3);
  animation: open .3s ease-in-out;
}

@keyframes open {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
