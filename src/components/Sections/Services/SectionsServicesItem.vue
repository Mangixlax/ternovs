<template>
  <div :class="$style['services__item']">
    <img
      alt="Изображение услуги"
      :src="$img(`/sections/services/${item.image}.png`)"
      :class="$style['services__item-avatar-author']"
    />
    <h3>{{ item.title }}</h3>
    <p>{{ item.description }}</p>
    <div :class="$style['services__item-link']">
      <span>Подробнее</span>
      <svg-icon name="back-arrow" />
    </div>

    <nuxt-link :to="item.route"></nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ServiceItem } from '@/types/models/servises'

export default defineComponent({
  name: 'SectionsServicesItem',
  props: {
    item: { type: Object as PropType<ServiceItem>, default: () => {} },
  },
})
</script>

<style lang="scss" module>
.services__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  > img {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-bottom: 32px;
  }

  > h3 {
    @include font-h6-medium;
    margin: 0;
    margin-bottom: 16px;
    color: $color-gray-100;
  }

  > p {
    @include font-p-regular-160;
    margin: 0;
    margin-bottom: 16px;
    color: $color-gray-100;
  }

  &-link {
    @include font-p-medium-160;
    color: $color-gray-100;
    display: flex;

    > span {
      margin-top: 5px;
    }

    > svg {
      height: 30px;
      width: 30px;
      fill: $color-primary-100;
    }
  }

  > a {
    position: absolute;
    inset: 0;
  }

  @include media-breakpoint-up('lg') {
    padding: 24px;
  }
}
</style>
