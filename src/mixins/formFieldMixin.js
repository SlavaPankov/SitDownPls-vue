import BaseFormField from '@/components/BaseFormField';

export default {
  components: { BaseFormField },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    currentValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
};
