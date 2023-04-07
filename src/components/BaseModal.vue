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

  methods: {
    close(event) {
      if (event.target === document.querySelector('.modal')) {
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
}
</style>
