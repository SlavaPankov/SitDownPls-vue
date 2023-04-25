<template>
  <section class="callback">
    <div class="container callback__container">
      <h2 class="heading-reset callback__heading">
        Мы всегда вам рады!
      </h2>
      <div class="callback__text">
        Безусловно, новая модель организационной деятельности в значительной степени обусловливает
        важность распределения
        внутренних резервов и ресурсов.
        <span class="callback__tooltip"></span>
      </div>
      <form class="callback__form callback-form"
            @submit.prevent="submit"
            method="post"
      >
        <base-form-text-input placeholder="Как вас зовут?"
                              type="text"
                              class="callback-form__label"
                              :class=" {
                                'invalid': this.formError.name
                              }"
                              name="surName"
                              :require="true"
                              :error="formError.name"
                              v-model:value="formData.name"/>
        <base-form-text-input placeholder="Ваш телефон"
                              type="tel"
                              class="callback-form__label"
                              name="phone"
                              :require="true"
                              :error="formError.phone"
                              v-model:value="formData.phone"/>
        <base-form-text-input placeholder="Ваш e-mail"
                              type="text"
                              class="callback-form__label"
                              name="email"
                              :require="true"
                              :error="formError.email"
                              v-model:value="formData.email"/>
        <input class="callback-form__button" type="submit" value="Отправить">
        <label class="callback-form__label agreement-label custom-checkbox" for="agreement">
          <input class="custom-checkbox__field agreement-checkbox visually-hidden"
                 type="checkbox"
                 name="agreement"
                 id="agreement"
                 value="true"
                 v-model="formData.agreement"
          >
          <span class="custom-checkbox__content"></span>
          Принимаю <a class="callback-form__link" href="#">пользовательское соглашение</a>
        </label>
      </form>
    </div>
  </section>
  <base-modal :open="dataSending">
    <base-spinner v-if="dataSend" />
    <article v-if="sendSuccess" class="callback-success">
      <svg class="callback-success__icon">
          <use xlink:href="@/assets/img/sprite.svg#elephant"></use>
      </svg>
      <h2 class="heading-reset callback-success__heading">
        Спасибо, мы вам перезвоним!
      </h2>
    </article>
  </base-modal>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { BASE_URL } from '@/api/config';
import BaseFormTextInput from '@/components/BaseFormTextInput';
import BaseSpinner from '@/components/BaseSpinner';
import BaseModal from '@/components/BaseModal';

export default {
  name: 'BaseCallback',

  components: {
    BaseFormTextInput,
    BaseModal,
    BaseSpinner,
  },

  data() {
    return {
      formData: {},
      formError: {},
      dataSending: false,
      dataSend: false,
      sendSuccess: false,
    };
  },

  methods: {
    submit() {
      this.formError = {};

      this.formError.name = this.checkLength(this.formData.name.length)
        || this.isValidTextInput(this.formData.name);
      this.formError.phone = this.checkPhoneLength(this.formData.phone.length);

      Object.keys(this.formError).forEach((key) => {
        if (this.formError[key] === undefined) {
          delete this.formError[key];
        }
      });

      if (Object.entries(this.formError).length === 0) {
        this.dataSend = true;
        this.dataSending = true;

        axios.post(`${BASE_URL}/api/callback`, {
          ...this.formData,
        }).then((response) => {
          if (response.data.error === null) {
            this.formData = {};
            this.dataSend = false;
            this.sendSuccess = true;

            setTimeout(() => {
              this.sendSuccess = false;
              this.dataSending = false;
            }, 1500);
          }
        });
      }
    },

    // eslint-disable-next-line consistent-return
    checkLength(value) {
      if (value < 3) {
        return 'Минимальная длина 3 символа';
      }

      if (value > 30) {
        return 'Максимальная длина 30 символов';
      }
    },

    // eslint-disable-next-line consistent-return
    checkPhoneLength(value) {
      if (value < 18) {
        return 'Некорректный формат';
      }
    },

    // eslint-disable-next-line consistent-return
    isValidTextInput(value) {
      if (!/^[а-я-]+$/i.test(value)) {
        return 'Неверный формат';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_mixins.scss";

.callback {

  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
    background: url('../assets/img/1-contacts.png') right 15px top 60px no-repeat transparent;
    background-size: 624px 383px;

    @include tablet {
      background:
        url('../assets/img/1-contacts-1024.png') right 38px top 112px no-repeat transparent;
      background-size: 514px 316px;
    }

    @include small-tablet {
      background:
        url('../assets/img/1-contacts-768.png') right 38px top 112px no-repeat transparent;
      background-size: 187px 444px;
    }
  }

  &__heading {
    margin-bottom: 10px;
    @include h2;

    @include tablet {
      margin-bottom: 9px;
    }
  }

  &__text {
    max-width: 624px;
    margin-bottom: 14.5px;
    font-size: 14px;
    line-height: 19.07px;
    font-weight: 400;
    color: var(--grey_shade);

    @include big-desktop {
      max-width: 50%;
    }

    @include tablet {
      max-width: 405px;
    }
  }
}

.callback-form {
  max-width: 624px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @include big-desktop {
    max-width: 50%;
  }

  @include tablet {
    max-width: 405px;
  }

  &__label {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 28.5px;
  }

  &__input {
    @include input-primary;
  }

  &__button {
    margin-bottom: 13.5px;
    @include btn-primary;
    padding: 17px 32px;
  }

  &__link {
    color: var(--primary);
    text-decoration: underline;
    padding-left: 4px;
  }
}

.agreement-label {
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  line-height: 19.07px;
  font-weight: 400;
  color: var(--black);
}

.custom-checkbox {
  @include custom-checkbox;
}

.callback-success {
  padding: 122px 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-radius: 10px;

  &__icon {
    margin-bottom: 32px;
    width: 172px;
    height: 117px;
    fill: var(--secondary);

    & path {
      opacity: 1;
    }
  }

  &__heading {
    font-size: 32px;
    line-height: 100%;
    font-weight: 400;
    color: var(--black);
  }
}
</style>
