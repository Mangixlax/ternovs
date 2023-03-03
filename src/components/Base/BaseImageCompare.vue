<template>
  <div :class="$style['compare']">
    <img-comparison-slider class="rendered" :class="$style['compare__slider']">
      <img
        slot="first"
        :src="$img('/sections/about/our-team.jpg')"
        :class="$style['compare__slider-image']"
      />
      <img
        slot="second"
        :src="$img('/sections/about/photos/vario-surg.jpg')"
        :class="$style['compare__slider-image']"
      />
    </img-comparison-slider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseImageCompare',
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
    
    &:focus {
      outline: none;
    }

    &-image {
      object-fit: cover;
      width: 100%;
      height: auto;
    }
  }
}
</style>
