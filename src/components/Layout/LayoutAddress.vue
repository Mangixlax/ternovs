<template>
  <section :class="$style['address']">
    <div :class="$style['address__grid']">
      <div :class="$style['address__grid-decore']">
        <div :class="$style['address__grid-decore-container']">
          <img
            :src="$img('/layout/emblem-mini.png')"
            alt="Графика зуба в образе брилианта"
            v-rellax="{
              speed: 2,
              center: true,
            }"
          />
        </div>
      </div>
      <div :class="$style['address__grid-container']">
        <span>
          Более 10 лет специалисты оказывают широкий<br />спектр услуг по уходу,
          реставрации и лечению зубов
        </span>
        <nuxt-link :to="{ name: 'o-kompanii' }">
          Клиника находится по адресу:
          <span>
            Московская область, г. Клин, ул. Чайковского, д. 105,<br />
            к. 2, пом. 3
            <svg-icon name="map-pin"> </svg-icon>
          </span>
        </nuxt-link>
        <ui-form-button
          variant="gray"
          tag="a"
          href="https://yandex.ru/maps/213/moscow/?ll=37.617700%2C55.755863&z=10"
          target="_blank"
        >
          Маршрут в Яндекс.Картах
        </ui-form-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'

export default defineComponent({
  name: 'LayoutAddress',
  components: { UiFormButton },
})
</script>

<style lang="scss" module>
.address {
  width: 100%;
  padding: 40px 0;
  overflow: hidden;

  &__grid {
    @include grid-container;
    padding: 0;
    position: relative;

    &-decore {
      position: absolute;
      inset: 0;
      grid-column: 1 / 5;

      &-container {
        position: relative;
        height: 100%;

        img {
          width: 360px;
          height: 240px;
          position: absolute;
          top: 20px;
          right: -168px;
        }
      }
    }

    &-container {
      grid-column: 1 / 5;
      padding: 12px 12px 0 12px;
      display: flex;
      flex-direction: column;

      > span {
        @include font-h6-medium;

        br {
          display: none;
        }
      }

      a:first-of-type {
        @include font-h3-medium;
        text-decoration: none;
        display: block;
        margin-top: 16px;
        margin-bottom: 48px;
        color: $color-gray-100;

        > span {
          color: $color-primary-100;
        }

        svg {
          height: 28px;
          width: 28px;
          fill: $color-primary-100;
        }
        span svg {
          vertical-align: bottom;
        }
      }
    }
  }

  @media (min-width: 400px) {
    &__grid {
      &-container {
        > span {
          br {
            display: initial;
          }
        }

        a {
          br {
            display: none;
          }
        }
      }
    }
  }
  @include media-breakpoint-up('md') {
    padding: 80px 0 40px;

    &__grid {
      &-decore {
        grid-column: 3 / 7;

        &-container {
          img {
            right: initial;
          }
        }
      }

      &-container {
        grid-column: 1 / 9;
        padding: 78px 0 0 0;
        align-items: center;
        text-align: center;

        a {
          margin-bottom: 52px;

          svg {
            height: 30px;
            width: 30px;
          }

          span svg {
            vertical-align: bottom;
          }
        }
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 48px 0 48px;

    &__grid {
      &-decore {
        grid-column: 4 / 8;

        &-container {
          img {
            right: initial;
          }
        }
      }

      &-container {
        grid-column: 2 / 10;
        padding: 27px 0 0 0;
        align-items: center;
        text-align: center;

        a {
          margin-bottom: 52px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 96px 0;

    &__grid {
      &-decore {
        grid-column: 5 / 9;

        &-container {
          img {
            right: initial;
          }
        }
      }

      &-container {
        grid-column: 2 / 12;
        padding: 66px 72px 0 72px;
        align-items: center;
        text-align: center;

        a {
          margin-bottom: 52px;
        }
      }
    }
  }
}
</style>
