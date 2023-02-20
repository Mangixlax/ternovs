<template>
  <div :class="$style['reviews__item']">
    <div :class="$style['reviews__item-panel']">
      <div :class="$style['reviews__item-avatar']">
        <img
          :src="$img(`/sections/reviews/${item.avatar}.png`)"
          alt="Автор отзыва"
          :class="$style['reviews__item-avatar-author']"
        />
        <img
          :src="$img(`/sections/reviews/${item.platform.logo}.png`)"
          alt="Платформа отзыва"
          :class="$style['reviews__item-avatar-platform']"
        />
      </div>
      <span :class="$style['reviews__item-date']">
        {{ item.name }},
        {{ item.date }}
      </span>
      <span
        :class="[
          $style['reviews__item-platform'],
          $style['reviews__item-platform--desktop'],
        ]"
      >
        <span :class="$style['reviews__item-devider']"> · </span>
        На платформе
        <a :href="item.platform.link">{{ item.platform.label }}</a> с оценкой
        {{ item.platform.link }} {{ item.platform.stars }}
        <svg-icon name="star" />
      </span>
    </div>
    <h2>{{ item.title }}</h2>
    <p>{{ item.text }}</p>
    <span :class="$style['reviews__item-platform']">
      На платформе
      <a :href="item.platform.link">{{ item.platform.label }}</a> с оценкой
      {{ item.platform.link }} {{ item.platform.stars }}
      <svg-icon name="star" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Review } from '@/types/models/reviews'

export default defineComponent({
  name: 'SectionsReviewsItem',
  props: {
    item: { type: Object as PropType<Review>, default: () => {} },
  },
})
</script>

<style lang="scss" module>
.reviews__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0 24px;

  & + & {
    border-top: solid 2px $color-gray-4;
  }

  &-panel {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @include font-p-regular-130;
    color: $color-gray-100;
  }

  &-avatar {
    padding: 2px;
    position: relative;
    margin-right: 4px;
    margin-bottom: 4px;
    display: flex;

    &-author {
      height: 32px;
      width: 32px;
      border-radius: 50%;
    }

    &-platform {
      position: absolute;
      height: 14px;
      width: 14px;
      border-radius: 3px;
      bottom: 0;
      right: 0;
    }
  }

  &-devider {
    margin: 0 0.25rem;
  }

  &-platform {
    display: flex;
    align-items: center;
    @include font-p-regular-130;

    &--desktop {
      display: none;
    }

    > a {
      color: $color-primary-100;
      text-decoration: none;
      margin: 0 0.25rem;
    }

    svg {
      height: 15px;
      width: 15px;
      fill: $color-primary-100;
      margin-bottom: 5px;
      margin-left: 5px;
    }
  }

  > h2 {
    @include font-lead-medium-130;
    margin: 0;
    margin-bottom: 10px;
    color: $color-gray-100;
  }

  > p {
    @include font-p-regular-160;
    color: $color-gray-100;
    margin: 0;
    margin-bottom: 10px;
  }

  @include media-breakpoint-up('md') {
    &-platform {
      &--desktop {
        display: flex;
      }
    }
  }
}
</style>
