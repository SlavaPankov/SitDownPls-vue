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
import './styles.scss';

export default {
  name: 'BaseCallback',
};
</script>
