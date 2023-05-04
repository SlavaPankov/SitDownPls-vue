<template>
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
    v-if="!isEmptySearch && stores.length !== 0"
    class="map"
  >
    <ymap-marker v-for="store in stores"
                 @click="onClick(store)"
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
  <base-spinner v-if="stores.length === 0"/>
  <base-empty-result v-if="isEmptySearch" />
</template>

<script>
import BaseFormTextInput from '@/components/BaseFormTextInput';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import sprite from '@/assets/img/sprite.svg';
import elephant from '@/assets/img/svg/elephant-secondary.svg';
import BaseEmptyResult from '@/components/BaseEmptyResult';
import BaseSpinner from '@/components/BaseSpinner';

export default {
  name: 'BaseMap',

  props: {
    stores: {
      type: Array,
    },

    chosenStore: {
      type: Object,
    },
  },

  components: {
    BaseEmptyResult,
    BaseFormTextInput,
    BaseSpinner,
    yandexMap,
    ymapMarker,
  },

  data() {
    return {
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
        this.$emit('update:chosenStore', this.findStoreByName(this.formData.store));
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
      this.$emit('update:chosenStore', store);
    },

    findStoreByName(name) {
      return this.stores.find((item) => item.name === name);
    },

    handleBalloonOpen(store) {
      this.$refs.map.myMap.balloon.open([+store.lat, +store.long], this.balloonTemplate(store));
    },

    onClick(store) {
      this.$emit('update:chosenStore', store);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.map {
  max-height: 510px;
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
  width: 100%;
  margin-bottom: 32px;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  &__input {
    z-index: 6;
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
