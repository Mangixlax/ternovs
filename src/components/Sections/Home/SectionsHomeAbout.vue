<template>
  <section :class="$style['about']">
    <div :class="$style['about__grid']">
      <div :class="$style['about__grid-container']">
        <span> Клиника №1 </span>
        <h2>На практике качественный уход и лечение для всей полости рта</h2>
        <p>
          Успех доктора Терновых был обусловлен твердой приверженностью
          этическому и качественному уходу, мотивированному достижением их
          философии стоматологии.
        </p>
        <nuxt-link :to="{ name: 'o-kompanii' }">
          <span>О клинике</span>
          <svg-icon name="back-arrow" />
        </nuxt-link>
        <div :class="$style['about__grid-review']">
          <span>1287</span>
          <svg-icon name="stars" />
          <p>
            5 звездочных <br />
            отзывов от наших пациентов
          </p>
          <nuxt-link :to="{ name: 'otzyvy' }">
            <svg-icon name="go-back" />
            <span>Читать отзывы</span>
          </nuxt-link>
        </div>
      </div>
      <div :class="$style['about__grid-decore']">
        <img
          :src="
            $img('/sections/home/about-decore.png', {
              format: 'webp',
            })
          "
          alt="Стоматологическая клиника"
          :class="$style['about__grid-bg']"
        />
        <img
          :src="
            $img('/layout/diamond.png', {
              format: 'webp',
            })
          "
          alt="diamond"
          :class="$style['about__grid-diamond']"
          v-rellax="{
            speed: 3,
            center: true,
          }"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SectionsHomeAbout',
})
</script>

<style lang="scss" module>
.about {
  width: 100%;
  padding: 80px 0 20px;

  &__grid {
    @include grid-container;
    grid-row-gap: 32px;

    &-container {
      grid-column: 1 / 5;
      grid-row: 2 / 2;

      > h2 {
        @include font-h2-medium;
        margin: 0;
        margin-bottom: 24px;
      }

      > span {
        @include font-h5-medium;
        display: block;
        margin-bottom: 8px;
        color: $color-gray-88;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 24px;
      }

      > a {
        @include font-lead-medium-160;
        display: flex;
        align-items: center;
        color: $color-gray-100;
        text-decoration: none;

        > span {
          margin-top: 4px;
        }

        svg {
          height: 30px;
          width: 30px;
          fill: $color-primary-100;
        }
      }
    }

    &-review {
      margin-top: 32px;
      display: flex;
      flex-direction: column;

      > span {
        @include font-h2-medium;
        margin-bottom: 12px;
      }

      > svg {
        height: 25px;
        width: 125px;
        margin-bottom: 12px;
        fill: $color-primary-100;
      }

      > p {
        @include font-p-regular-130;
        color: $color-gray-72;
      }

      > a {
        @include font-p-medium-160;
        display: flex;
        align-items: center;
        color: $color-gray-100;
        text-decoration: none;

        > span {
          margin-top: 4px;
        }

        svg {
          height: 24px;
          width: 24px;
          fill: $color-gray-100;
          margin-right: 6px;
        }

        > p {
        }
      }
    }
    &-decore {
      grid-column: 1 / 4;
      grid-row: 1 / 1;
      position: relative;
      height: fit-content;
    }

    &-bg {
      width: 100%;
      height: auto;
    }

    &-diamond {
      position: absolute;
      top: 100px;
      right: -96px;
      height: 128px;
      width: auto;
    }
  }

  @include media-breakpoint-up('md') {
    padding: 96px 0 40px;

    &__grid {
      &-container {
        grid-column: 5 / 9;
        grid-row: 1 /1;
      }
      &-decore {
        grid-column: 1 / 4;
        grid-row: 1 /1;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 116px 0 58px;

    &__grid {
      &-container {
        grid-column: 7 / 11;
      }

      &-decore {
        grid-column: 2 / 6;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 164px 0 96px;

    &__grid {
      &-container {
        grid-column: 9 / 13;
      }

      &-decore {
        grid-column: 2 / 7;
      }
    }
  }
}
</style>
