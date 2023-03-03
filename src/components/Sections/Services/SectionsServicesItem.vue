<template>
  <div :class="$style['services__item']">
    <img
      alt="Изображение услуги"
      :src="image"
      :class="$style['services__item-avatar-author']"
    />
    <h3>{{ item.name }}</h3>
    <p>{{ item.short_excerpt }}</p>
    <div :class="$style['services__item-link']">
      <span>Подробнее</span>
      <svg-icon name="back-arrow" />
    </div>
    <nuxt-link
      :to="{
        name: 'uslugi-category-direction',
        params: {
          category: categorySlug,
          direction: item.slug,
        },
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ServiceItem } from '~/types/models/Servises.js'

export default defineComponent({
  name: 'SectionsServicesItem',
  props: {
    item: { type: Object as PropType<ServiceItem>, default: () => {} },
    categorySlug: { type: String, default: '' },
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
        return ''
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
  position: relative;

  > img {
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-bottom: 32px;
    object-fit: cover;
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
