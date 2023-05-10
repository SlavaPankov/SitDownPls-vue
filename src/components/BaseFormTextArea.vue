<template>
  <base-form-field :for-id="name" :title="title" :error="error">
    <!--  eslint-disable-next-line  -->
    <textarea class="input-reset textarea"
              :class="{ 'no-resize': !resize }"
              :name="name"
              :id="name"
              :required="require"
              :disabled="disabled"
              :placeholder="placeholder"
              v-model="currentValue"
    />
  </base-form-field>
</template>

<script>
import BaseFormField from '@/components/BaseFormField';
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormTextArea',
  components: { BaseFormField },
  props: {
    name: {
      type: String,
    },
    require: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.textarea {
  @include input-primary;
}

.no-resize {
  resize: none;
}
</style>
