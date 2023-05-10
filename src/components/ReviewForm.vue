<template>
  <form class="review-form" @submit.prevent="submit">
    <h2 class="heading-reset review-form__heading">
      Ваш отзыв
    </h2>
    <div class="review-form__user">
      <base-form-text-input class="review-form__input"
                            title="Имя"
                            :value="name"
                            v-if="name"
                            :disabled="true"
      />
      <base-form-text-input class="review-form__input"
                            title="Фамилия"
                            :value="surName"
                            v-if="surName"
                            :disabled="true"
      />
    </div>
    <base-form-text-input class="review-form__input"
                          title="Преимущества"
                          v-model:value="currentFormData.advantages"
                          @input="handlerInput"
    />
    <base-form-text-input class="review-form__input"
                          title="Недостатки"
                          v-model:value="currentFormData.disadvantages"
                          @input="handlerInput"
    />
    <base-form-text-area class="review-form__input"
                         title="Комментарий"
                         :resize="false"
                         v-model:value="currentFormData.comment"
                         @input="handlerInput"
    />
    <button class="btn-reset review-form__button">
      Оставить отзыв
    </button>
  </form>
</template>

<script>
import BaseFormTextInput from '@/components/BaseFormTextInput';
import BaseFormTextArea from '@/components/BaseFormTextArea';

export default {
  name: 'ReviewForm',
  components: {
    BaseFormTextArea,
    BaseFormTextInput,
  },

  props: {
    name: {
      type: String,
    },

    surName: {
      type: String,
    },

    formData: {
      type: Object,
    },

    success: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      currentFormData: {
        ...this.formData,
      },
      errorData: {},
    };
  },

  methods: {
    submit() {
      this.$emit('update:success', true);
    },

    handlerInput() {
      this.$emit('update:formData', this.currentFormData);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.review-form {
  max-width: 750px;
  width: 100%;
  padding: 25px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  &__heading {
    @include h2;
    margin-bottom: 26px;
  }

  &__input {
    margin-bottom: 15px;
  }

  &__button {
    @include btn-primary;
    max-width: fit-content;
    margin-left: auto;
    margin-top: 11px;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 26px;
  }
}
</style>
