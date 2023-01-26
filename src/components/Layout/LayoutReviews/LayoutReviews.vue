<template>
  <section :class="$style['reviews']">
    <div :class="$style['reviews__grid']">
      <div :class="$style['reviews__grid-stars']">
        <h2>
          5-звездочные отзывы <br />
          от наших пациентов
        </h2>
        <span> 4.9/5.0 </span>
        <svg-icon name="layout/star" />
      </div>
      <div :class="$style['reviews__grid-decore']">
        <div :class="$style['reviews__grid-decore-container']">
          <img
            :src="$img('/layout/reviews-bg.png')"
            alt="Графика зуба в образе брилианта"
          />
        </div>
      </div>
      <layout-reviews-item
        v-for="(item, index) in reviews"
        :key="index"
        :review="item"
        :class="[
          $style['reviews__grid-container'],
          $style[`reviews__grid-container-${index + 1}`],
        ]"
      />
      <div :class="$style['reviews__grid-slider']">
        <layout-reviews-item :review="reviews[0]" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LayoutReviewsItem from '@/components/Layout/LayoutReviews/LayoutReviewsItem.vue'

interface review {
  text: string
  name: string
}

@Component({
  components: { LayoutReviewsItem },
})
export default class LayoutReviews extends Vue {
  public reviews: review[] = [
    {
      text: 'Знакомство с коллективом клиники произошло 5 лет тому назад. За эти годы я, моя семья, друзья и знакомые посещаем только эту клинику.',
      name: 'Дмитрий В.',
    },
    {
      text: 'Знакомство с коллективом клиники произошло 5 лет тому назад. За эти годы я, моя семья, друзья и знакомые посещаем только эту клинику.',
      name: 'Дмитрий В.',
    },
    {
      text: 'Знакомство с коллективом клиники произошло 5 лет тому назад. За эти годы я, моя семья, друзья и знакомые посещаем только эту клинику.',
      name: 'Дмитрий В.',
    },
    {
      text: 'Знакомство с коллективом клиники произошло 5 лет тому назад. За эти годы я, моя семья, друзья и знакомые посещаем только эту клинику.',
      name: 'Дмитрий В.',
    },
  ]
}
</script>

<style lang="scss" module>
.reviews {
  width: 100%;
  padding: 80px 0 40px;

  &__grid {
    @include grid-container;
    position: relative;

    &-decore {
      position: absolute;
      inset: 0;
      grid-column: 1 / 6;

      &-container {
        position: relative;
        height: 100%;

        img {
          width: 100%;
        }
      }
    }

    &-stars {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      h2 {
        @include font-h2-medium;
        color: $color-gray-100;
        margin: 0;
        margin-bottom: 12px;
      }

      span {
        @include font-h5-medium;
        color: $color-gray-100;
        margin-bottom: 12px;
      }

      svg {
        width: 100px;
        height: 20px;
      }
    }

    &-container {
      display: none;
    }

    &-slider {
      height: 454px;
      padding-top: 202px;
      padding-bottom: 22px;
      grid-column: 1 / 6;
      min-width: 100%;
    }
  }

  @include media-breakpoint-up('md') {
    padding: 80px 0 40px;

    &__grid {
      padding-top: 150px;

      &-slider {
        display: none;
      }

      &-decore {
        grid-column: 2 / 8;
      }

      &-stars {
        margin-top: 14px;

        svg {
          height: 26px;
          width: 140px;
        }

        h2 {
          margin-bottom: 16px;
        }
      }

      &-container {
        display: flex;

        &-1 {
          grid-column: 1 / 4;
          grid-row: 1 / 1;
        }

        &-2 {
          grid-column: 6 / 9;
          grid-row: 1 / 1;
        }

        &-3 {
          grid-column: 2 / 5;
          grid-row: 2 / 2;
        }

        &-4 {
          grid-column: 5 / 8;
          grid-row: 2 / 2;
        }
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 0 48px;

    &__grid {
      padding-top: 172px;

      &-decore {
        grid-column: 2 / 10;
      }

      &-stars {
        margin-top: 70px;

        svg {
          height: 32px;
          width: 160px;
        }

        h2 {
          margin-bottom: 14px;
        }

        span {
          margin-bottom: 24px;
        }
      }

      &-container {
        &-1 {
          grid-column: 1 / 4;
        }

        &-2 {
          grid-column: 8 / 11;
        }

        &-3 {
          grid-column: 3 / 6;
        }

        &-4 {
          grid-column: 6 / 9;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 72px;

    &__grid {
      padding-top: 259px;

      &-decore {
        grid-column: 2 / 12;
      }

      &-stars {
        margin-top: 110px;

        svg {
          height: 32px;
          width: 160px;
        }

        h2 {
          margin-bottom: 31px;
        }
      }

      &-container {
        &-1 {
          grid-column: 2 / 5;
        }

        &-2 {
          grid-column: 9 / 12;
        }

        &-3 {
          grid-column: 4 / 7;
        }

        &-4 {
          grid-column: 7 / 10;
        }
      }
    }
  }
}
</style>
