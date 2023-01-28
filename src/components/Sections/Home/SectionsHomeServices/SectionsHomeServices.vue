<template>
  <div :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-text']">
        <h2>
          Оказываем услуги <br />
          по 4 направлениям
        </h2>
        <span>
          Выбрав интересующие направление вы сможете ознакомиться как со списком
          услуги, так качество работы на всех этапах.
        </span>
        <ui-form-button> Записаться на приём </ui-form-button>
      </div>
      <div :class="$style['services__grid-decore']">
        <img
          :src="$img('/sections/home/serviсes-decore.png')"
          alt="Девушка с красивыми зубами"
          :class="$style['services__grid-decore-image']"
        />
        <img
          :src="$img('/layout/diamond.png')"
          alt="diamond"
          v-rellax="{
            speed: 3,
            center: true,
          }"
          :class="$style['services__grid-decore-diamond']"
        />
      </div>
      <div :class="$style['services__grid-row']">
        <div :class="$style['services__grid-row-container']">
          <sections-home-services-item
            v-for="(item, index) in services"
            :key="index"
            :item="item"
          />
        </div>
        <div :class="$style['services__grid-row-slider']">
          <swiper
            ref="mySwiper"
            :options="swiperOption"
            :class="$style['slider']"
          >
            <swiper-slide
              v-for="(item, i) in services"
              :key="i"
              :class="$style['slider__slide']"
            >
              <sections-home-services-item :item="item" />
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Location } from 'vue-router/types/router'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { SwiperOptions } from 'swiper'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsHomeServicesItem from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServicesItem.vue'

interface service {
  icon: string
  title: string
  text: string
  route: Location
}

@Component({
  components: {
    UiFormButton,
    Swiper,
    SwiperSlide,
    SectionsHomeServicesItem,
  },
})
export default class SectionsHomeServices extends Vue {
  public swiperOption: SwiperOptions = {
    slidesPerView: 1.3,
    spaceBetween: 24,
    loop: false,
    autoHeight: true,
    autoplay: false,
    breakpoints: {
      // when window width is >= 250
      768: {
        slidesPerView: 3.3,
      },
    },
  }

  public services: service[] = [
    {
      icon: 'tooth-cracked',
      title: 'Ортопедия',
      text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
      route: {
        name: 'services',
      },
    },
    {
      icon: 'tooth-caries',
      title: 'Терапия',
      text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
      route: {
        name: 'services',
      },
    },
    {
      icon: 'dental-implant',
      title: 'Хирургия',
      text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
      route: {
        name: 'services',
      },
    },
    {
      icon: 'dental-crown',
      title: 'Ортопедия',
      text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
      route: {
        name: 'services',
      },
    },
  ]
}
</script>

<style lang="scss" module>
.services {
  width: 100%;
  background: $color-primary-8;
  padding: 80px 0;

  &__grid {
    @include grid-container;
    grid-row-gap: 48px;
    position: relative;

    &-text {
      grid-column: 1 / 5;
      grid-row: 1 / 1;
      display: flex;
      flex-direction: column;

      h2 {
        @include font-h2-medium;
        color: $color-gray-100;
        margin: 0;
        margin-bottom: 24px;
      }

      span {
        @include font-lead-regular-160;
        color: $color-gray-100;
        margin-bottom: 24px;
      }
    }

    &-decore {
      display: none;
      position: relative;

      &-diamond {
        position: absolute;
        left: 0;
        top: 90px;
        left: -67px;
        height: 90px;
        width: auto;
      }

      &-image {
        width: 100%;
        height: auto;
      }
    }

    &-row {
      grid-column: 1 / 5;
      grid-row: 2 / 2;
      position: relative;

      &-container {
        display: none;
      }

      &-slider {
        box-sizing: border-box;
        width: calc(100% + 12px);
        position: relative;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-text {
        grid-column: 1 / 5;
        justify-content: flex-end;
      }

      &-decore {
        display: block;
        grid-column: 6 / 9;
        position: absolute;
        top: -160px;
      }

      &-row {
        grid-column: 1 / 9;

        &-slider {
          box-sizing: border-box;
          width: calc((100vw) - ((100vw - 680px) / 2));
          position: relative;
          left: initial;
        }
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 89px 0 71px 0;

    &__grid {
      &-text {
        grid-column: 2 / 6;
        padding-right: 72px;
      }

      &-decore {
        grid-column: 6 / 10;
        top: -181px;
      }

      &-row {
        grid-column: 2 / 10;

        &-container {
          width: 100%;
          display: flex;
          grid-gap: 24px;
        }

        &-slider {
          display: none;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 171px 0;

    &__grid {
      &-text {
        grid-column: 2 / 7;
        padding-right: 72px;
      }

      &-decore {
        grid-column: 7 / 11;
        top: -288px;
      }

      &-row {
        grid-column: 2 / 11;
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
