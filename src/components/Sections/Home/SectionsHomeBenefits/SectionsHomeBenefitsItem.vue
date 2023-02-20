<template>
  <div :class="$style['benefits__item']">
    <div :class="$style['benefits__item-icon']">
      <svg-icon :name="item.icon" />
    </div>
    <div :class="$style['benefits__item-title']" v-html="item.title" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { HomeBenefitsItem } from '@/types/models/home'

export default defineComponent({
  name: 'SectionsHomeBenefitsItem',
  props: {
    item: { type: Object as PropType<HomeBenefitsItem>, default: () => {} },
  },
})
</script>

<style lang="scss" module>
.benefits__item {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-icon {
    padding: 19px 17px 23px 17px;
    border-radius: 0 0 100px 100px;
    background: $color-primary-8;
    width: fit-content;
    height: fit-content;
    margin-bottom: 16px;
    display: flex;

    svg {
      height: 30px;
      width: 30px;
      fill: $color-primary-100;
    }
  }

  &-title {
    @include font-h6-medium;
    color: $color-gray-100;
    margin-bottom: 16px;
  }
}
</style>
