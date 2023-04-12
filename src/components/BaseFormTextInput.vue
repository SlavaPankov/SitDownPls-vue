<template>
  <base-form-field :for-id="name" :title="title" :error="error">
    <!--  eslint-disable-next-line  -->
    <input class="input-reset order-form__input"
           v-if="type !== 'tel'"
           :type="type"
           :name="name"
           :id="name"
           :required="require"
           :placeholder="placeholder"
           v-model="currentValue"
    >
    <!--  eslint-disable-next-line  -->
    <input class="input-reset order-form__input"
           v-if="type === 'tel'"
           :type="type"
           :name="name"
           :id="name"
           :placeholder="placeholder"
           :required="require"
           v-mask="'+7 (###)-###-##-##'"
           v-model="currentValue"
    >
  </base-form-field>
</template>

<script>
import BaseFormField from '@/components/BaseFormField';
import formFieldMixin from '@/mixins/formFieldMixin';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mask } from 'vue-the-mask';

export default {
  name: 'BaseFormTextInput',
  components: { BaseFormField },
  directives: { mask },
  props: {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    require: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.order-form {
  &__input {
    @include input-primary;
  }
}
</style>
