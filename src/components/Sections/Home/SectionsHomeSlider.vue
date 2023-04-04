<template>
  <section :class="$style['home_slider']">
    <div :class="$style['home_slider__slider']">
      <swiper ref="mySwiper" :options="swiperOption" :class="$style['slider']">
        <swiper-slide :class="$style['slider__slide']">
          <div :class="$style['home_slider__slider-slide']">
            <span :class="$style['home_slider__slider-text']">
              У нас есть зубная нить, которая
            </span>
            <h2 :class="$style['home_slider__slider-title']">
              Сохранит вашу улыбку чистой, великолепной!
            </h2>
            <span :class="$style['home_slider__slider-description']">
              Надоело стесняться и не улыбаться? Вы точно по адресу!
            </span>
            <ui-form-button>Записаться на прием</ui-form-button>
          </div>
        </swiper-slide>
        <swiper-slide :class="$style['slider__slide']">
          <div :class="$style['home_slider__slider-slide']">
            <span :class="$style['home_slider__slider-text']">
              Хотите иметь здоровые зубы и десны?
            </span>
            <h2 :class="$style['home_slider__slider-title']">
              Мы поможем вам достичь этой цели!
            </h2>
            <span :class="$style['home_slider__slider-description']">
              У нас работают опытные стоматологи и современное оборудование.
            </span>
            <ui-form-button>Записаться на прием</ui-form-button>
          </div>
        </swiper-slide>
        <swiper-slide :class="$style['slider__slide']">
          <div :class="$style['home_slider__slider-slide']">
            <span :class="$style['home_slider__slider-text']">
              Чистые зубы - здоровый образ жизни!
            </span>
            <h2 :class="$style['home_slider__slider-title']">
              Заботьтесь о своих зубах с нами!
            </h2>
            <span :class="$style['home_slider__slider-description']">
              Профессиональная чистка зубов - залог здоровья полости рта.
            </span>
            <ui-form-button>Записаться на прием</ui-form-button>
          </div>
        </swiper-slide>
        <div
          class="swiper-pagination"
          :class="$style['slider__pagination']"
          slot="pagination"
        />
      </swiper>
      <div :class="$style['slider__navigation']">
        <div
          @click.prevent="$refs.mySwiper.swiperInstance.slidePrev()"
          :class="[$style['slider__navigation-prev']]"
        >
          <svg-icon name="up-arrow"></svg-icon>
        </div>
        <div
          @click.prevent="$refs.mySwiper.swiperInstance.slideNext()"
          :class="[$style['slider__navigation-next']]"
        >
          <svg-icon name="up-arrow"></svg-icon>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SwiperOptions } from 'swiper'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'

export default defineComponent({
  name: 'SectionsHomeSlider',
  components: {
    UiFormButton,
  },

  computed: {
    swiperOption(): SwiperOptions {
      return {
        slidesPerView: 1,
        spaceBetween: 24,
        autoHeight: true,
        loop: true,
        autoplay: {
          delay: 5700,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
          bulletClass: 'cutdown-bullet',
          bulletActiveClass: 'cutdown-bullet-active',
          renderCustom(swiper, current, total) {
            let cbhtml = ''

            for (var i = 0; i < total; i++) {
              let isActive = i == current - 1

              cbhtml += `<span class="cutdown-bullet ${
                isActive ? 'cutdown-bullet-active ' : ''
              }">
              <span class="cutdown-bullet__counter">
                <span class="cutdown-bullet__count">${i + 1}</span>
                <svg>
                  <circle
                    class="bg"
                    cx="13"
                    cy="13"
                    r="13"
                    fill="none"
                    stroke="#F5F6FB"
                    stroke-width="2.5"
                    stroke-dasharray="500"
                  />
                  <circle
                    id="my-circle-${i}"
                    class="fill"
                    cx="13"
                    cy="13"
                    r="13"
                    fill="none"
                    stroke="#39A05F"
                    stroke-width="2.5"
                    stroke-dasharray="80"
                  />

                  <animate
                    xlink:href="#my-circle-${i}"
                    attributeName="stroke-dashoffset"
                    from="80"
                    to="0"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </svg>
              </span>
              <span class="cutdown-bullet__point">

              </span>
            </span>`
            }
            return cbhtml
          },
        },
      }
    },
  },
})
</script>

