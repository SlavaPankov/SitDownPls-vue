<template>
  <section class="login">
    <div class="container login__container">
      <h1 class="heading-reset login__heading">
        Добро пожаловать
      </h1>
      <form class="login__form" @submit.prevent="submit">
        <base-form-text-input title="Логин:"
                              placeholder="Логин"
                              type="text"
                              name="login"
                              :error="formError.login"
                              v-model:value="formData.login"
        />
        <base-form-text-input title="Пароль:"
                              placeholder="Пароль"
                              type="password"
                              name="password"
                              :error="formError.password"
                              v-model:value="formData.password"
        />
        <span class="error" v-if="globalError">{{ globalError }}</span>
        <button class="btn-reset login__button">Войти</button>
      </form>
    </div>
  </section>
  <base-modal :open="authProceed">
    <base-spinner />
  </base-modal>
</template>

<script>
import BaseFormTextInput from '@/components/BaseFormTextInput';
import BaseModal from '@/components/BaseModal';
import BaseSpinner from '@/components/BaseSpinner';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { mapMutations } from 'vuex';
import { BASE_URL } from '@/api/config';

export default {
  name: 'LogInView',
  components: {
    BaseFormTextInput,
    BaseModal,
    BaseSpinner,
  },

  data() {
    return {
      formData: {},
      formError: {},
      globalError: '',
      authProceed: false,
    };
  },

  methods: {
    ...mapMutations(['updateRememberToken']),

    submit() {
      this.globalError = '';
      this.authProceed = true;

      if (Object.entries(this.formData).length === 0) {
        this.globalError = 'Неверный логин или пароль';
        this.authProceed = false;
        return;
      }

      axios.post(`${BASE_URL}/api/login`, {
        ...this.formData,
      }).then((response) => {
        if (response.data.error === null) {
          this.updateRememberToken(response.data.payload);
          localStorage.setItem('rememberToken', response.data.payload);

          setTimeout(() => {
            this.authProceed = false;
            this.$router.push({ name: 'personal' });
          }, 300);
        } else {
          this.globalError = response.data.error;
        }
      });
    },
  },

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.login {
  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
    max-width: 100%;
    width: 50%;
  }

  &__heading {
    margin-bottom: 26px;
    font-size: 36px;
    line-height: 36px;
    font-weight: 400;
    color: var(--black);
  }

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
</style>
