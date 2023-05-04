<template>
  <section class="contacts">
    <div class="container contacts__container">
      <h1 class="contacts__heading heading-reset">
        Контакты
      </h1>
      <base-map :stores="getStores" />
    </div>
  </section>
</template>

<script>
import BaseMap from '@/components/BaseMap';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ContactsView',
  components: {
    BaseMap,
  },

  computed: {
    ...mapGetters(['getStores']),
  },

  methods: {
    ...mapActions(['loadStores']),
  },

  created() {
    if (this.getStores.length === 0) {
      this.loadStores();
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.contacts {
  &__container {
    padding-top: 35px;
    padding-bottom: 70px;
  }

  &__heading {
    @include h2;
    margin-bottom: 16px;
  }
}
</style>
