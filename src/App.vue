<template>
  <main-header/>

  <router-view/>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { MainHeader },

  methods: {
    ...mapActions(['loadCategories']),
  },

  computed: {
    ...mapGetters(['getCategories']),
  },

  created() {
    if (this.getCategories.length === 0) {
      this.loadCategories();
    }
  },
};
</script>
