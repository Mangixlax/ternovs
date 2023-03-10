<template>
  <div :class="$style['platform__item']">
    <img
      :src="
        $img(`/sections/reviews/platforms/${item.image}`, {
          format: 'webp',
        })
      "
      :alt="item.name"
    />
    <div :class="$style['platform__item-rating']">
      {{ item.name }}{{ item.rating }}
      <svg-icon name="star" />
    </div>
    <p>{{ item.description }}</p>
    <div :class="$style['platform__item-link']">
      <span>Написать отзыв</span>
      <svg-icon :name="'back-arrow'" />
    </div>
    <a :href="item.link"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Platform } from '@/types/models/reviews'

export default defineComponent({
  name: 'SectionsReviewsPlatformItem',
  props: {
    item: { type: Object as PropType<Platform>, default: () => {} },
  },
})
</script>

<style lang="scss" module>
.platform__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  > img {
    height: 100px;
    width: 100px;
    margin-bottom: 24px;
    border-radius: 100px;
  }

  &-rating {
    @include font-h6-medium;
    color: $color-gray-100;
    display: flex;
    margin-bottom: 16px;

    > svg {
      height: 23px;
      width: 23px;
      fill: $color-primary-100;
      margin-left: 6px;
    }
  }

  > p {
    @include font-p-regular-160;
    margin: 0;
    margin-bottom: 16px;
  }

  &-link {
    @include font-p-medium-160;
    display: flex;
    align-items: center;
    text-decoration: none;

    span {
      margin-top: 5px;
      color: $color-gray-100;
    }

    svg {
      height: 30px;
      width: 30px;
      fill: $color-primary-100;
    }
  }

  > a {
    position: absolute;
    inset: 0;
  }

  @include media-breakpoint-up('md') {
    > img {
      height: 120px;
      width: 120px;
      margin-bottom: 26px;
      border-radius: 100px;
    }
  }

  @include media-breakpoint-up('xl') {
    > img {
      height: 160px;
      width: 160px;
      margin-bottom: 32px;
      border-radius: 100px;
    }
  }
}
</style>
