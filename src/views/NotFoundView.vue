<template>
  <div class="not-found">
    <h1>
      Страница не найдена
    </h1>
    <router-link :to="{ name: 'home' }">На главную</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
};
</script>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
