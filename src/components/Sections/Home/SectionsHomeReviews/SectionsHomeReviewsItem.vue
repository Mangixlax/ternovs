<template>
  <div :class="$style['reviews__item']">
    <svg-icon name="review-quote" />
    <div :class="$style['reviews__item-text']">{{ item.text }}</div>
    <div :class="$style['reviews__item-name']">{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { HomeReviewItem } from '@/types/models/home'

export default defineComponent({
  name: 'SectionsHomeReviewsItem',
  props: {
    item: { type: Object as PropType<HomeReviewItem>, default: () => {} },
  },
})
</script>

<style lang="scss" module>
.reviews__item {
  width: 100%;
  display: flex;
  flex-direction: column;

  svg {
    height: 30px;
    width: 30px;
    fill: $color-primary-100;
    margin-bottom: 20px;
  }

  &-text {
    @include font-small-regular;
    color: $color-gray-100;
    margin-bottom: 20px;
  }

  &-name {
    @include font-p-medium-160;
    color: $color-gray-100;
  }

  @include media-breakpoint-up('md') {
    align-items: center;

    &-text {
      text-align: center;
    }
  }
}
</style>
