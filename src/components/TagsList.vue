<template>
  <ul class="list-reset tags">
    <li class="tags__item" v-for="tag in currentTags" :key="tag.id">
      <filter-tag :title="tag.title" :mode="tag.mode" :id="tag.id" @delete="deleteTag" />
    </li>
  </ul>
</template>

<script>
import FilterTag from '@/components/FilterTag';

export default {
  name: 'TagsList',
  components: {
    FilterTag,
  },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentTags: this.tags,
    };
  },

  methods: {
    deleteTag(evt) {
      if (evt) {
        // eslint-disable-next-line max-len
        this.currentTags.splice(this.currentTags.indexOf(this.currentTags.find((a) => a.id === evt)), 1);
        this.$emit('update:tags', this.currentTags);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
