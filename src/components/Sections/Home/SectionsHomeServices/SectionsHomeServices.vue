<template>
  <div :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-text']">
        <h2>
          Оказываем услуги <br />
          {{ servicesCountText }}
        </h2>
        <span>
          Новейшее оборудование и методики позволяют добиться блестящего
          результата работы как в прямом, так и переносном смысле. Десятки тысяч
          довольных пациентов уже получили свою возможность снова улыбаться.
        </span>
        <ui-form-button> Записаться на прием </ui-form-button>
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
            v-for="(item, index) in servicesLinks"
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
import { defineComponent } from '@nuxtjs/composition-api'
import { SwiperOptions } from 'swiper'
import { HomeServiceItem } from '@/types/models/home'

import { pluralize } from '~/lib/utils'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsHomeServicesItem from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServicesItem.vue'

export default defineComponent({
  name: 'SectionsHomeServices',
  components: {
    UiFormButton,
    SectionsHomeServicesItem,
  },
  data() {
    return {
      services: <HomeServiceItem[]>[
        {
          icon: 'tooth-cracked',
          title: 'Ортопедия',
          text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
          route: {
            name: 'uslugi',
          },
        },
        {
          icon: 'tooth-caries',
          title: 'Терапия',
          text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
          route: {
            name: 'uslugi',
          },
        },
        {
          icon: 'dental-implant',
          title: 'Хирургия',
          text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
          route: {
            name: 'uslugi',
          },
        },
        {
          icon: 'dental-crown',
          title: 'Ортопедия',
          text: 'Краткое описане, которое раскрывает  и мотивирует узнать больше',
          route: {
            name: 'uslugi',
          },
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
        breakpoints: {
          // when window width is >= 768
          768: {
            slidesPerView: 3.3,
          },
        },
      }
    },
    servicesLinks() {
      return this.$store.getters['getCategoriesList'].map((item: any) => {
        return {
          name: item.short_name,
          image: item.image,
          excerpt: item.excerpt,
          route: {
            name: 'uslugi-category',
            params: {
              category: item.slug,
            },
          },
        }
      })
    },
    servicesCountText(): string {
      const serviceCount = this.servicesLinks.length
      const apartmentsWord: string = pluralize(
        serviceCount,
        'направлению',
        'направлению',
        'направлениям',
        'направлениям'
      )
      return `по ${serviceCount} ${apartmentsWord}`
    },
  },
})
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

      > h2 {
        @include font-h2-medium;
        color: $color-gray-100;
        margin: 0;
        margin-bottom: 24px;
      }

      > span {
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
        top: 140px;
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
      grid-row-gap: 72px;

      &-text {
        grid-column: 2 / 7;
        padding-right: 72px;
      }

      &-decore {
        grid-column: 7 / 12;
        top: -288px;
      }

      &-row {
        grid-column: 2 / 12;
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
