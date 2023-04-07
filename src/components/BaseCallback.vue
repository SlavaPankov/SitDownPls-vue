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
      <form class="callback__form callback-form" action="#" method="post">
        <label class="callback-form__label" for="name">
          <input class="input-reset callback-form__input callback-form__input--name" type="text"
                 name="name" id="name" placeholder="Как вас зовут?">
        </label>
        <label class="callback-form__label" for="phone">
          <input class="input-reset callback-form__input callback-form__input--phone" type="tel"
                 name="phone" id="phone" placeholder="Ваш телефон">
        </label>
        <label class="callback-form__label" for="email">
          <input class="input-reset callback-form__input callback-form__input--email" type="email"
                 name="email" id="email" placeholder="Ваш e-mail">
        </label>
        <input class="callback-form__button" type="submit" value="Отправить">
        <label class="callback-form__label agreement-label custom-checkbox" for="agreement">
          <input class="custom-checkbox__field agreement-checkbox visually-hidden" type="checkbox"
                 name="agreement" id="agreement">
          <span class="custom-checkbox__content"></span>
          Принимаю <a class="callback-form__link" href="#">пользовательское соглашение</a>
        </label>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseCallback',
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
    flex-direction: column-reverse;
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

.invalid {
  margin-bottom: 6px;
  padding-left: 18px;
  font-size: 12px;
  line-height: 16.34px;
  font-weight: 400;
  color: var(--red_input);
}
</style>
