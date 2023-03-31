<template>
  <article class="useful__card useful-card">
    <picture>
      <img loading="lazy"
           src="../../assets/img/1-useful.jpg"
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
import './styles.scss';

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
