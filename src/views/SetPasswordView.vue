<template>
  <section class="set-password">
    <div class="container set-password__container">
      <h2 class="heading-reset set-password__heading">
        Новый пароль
      </h2>
      <form class="set-password__form password-form"
            @submit.prevent="submit">
        <base-form-text-input title="Пароль:"
                              placeholder="Пароль"
                              type="password"
                              name="password"
                              :require="true"
                              :error="formError.password"
                              v-model:value="formData.password"/>
        <base-form-text-input title="Подтвердите пароль:"
                              placeholder="Пароль"
                              type="password"
                              name="confirmPassword"
                              :require="true"
                              :error="formError.confirmPassword"
                              v-model:value="formData.confirmPassword"/>
        <span class="error" v-if="globalError.error">{{ globalError.error }}</span>
        <button class="btn-reset submit-button" type="submit">Сохранить пароль</button>
      </form>
    </div>
  </section>
  <base-modal :open="settingPassword">
    <base-spinner />
  </base-modal>
</template>

<script>
import BaseFormTextInput from '@/components/BaseFormTextInput';
import { mapGetters } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { BASE_URL } from '@/api/config';
import BaseModal from '@/components/BaseModal';
import BaseSpinner from '@/components/BaseSpinner';

export default {
  name: 'ResetPasswordView',
  components: {
    BaseSpinner,
    BaseFormTextInput,
    BaseModal,
  },

  data() {
    return {
      formData: {},
      formError: {},
      globalError: {},
      settingPassword: false,
    };
  },

  beforeRouteEnter(to) {
    if (!to.query.userAccessToken
      || to.query.userAccessToken === ''
      || to.query.userAccessToken.length !== 32) {
      window.location.href = '/';
    }
  },

  computed: {
    ...mapGetters(['getUserAccessToken']),
  },

  methods: {
    submit() {
      this.globalError = {};

      if (this.getUserAccessToken !== this.$route.query.userAccessToken) {
        this.$router.push({ name: 'home' });
      }

      if (Object.entries(this.formData).length === 0) {
        this.globalError.error = 'Заполните поля';
        return;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.globalError.error = 'Пароль не совпадает';
        return;
      }

      if (this.formData.password.length < 6) {
        this.globalError.error = 'Минимальная длина 6 символов';
        return;
      }

      this.settingPassword = true;

      axios.post(`${BASE_URL}/api/users/set-password`, {
        ...this.formData,
      }, {
        params: {
          userAccessToken: this.$route.query.userAccessToken,
        },
      })
        .then((response) => {
          if (response.data.error === null) {
            document.querySelector('.modal').classList.add('modal-close');
            setTimeout(() => {
              this.settingPassword = false;
              this.$router.push({ name: 'auth' });
            }, 300);
          } else {
            setTimeout(() => {
              this.settingPassword = false;
            }, 300);
            this.globalError.error = response.data.error;
          }
        });
    },
  },

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.set-password {
  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
  }

  &__heading {
    max-width: 50%;
    margin: 0 auto 26px;
    font-size: 36px;
    line-height: 36px;
    font-weight: 400;
  }
}

.password-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  max-width: 50%;
  width: 100%;
  margin: 0 auto;
}

.submit-button {
  @include btn-primary;
  margin-top: 9px;
}

.error {
  font-size: 14px;
  line-height: 130%;
  font-weight: 400;
  color: var(--red_input);
}

.modal-close {
  animation: close .3s ease-in-out;
}

@keyframes close {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
