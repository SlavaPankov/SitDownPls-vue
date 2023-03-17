<template>
  <header class="header">
    <router-link class="header__logo logo" :to="{ name: 'home' }">
      <picture>
        <source srcset="../assets/logo.webp" type="image/webp">
        <img src="../assets/logo.png"
             loading="lazy"
             class="image"
             width="182"
             height="27"
             alt="Логотип">
      </picture>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>

<style scoped>

</style>
