<template>
  <footer class="footer">
    <div class="footer__top footer-top">
      <div class="container footer-top__container">
        <div class="footer-top__left">
          <a href="#" class="logo footer-top__logo">
            <picture>
              <source srcset="../assets/img/logo.webp" type="image/webp">
              <img loading="lazy" src="../assets/img/logo.png" class="image" width="187" height="27"
                   alt="Логотип">
            </picture>
          </a>
          <ul class="list-reset socials-list">
            <li class="socials-list__item">
              <a href="#" class="socials-list__link">
                <span class="visually-hidden">Facebook</span>
                <svg class="socials-list__icon">
                  <use xlink:href="../assets/img/sprite.svg#fb"></use>
                </svg>
              </a>
            </li>
            <li class="socials-list__item">
              <a href="#" class="socials-list__link">
                <span class="visually-hidden">VK</span>
                <svg class="socials-list__icon">
                  <use xlink:href="../assets/img/sprite.svg#vk"></use>
                </svg>
              </a>
            </li>
            <li class="socials-list__item">
              <a href="#" class="socials-list__link">
                <span class="visually-hidden">Instagram</span>
                <svg class="socials-list__icon">
                  <use xlink:href="../assets/img/sprite.svg#inst"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-top__right">
          <div class="footer-top__about list-container">
            <div class="list-container__heading">
              О нас
            </div>
            <ul class="list-reset list-container__list right-list">
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  О компании
                </span>
                </a>
              </li>
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Блог
                </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-top__about list-container">
            <div class="list-container__heading">
              Услуги
            </div>
            <ul class="list-reset list-container__list right-list">
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Доставка
                </span>
                </a>
              </li>
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Рассрочка и кредит
                </span>
                </a>
              </li>
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Сборка и установка
                </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-top__about list-container">
            <div class="list-container__heading">
              Связь с нами
            </div>
            <ul class="list-reset list-container__list right-list">
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Обратная связь
                </span>
                </a>
              </li>
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Контакты
                </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-top__about list-container">
            <div class="list-container__heading">
              Сотрудничество
            </div>
            <ul class="list-reset list-container__list right-list">
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Поставщикам
                </span>
                </a>
              </li>
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Оптовикам
                </span>
                </a>
              </li>
              <li class="right-list__item">
                <a href="#" class="right-list__link">
                <span class="right-list__text">
                  Карьера
                </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copyright">SDP®</span> 2011-2021
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins.scss';

.footer-top {
  background-color: var(--md_grey);

  &__container {
    display: flex;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-right: 16px;

    @include tablet {
      padding-right: 38px;
    }

    @include extra-tablet {
      flex-direction: column;
    }

    @include small-tablet {
      padding-right: 72px;
    }
  }

  &__logo {
    display: block;
    margin-bottom: 27px;

    &:focus {
      outline: 2px solid var(--primary);
    }

    @include extra-tablet {
      margin-bottom: 0;
    }
  }

  &__right {
    margin-left: auto;
    display: flex;

    @include extra-tablet {
      margin-left: 0;
      justify-content: space-between;
    }
  }

  &__left {
    @include extra-tablet {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
  }
}

.socials-list {
  display: flex;
  align-items: center;

  &__item:not(:last-child) {
    margin-right: 20px;
  }

  &__icon {
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    fill: var(--grey);
    z-index: 2;
    transition: fill .3s ease-in-out;
  }

  &__link {
    display: block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      background-color: transparent;
      transition: background-color .3s ease-in-out;
      z-index: 1;
    }
  }

  &__link:hover &__icon {
    fill: var(--primary);
  }

  &__link:focus {
    outline: none;

    &::after {
      background-color: var(--pink_violet);
    }
  }

  &__link:focus &__icon {
    fill: white;
  }

  &__link:active {
    outline: none;
  }

  &__link:active &__icon {
    fill: var(--primary_shade);
  }
}

.list-container {
  padding-top: 2px;

  &:first-child {
    margin-right: 112px;

    @include big-desktop {
      margin-right: 120px;
    }

    @include tablet {
      margin-right: 75px;
    }

    @include small-tablet {
      margin-right: 39px;
    }
  }

  &:nth-child(2) {
    margin-right: 132px;

    @include big-desktop {
      margin-right: 120px;
    }

    @include tablet {
      margin-right: 95px;
    }

    @include small-tablet {
      margin-right: 39px;
    }
  }

  &:nth-child(3) {
    margin-right: 146px;

    @include big-desktop {
      margin-right: 120px;
    }

    @include tablet {
      margin-right: 109px;
    }

    @include small-tablet {
      margin-right: 39px;
    }
  }

  &__heading {
    margin-bottom: 4px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    color: var(--black);
  }
}

.right-list {
  display: flex;
  flex-direction: column;

  &__item:not(:last-child) {
    margin-bottom: 6px;
  }

  &__link {
    position: relative;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: var(--grey);
    transition: color .3s ease-in-out;

    &::after {
      content: '';
      position: absolute;
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      background-color: transparent;
      transition: background-color .3s ease-in-out;
      z-index: 1;
    }

    &:hover {
      color: var(--primary);
    }

    &:focus {
      outline: none;
      color: var(--primary_shade);

      &::after {
        background-color: var(--pink_violet);
      }
    }

    &:active {
      color: var(--primary_shade);

      &::after {
        background-color: transparent;
      }
    }
  }

  &__text {
    position: relative;
    z-index: 2;
  }
}

.footer {
  &__bottom {
    padding-top: 4px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 19.07px;
    font-weight: 400;
    color: var(--grey);
    background-color: var(--grey_light);
  }

  &__copyright {
    margin-right: 10px;
  }
}
</style>
