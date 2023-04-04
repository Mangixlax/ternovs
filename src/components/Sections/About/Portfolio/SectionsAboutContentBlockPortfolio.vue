<template>
  <div :class="$style['about_content']">
    <div :class="$style['about_content__grid']">
      <div :class="$style['about_content__grid-container']">
        <div :class="$style['about_content__grid-container--text']">
          <h2>{{ block.title }}</h2>
          <p v-for="(paragraph, index) in block.subtitle" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <base-image-comparison
          :first-image="
            $img(`/sections/about/portfolio/${block.comparison.images[0]}`, {
              format: 'webp',
            })
          "
          :second-image="
            $img(`/sections/about/portfolio/${block.comparison.images[1]}`, {
              format: 'webp',
            })
          "
          :caption="block.comparison.caption"
        />
        <!-- <img
          :src="
            $img(`/sections/about/portfolio/${block.images?.src}`, {
              format: 'webp',
            })
          "
          :alt="block.image?.caption"
        /> -->

        <!-- <span> {{ block.comparison?.caption }} </span> -->
        <div :class="$style['about_content__grid-container']">
          <div
            :class="$style['about_content__grid-container--text']"
            v-if="block.text"
          >
            <h2>{{ block.text?.title }}</h2>
            <p v-for="(paragraph, index) in block.text?.subtitle" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AboutContentBlockPortfolio } from '~/types/models/models.js'
import BaseImageComparison from '~/components/Base/BaseImageComparison/BaseImageComparison.vue'

export default defineComponent({
  name: 'SectionsAboutContentBlockPortfolio',
  components: {
    BaseImageComparison,
  },
  props: {
    block: {
      type: Object as PropType<AboutContentBlockPortfolio>,
      default: () => {},
    },
  },
})
</script>

<style lang="scss" module>
.about_content {
  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;
      display: flex;
      flex-direction: column;

      &--text {
        padding: 40px 0;

        > h2 {
          @include font-h2-medium;
          margin: 0;
          margin-bottom: 24px;
          color: $color-gray-100;
        }

        > p {
          @include font-lead-regular-160;
          margin: 0;
          color: $color-gray-88;

          & + p {
            margin-top: 8px;
          }
        }
      }

      > img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      > span {
        @include font-lead-regular-160;
        padding: 24px 0;
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
        grid-column: 1 / 11;

        &--text {
          padding: 48px 96px;
        }

        > span {
          @include font-lead-regular-160;
          padding: 24px 96px;
          color: $color-gray-64;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 1 / 13;

        &--text {
          padding: 72 px 96px;

          > h1 {
            margin-bottom: 32px;
          }
        }
      }
    }
  }
}
</style>
