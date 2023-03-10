<template>
  <div :class="$style['services__item']">
    <div :class="$style['services__item-icon']">
      <img :src="image" :alt="`${item.name}`" />
    </div>
    <div :class="$style['services__item-title']">{{ item.name }}</div>
    <div :class="$style['services__item-text']">{{ item.excerpt }}</div>
    <nuxt-link :to="item.route" :class="$style['services__item-link']">
      <span>К услугам</span>
      <svg-icon :name="'back-arrow'" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SectionsHomeServicesItem',
  props: {
    item: { type: Object, default: () => {} },
  },
  computed: {
    image(): any {
      if (this.item.image) {
        const filePath = (this as any).item.image.filename
          .match(/.{1,3}/g)
          .slice(0, 3)
          .join('/')

        return this.$img(`s3/` + filePath + '/' + this.item.image.filename, {
          format: 'webp',
        })
      } else {
        return null
      }
    },
  },
})
</script>

<style lang="scss" module>
.services__item {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-icon {
    padding: 19px 17px 23px 17px;
    border-radius: 0 0 100px 100px;
    background: $color-white-100;
    width: fit-content;
    height: fit-content;
    margin-bottom: 16px;
    display: flex;

    img {
      height: 30px;
      width: 30px;
    }
  }

  &-title {
    @include font-h6-medium;
    color: $color-gray-100;
    margin-bottom: 16px;
  }

  &-text {
    @include font-p-regular-160;
    color: $color-gray-100;
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
}
</style>
