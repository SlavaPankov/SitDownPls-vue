<template>
  <section class="order">
    <div class="container order__container">
      <h1 class="heading-reset">
        Оформление заказа
      </h1>
      <form action="">
        <label for="surName">
          <input type="text" name="surName" id="surName" placeholder="Фамилия">
        </label>
        <label for="name">
          <input type="text" name="name" id="name" placeholder="Имя">
        </label>
        <label for="middleName">
          <input type="text" name="middleName" id="middleName" placeholder="Отчество">
        </label>
        <label for="phone">
          <input type="tel" name="phone" id="phone" placeholder="Телефон">
        </label>
        <label for="email">
          <input type="email" name="email" id="email" placeholder="Email">
        </label>
        <label for="address">
          <input name="address" id="address" placeholder="Адрес доставки">
        </label>
        <button type="submit">Оформить заказ</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OrderView',

  computed: {
    ...mapGetters(['']),
  },
};
</script>

<style scoped>

</style>
