<template>
  <section class="login">
    <div class="container login__container">
      <h1 class="heading-reset login__heading">
        Добро пожаловать
      </h1>
      <auth-form v-model:form-data="formData"
                 v-model:success="isSuccess"
                 v-model:global-error="globalError"
      />
    </div>
  </section>
  <base-modal :open="authProceed">
    <base-spinner />
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal';
import BaseSpinner from '@/components/BaseSpinner';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { mapMutations } from 'vuex';
import { BASE_URL } from '@/api/config';
import AuthForm from '@/components/AuthForm';

export default {
  name: 'LogInView',
  components: {
    BaseModal,
    BaseSpinner,
    AuthForm,
  },

  data() {
    return {
      formData: {},
      globalError: '',
      authProceed: false,
      isSuccess: false,
    };
  },

  methods: {
    ...mapMutations(['updateRememberToken']),

    auth() {
      this.authProceed = true;
      this.isSuccess = false;
      this.globalError = '';

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
          this.authProceed = false;
          this.globalError = response.data.error;
        }
      });
    },
  },

  watch: {
    isSuccess(newValue) {
      if (newValue) {
        this.auth();
      }
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

    @include small-tablet {
      width: 100%;
    }
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

.error {
  font-size: 14px;
  line-height: 120%;
  color: var(--red_input);
}
</style>
