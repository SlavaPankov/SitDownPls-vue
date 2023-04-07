<template>
  <article class="useful__card useful-card">
    <picture>
      <img loading="lazy"
           src="../assets/img/1-useful.jpg"
           class="image"
           width="624"
           height="426"
           :alt="post.title">
    </picture>
    <div class="useful-card__content">
      <div class="useful-card__text">
        {{ post.preview_body }}
      </div>
      <a class="useful-card__link" href="#">
        Читать
      </a>
    </div>
  </article>
</template>

<script>
export default {
  name: 'UsefulCard',
  props: {
    post: {
      require: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_mixins.scss";

.useful-card {
  border-radius: 10px;
  background-color: var(--grey_light);

  & .image {
    display: block;
  }

  &__content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 31px 27px 28px 30px;
    height: 250px;
  }

  &__text {
    font-size: 24px;
    line-height: 32.68px;
    font-weight: 400;
    color: var(--black);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__link {
    margin-top: auto;
    @include btn-secondary;
    padding: 19px 33.5px;
  }

}

</style>
