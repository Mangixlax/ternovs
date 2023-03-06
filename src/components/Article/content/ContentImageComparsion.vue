<template>
  <div :class="$style['compare']">
    <img-comparison-slider class="rendered" :class="$style['compare__slider']">
      <img
        slot="first"
        :src="image_1"
        :class="$style['compare__slider-image']"
      />
      <img
        slot="second"
        :src="image_2"
        :class="$style['compare__slider-image']"
      />
    </img-comparison-slider>
    <span>{{ block.data.caption }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentImageComparsion',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    image_1(): any {
      const filePath = this.block.data.images[0].url
        .match(/.{1,3}/g)
        .slice(0, 3)
        .join('/')

      return this.$img(`s3/` + filePath + '/' + this.block.data.images[0].url, {
        format: 'webp',
      })
    },
    image_2(): any {
      const filePath = this.block.data.images[1].url
        .match(/.{1,3}/g)
        .slice(0, 3)
        .join('/')

      return this.$img(`s3/` + filePath + '/' + this.block.data.images[1].url, {
        format: 'webp',
      })
    },
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
