<template>
  <div :class="$style['compare']">
    <img-comparison-slider class="rendered" :class="$style['compare__slider']">
      <img
        slot="first"
        :src="firstImage"
        :class="$style['compare__slider-image']"
      />
      <img
        slot="second"
        :src="secondImage"
        :class="$style['compare__slider-image']"
      />
    </img-comparison-slider>
    <span>{{ caption }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentImageComparsion',
  props: {
    firstImage: {
      type: String,
      default: '',
    },
    secondImage: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    }
  },
  mounted() {
    require('img-comparison-slider')
  },
})
</script>

<style lang="scss" module>
.compare {
  width: 100%;

  &__slider {
    width: 100%;
    border-radius: 16px;
    margin-bottom: 24px;

    &:focus {
      outline: none;
    }

    &-image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: flex;
    }
  }

  > span {
    @include font-p-medium-160;
    color: $color-gray-100;
  }

  @include media-breakpoint-up('lg') {
    &__slider {
      &-image {
        height: 600px;
      }
    }

    > span {
      padding: 0 96px;
    }
  }
}
</style>
