<template>
  <main :class="$style['portfolio']">
    <div :class="$style['portfolio__grid']">
      <div :class="$style['portfolio__grid-container']">
        <h1>Наши работы</h1>
        <p>
          Фотогалерея работ врачей клиники «Авторская стоматология Терновых». На
          нашем сайте вы можете посмотреть фото до и после работ, выполненных
          врачами нашей стоматологической клиники.
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PortfolioPage extends Vue {}
</script>

<style lang="scss" module>
.portfolio {
  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;
      padding: 80px 0 24px;
      display: flex;
      flex-direction: column;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 40px;
        color: $color-gray-88;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }

      > img {
        width: 100%;
        height: auto;
        object-fit: cover;
        margin-bottom: 24px;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-64;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      &-container {
        padding: 96px 0 24px;
        grid-column: 1 / 11;

        > h1 {
          padding: 0 192px 0 96px;
        }

        > p {
          margin-bottom: 48px;
          padding: 0 192px 0 96px;
        }

        > span {
          padding: 0 192px 0 96px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        padding: 144px 0 24px;
        grid-column: 1 / 13;

        > h1 {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 72px;
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
