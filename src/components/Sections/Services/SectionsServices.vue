<template>
  <div :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h1>{{ name }}</h1>
        <span>{{ excerpt }}</span>
      </div>
      <div :class="$style['services__grid-row']">
        <div :class="$style['services__grid-row-container']">
          <sections-services-item
            v-for="(serviseItem, index) in directions"
            :key="index"
            :item="serviseItem"
            :category-slug="serviseItem.slug"
          />
        </div>
        <div :class="$style['services__grid-row-slider']">
          <swiper
            ref="mySwiper"
            :options="swiperOption"
            :class="$style['slider']"
          >
            <swiper-slide
              v-for="(serviseItem, index) in directions"
              :key="index"
              :class="$style['slider__slide']"
            >
              <sections-services-item
                :item="serviseItem"
                :category-slug="serviseItem.slug"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SwiperOptions } from 'swiper'
import { ServiceItem } from '~/types/models/Servises'

import SectionsServicesItem from '@/components/Sections/Services/SectionsServicesItem.vue'

export default defineComponent({
  name: 'SectionsServices',
  components: {
    SectionsServicesItem,
  },
  props: {
    name: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    directions: { type: Array as PropType<ServiceItem[]> , default: () => [] } 
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
            slidesPerView: 3,
          },
        },
      }
    },
  },
  mounted() {
    console.log(this.directions);
    
  },
})
</script>

<style lang="scss" module>
.services {
  width: 100%;
  padding: 40px 0;

  &__grid {
    @include grid-container;
    padding: 0;

    &-container {
      grid-column: 1 / 5;
      grid-row: 1 / 2;
      padding: 0 12px;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-88;
      }

      > button {
        margin: 0 auto;
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
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        padding: 0;
        grid-column: 1 / 9;
      }

      &-row {
        grid-column: 1 / 9;

        &-container {
          display: none;
        }
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 48px 0;

    &__grid {
      &-container {
        grid-column: 2 / 8;
      }

      &-row {
        grid-column: 1 / 11;
        padding: 0 72px;

        &-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }

        &-slider {
          display: none;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 36px 0;

    &__grid {
      &-container {
        grid-column: 2 / 10;
      }

      &-row {
        grid-column: 1 / 13;
        padding: 0 72px;

        &-slider {
          display: none;
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
