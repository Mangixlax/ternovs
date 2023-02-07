<template>
  <section :class="$style['accordion']">
    <div :class="$style['accordion__grid']">
      <div :class="$style['accordion__grid-container']">
        <h2>Сертификаты</h2>
        <span>
          {{ employee.sertificates?.text }}
        </span>
      </div>
      <div :class="$style['accordion__grid-row']">
        <div :class="$style['accordion__grid-row-container']">
          <img
            v-for="(item, index) in employee.sertificates?.list"
            :src="
              $img(
                `/sections/about/employees/${employee.folder}/sertificates/${item}`
              )
            "
            :alt="`Сертификат сотрудника - ${employee.name}`"
            :class="$style['accordion__grid-image']"
          />
        </div>
        <div :class="$style['accordion__grid-row-slider']">
          <swiper
            ref="mySwiper"
            :options="swiperOption"
            :class="$style['slider']"
          >
            <swiper-slide
              v-for="(item, index) in employee.sertificates?.list"
              :key="index"
              :class="$style['slider__slide']"
            >
              <img
                :src="
                  $img(
                    `/sections/about/employees/${employee.folder}/sertificates/${item}`
                  )
                "
                :alt="`Сертификат сотрудника - ${employee.name}`"
                :class="$style['accordion__grid-image']"
              />
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
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SwiperOptions } from 'swiper'
import { Employee } from '@/types/models/employee'

@Component
export default class SectionsAboutOurTeamSertificates extends Vue {
  @Prop({ type: Object, default: () => {} }) employee!: Employee

  get swiperOption() {
    return {
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: false,
      autoHeight: true,
      autoplay: false,
      breakpoints: {
        // when window width is >= 768
        768: {
          slidesPerView: 3,
        },
      },
    }
  }
}
</script>

<style lang="scss" module>
.accordion {
  &__grid {
    @include grid-container;
    padding: 0;
    grid-row-gap: 0;
    
    &-container {
      grid-column: 1 / 5;
      grid-row: 1 / 2;
      padding: 0 12px;

      > h2 {
        @include font-h2-medium;
        margin: 0;
        margin-bottom: 48px;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-88;
        margin-bottom: 48px;
        display: block;
      }
    }

    &-row {
      grid-column: 1 / 5;
      grid-row: 2 / 2;

      &-container {
        display: none;
      }

      &-slider {
        margin-left: 12px;
      }
    }

    &-image {
      width: 198px;
      height: 280px;
      border-radius: 12px;
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        padding: 48px 0;
        grid-column: 1 / 9;
      }

      &-row {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      &-container {
        padding: 72px 0;
        grid-column: 2 / 10;
      }

      &-row {
        grid-column: 2 / 10;

        &-slider {
          display: none;
        }

        &-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-row-gap: 80px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 2 / 12;
      }

      &-row {
        grid-column: 2 / 12;
    
        &-container {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-row-gap: 80px;
          grid-column-gap: 48px;
        }
      }
    }
  }
}
.slider {
  &__slide {
    width: fit-content;
  }

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
