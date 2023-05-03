<template>
  <section class="contacts" v-if="stores.length !== 0">
    <div class="container contacts__container">
      <h1 class="contacts__heading heading-reset">
        Контакты
      </h1>
      <form action="" class="contacts__form search-store" @submit.prevent="search">
        <base-form-text-input class="search-store__input"
                              placeholder="Поиск магазина"
                              type="text"
                              name="store"
                              :error="formError.store"
                              v-model:value="formData.store"
                              @input="showHints"
        />
        <ul class="list-reset matches-list" v-if="isOpenMatchesList">
          <li class="matches-list__item"
              v-for="store in matchesList"
              :key="store.id"
              @click="handlerMatchClick"
              @keydown.space="handlerMatchClick"
          >
            {{ store.name }}
          </li>
        </ul>
        <button class="search-store__button" type="submit">Поиск</button>
      </form>
      <yandex-map
        ref="map"
        :coords="mapCenter"
        :zoom="zoom"
        style="width: 100%; height: 728px"
        :behaviors="['default']"
        v-if="!isEmptySearch"
        class="contacts__map"
      >
        <ymap-marker v-for="store in stores"
                     :key="store.id"
                     :marker-id="store.id"
                     marker-type="placemark"
                     :coords="[store.lat, store.long]"
                     :icon="{
                       layout: 'default#image',
                       imageHref: iconPath,
                       imageSize: [32, 21],
                     }"
                     :options="{
                        hideIconOnBalloonOpen: false,
                     }"
                     :balloon-template="balloonTemplate(store)"
        />
      </yandex-map>
      <div class="contacts__empty" v-if="isEmptySearch">
        <svg class="contacts__empty-icon">
            <use xlink:href="@/assets/img/sprite.svg#elephant"></use>
        </svg>
        <h2 class="contacts__empty-heading heading-reset">
          По вашему запросу ничего не нашлось
        </h2>
      </div>
    </div>
  </section>
  <base-spinner v-if="stores.length === 0"/>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { BASE_URL } from '@/api/config';
import BaseSpinner from '@/components/BaseSpinner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import elephant from '@/assets/img/svg/elephant-secondary.svg';
import sprite from '@/assets/img/sprite.svg';
import BaseFormTextInput from '@/components/BaseFormTextInput';

export default {
  name: 'ContactsView',
  components: {
    BaseFormTextInput,
    BaseSpinner,
    yandexMap,
    ymapMarker,
  },

  data() {
    return {
      stores: [],
      iconPath: elephant,
      mapCenter: [55.75399399999374, 37.62209300000001],
      zoom: 13,
      formData: {},
      formError: {},
      matchesList: [],
      isOpenMatchesList: false,
      isEmptySearch: false,
    };
  },

  methods: {
    getStores() {
      return axios.get(`${BASE_URL}/api/stores`)
        .then((response) => {
          this.stores = response.data.payload;
        });
    },

    balloonTemplate(store) {
      const storeTypesName = [];
      store.store_types.forEach((type) => {
        storeTypesName.push(type.name.toLowerCase());
      });

      return `
        <div class="balloon">
          <h1 class="balloon__heading">${store.name} ${store.id}</h1>
          <address class="balloon__address">${store.address}</address>
          <a class="balloon__phone" href="tel:${store.phone}">
            <svg class="balloon__icon">
                <use xlink:href="${sprite}#phone"></use>
            </svg>
            ${store.phone}
          </a>
          <div class="balloon__open-hours">
            Часы работы: <span>${store.opening_hours}</span>
          </div>
          <div class="balloon__info">Что здесь: <span>${storeTypesName.join(', ')}</span></div>
        </div>
      `;
    },

    showHints() {
      const regPhrase = new RegExp(this.formData.store, 'i');
      this.matchesList = [];

      this.stores.forEach((store) => {
        if (regPhrase.test(store.name)) {
          this.matchesList.push(store);
        }
      });

      if (this.matchesList.length > 0) {
        this.isOpenMatchesList = true;
      }
    },

    search() {
      this.isEmptySearch = !this.findStoreByName(this.formData.store);
      this.isOpenMatchesList = false;

      if (!this.isEmptySearch) {
        this.handleBalloonOpen(this.findStoreByName(this.formData.store));
      }

      setTimeout(() => {
        this.isEmptySearch = false;
      }, 1000);
    },

    handlerMatchClick(evt) {
      this.formData.store = evt.target.textContent.trim();
      this.isOpenMatchesList = false;

      const store = this.findStoreByName(this.formData.store);
      this.mapCenter = [+store.lat, +store.long];
      this.handleBalloonOpen(store);
      this.zoom = 14;
    },

    findStoreByName(name) {
      return this.stores.find((item) => item.name === name);
    },

    handleBalloonOpen(store) {
      this.$refs.map.myMap.balloon.open([+store.lat, +store.long], this.balloonTemplate(store));
    },
  },

  created() {
    this.getStores();
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

  &__map {
    max-height: 510px;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 510px;
    background-color: var(--grey_light);
    gap: 30px;

    &-icon {
      width: 161px;
      height: 112px;
      opacity: 0.2;
      fill: var(--grey_shade);
    }

    &-heading {
      max-width: 276px;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 100%;
      text-align: center;
      color: var(--grey);
    }
  }
}

.balloon {
  padding: 30px;

  &__heaidng {
    margin-bottom: 7px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    color: var(--black);
  }

  &__address {
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: var(--black);
  }

  &__phone {
    display: flex;
    align-items: center;
    margin-bottom: 13px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: var(--secondary);
  }

  &__icon {
    width: 16.5px;
    height: 16.5px;
    margin-right: 3px;
    fill: var(--secondary);
  }

  &__open-hours {
    padding: 12px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: var(--grey);
    border-top: 1px solid var(--grey_light);
    border-bottom: 1px solid var(--grey_light);

    & span {
      color: var(--black);
    }
  }

  &__info {
    padding-top: 9px;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    color: var(--grey);

    & span {
      color: var(--black);
    }
  }
}

.search-store {
  position: relative;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  &__input {
    max-width: 624px !important;
    z-index: 6;

    @include mobile {
      max-width: 100% !important;
    }
  }

  &__button {
    @include btn-primary;
    padding: 18px 35px;
  }
}

.matches-list {
  position: absolute;
  top: calc(100% - 10px);
  left: 0;
  max-width: 624px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border: 1px solid var(--grey_light);
  border-radius: 0 0 10px 10px;
  background-color: var(--white);
  z-index: 5;

  &__item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color .3s ease-in-out;

    &:hover {
      background-color: var(--grey_light);
    }
  }
}

.ymaps-2-1-79-balloon__close+.ymaps-2-1-79-balloon__content {
  margin: 0;
  padding: 0;
}

.ymaps-2-1-79-balloon {
  border-radius: 10px;
  padding: 0;
}
</style>
