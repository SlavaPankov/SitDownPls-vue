<template>
  <form class="auth__form" @submit.prevent="submit">
    <base-form-text-input title="Email:"
                          placeholder="Email"
                          type="text"
                          name="login"
                          :error="formError.login"
                          v-model:value="currentFormData.login"
    />
    <base-form-text-input title="Пароль:"
                          placeholder="Пароль"
                          type="password"
                          name="password"
                          :error="formError.password"
                          v-model:value="currentFormData.password"
    />
    <span class="error" v-if="currentGlobalError">{{ currentGlobalError }}</span>
    <button class="btn-reset auth__button">Войти</button>
  </form>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import BaseFormTextInput from '@/components/BaseFormTextInput';

export default {
  name: 'AuthForm',
  components: {
    BaseFormTextInput,
  },

  props: {
    success: {
      type: Boolean,
      required: true,
    },

    formData: {
      type: Object,
      required: true,
    },

    globalError: {
      type: String,
      default: '',
    },
  },

  watch: {
    globalError(newValue) {
      this.currentGlobalError = newValue;
    },
  },

  data() {
    return {
      currentFormData: this.formData,
      currentGlobalError: this.globalError,
      formError: {},
    };
  },

  methods: {
    submit() {
      this.currentGlobalError = '';
      this.formError = {};

      if (Object.entries(this.currentFormData).length === 0) {
        this.currentGlobalError = 'Неверный логин или пароль';
        this.$emit('update:globalError', this.currentGlobalError);
        return;
      }

      if (!this.currentFormData.password) {
        this.formError.password = 'Укажите пароль';
        return;
      }

      if (!this.currentFormData.login) {
        this.formError.login = 'Укажите email';
        return;
      }

      this.$emit('update:success', true);
      this.$emit('update:formData', this.currentFormData);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.auth {
  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  &__button {
    @include btn-primary;
    margin-top: 9px;
  }
}

.error {
  font-size: 14px;
  line-height: 120%;
  color: var(--red_input);
}
</style>
