<template>
  <section :class="$style['reviews']">
    <div :class="$style['reviews__grid']">
      <div :class="$style['reviews__grid-stars']">
        <h2>
          5-звездочные отзывы <br />
          от наших пациентов
        </h2>
        <span> 4.9/5.0 </span>
        <svg-icon name="stars" />
      </div>
      <div :class="$style['reviews__grid-decore']">
        <div :class="$style['reviews__grid-decore-container']">
          <img
            :src="
              $img('/sections/home/reviews-bg.png', {
                format: 'webp',
              })
            "
            alt="Графика зуба в образе брилианта"
            v-rellax="{
              speed: 4,
              center: true,
            }"
          />
        </div>
      </div>
      <div
        v-for="(item, index) in reviews"
        :key="index"
        :class="[
          $style['reviews__grid-container'],
          $style[`reviews__grid-container-${index + 1}`],
        ]"
      >
        <sections-home-reviews-item :item="item" />
      </div>
      <div :class="$style['reviews__grid-slider']">
        <swiper
          ref="mySwiper"
          :options="swiperOption"
          :class="$style['slider']"
        >
          <swiper-slide
            v-for="(item, i) in reviews"
            :key="i"
            :class="$style['slider__slide']"
          >
            <sections-home-reviews-item :item="item" />
          </swiper-slide>
          <div slot="pagination" :class="$style['slider__navigation']">
            <div
              @click.prevent="$refs.mySwiper.swiperInstance.slidePrev()"
              :class="[$style['slider__navigation-prev']]"
            >
              <svg-icon name="arrow-left"></svg-icon>
            </div>
            <div
              @click.prevent="$refs.mySwiper.swiperInstance.slideNext()"
              :class="[$style['slider__navigation-next']]"
            >
              <svg-icon name="arrow-right"></svg-icon>
            </div>
          </div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SwiperOptions } from 'swiper'
import { HomeReviewItem } from '@/types/models/home'

import SectionsHomeReviewsItem from '@/components/Sections/Home/SectionsHomeReviews/SectionsHomeReviewsItem.vue'

export default defineComponent({
  name: 'SectionsHomeReviews',
  components: { SectionsHomeReviewsItem },
  data() {
    return {
      reviews: <HomeReviewItem[]>[
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
      ],
    }
  },
  computed: {
    swiperOption(): SwiperOptions {
      return {
        slidesPerView: 1.3,
        spaceBetween: 24,
        loop: false,
        autoHeight: true,
        autoplay: false,
      }
    },
  },
})
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
        fill: #f2b600;
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
      width: calc(100% + 12px);
      position: relative;
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

.slider {
  &__navigation {
    display: flex;
    padding-top: 14px;

    &-prev {
      padding: 8px 14px 8px 0;
    }

    &-next {
      padding: 8px 0 8px 14px;
    }
    svg {
      height: 30px;
      width: 30px;
    }
  }
}
</style>