<style lang="scss" module>
.home_slider {
  width: 100%;
  padding: 16px 0;
  height: calc(100vh - 103px);
  background-color: #eef7f1;
  background-image: url('@/assets/images/sections/home/slider-bg.jpg');
  background-repeat: no-repeat;
  background-position: 55% bottom;
  background-size: 513px 342px;
  position: relative;

  &__slider {
    height: 100%;

    &-slide {
      display: flex;
      flex-direction: column;
      padding-left: 12px;
    }

    &-text {
      @include font-h5-medium;
      margin-bottom: 16px;
      color: $color-gray-100;
    }

    &-title {
      @include font-h1-medium;
      margin: 0;
      margin-bottom: 24px;
      color: $color-gray-100;
      max-width: 351px;
    }

    &-description {
      @include font-lead-regular-160;
      margin-bottom: 40px;
      color: $color-gray-88;
      max-width: 281px;
    }
  }
}

.slider {
  height: 100%;

  &__navigation {
    display: flex;
    position: absolute;
    bottom: 48px;
    width: 100%;
    height: fit-content;

    &-prev {
      padding: 8px 14px;
      border-radius: 38px 0 0 38px;
      background-color: $color-primary-100;
      height: 46px;
      cursor: pointer;
      position: relative;
      z-index: 2;
    }

    &-next {
      padding: 8px 14px;
      border-radius: 0 38px 38px 0;
      background-color: $color-primary-100;
      height: 46px;
      cursor: pointer;
      position: relative;
      z-index: 2;

      > svg {
        transform: rotate(180deg);
      }
    }

    svg {
      height: 30px;
      width: 30px;
      fill: $color-white-100;
    }
  }

  &__pagination {
    position: absolute;
    display: none;
    grid-gap: 8px;
    justify-content: center;
  }
}

@include media-breakpoint-up('md') {
  .home_slider {
    padding: 116px 0;
    background-position: center bottom;
    background-size: 696px 487px;

    &__slider {
      &-slide {
        padding-left: calc((100vw - 696px) / 2);
      }

      &-title {
        max-width: 516px;
      }

      &-description {
        max-width: 425px;
      }
    }
  }

  .slider {
    &__navigation {
      bottom: 48px;
      padding-left: calc((100vw - 696px) / 2);

      &-prev {
        padding: 8px 14px;
        border-radius: 38px 0 0 38px;
      }

      &-next {
        padding: 8px 14px;
        border-radius: 0 38px 38px 0;
      }
    }
  }
}

@include media-breakpoint-up('lg') {
  .home_slider {
    padding: 116px 0 58px;
    background-position: 100% bottom;
    background-size: 742px 496px;

    &__slider {
      &-description {
        max-width: 360px;
      }
    }
  }

  .slider {
    &__navigation {
      top: 50%;
      padding-left: 0;
      justify-content: space-between;

      &-prev {
        padding: 8px 14px;
        border-radius: 0 38px 38px 0;
      }

      &-next {
        padding: 8px 14px;
        border-radius: 38px 0 0 38px;
      }
    }

    &__pagination {
      display: flex;
      bottom: 23px;
    }
  }
}

@include media-breakpoint-up('xl') {
  .home_slider {
    padding: 118px 0 0;
    background-position: 88% bottom;
    background-size: 1042px 694px;

    &__slider {
      &-slide {
        padding-left: calc((100vw - 935px) / 2);
      }
    }

    &__pagination {
      bottom: 48px;
    }
  }

  .slider {
    &__navigation {
      top: 35%;
      padding: 0 calc((100vw - 1338px) / 2);

      &-prev {
        padding: 8px 14px;
        border-radius: 38px;
      }

      &-next {
        padding: 8px 14px;
        border-radius: 38px;
      }
    }

    &__pagination {
      bottom: 48px;
    }
  }
}
</style>
