<template>
  <ol v-if="breadcrumbs.length" :class="$style['breadcrumbs']" v-bind="$attrs">
    <li
      v-for="(crumb, i) in breadcrumbs"
      :key="i"
      :class="$style['breadcrumbs__item']"
    >
      <nuxt-link
        :to="crumb.route"
        :title="crumb.name"
        :class="{
          [$style['breadcrumbs__item-link']]: true,
          [$style['disabled']]: crumb.disabled || i === breadcrumbs.length - 1,
        }"
        v-text="crumb.name"
      />
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import type { WithContext, BreadcrumbList } from 'schema-dts'

import { getSiteUrl } from '@/lib/utils'

export default defineComponent({
  name: 'CommonBreadCrumbs',
  computed: {
    ...mapGetters({
      breadcrumbs: 'getBreadcrumbs',
    }),
  },
  jsonld(): WithContext<BreadcrumbList> {
    const items = ((this as any).breadcrumbs || []).map(
      (item: any, index: number) => {
        return {
          '@type': 'ListItem',
          position: index + 2,
          item: {
            '@id': getSiteUrl(this.$router.resolve(item.route).href, true),
            name: item.name,
          },
        }
      }
    )

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': getSiteUrl(
              this.$router.resolve({ name: 'index' }).href,
              true
            ),
            name: 'Главная',
          },
        },
        ...items,
      ],
    }
  },
})
</script>

<style lang="scss" module>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  @include container;

  @media (max-width: 768px) {
    display: none;
  }

  &__item {
    display: flex;
    align-items: center;

    & + &:before {
      content: '/';
      display: inline-block;
      margin-right: 12px;
      color: $color-gray-24;
    }

    &-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: $color-gray-48;
      margin-right: 12px;
      @include font-small-medium;

      svg {
        width: 18px;
        height: 18px;
        fill: $color-gray-80;
      }

      &.disabled {
        pointer-events: none;
        color: $color-gray-32;
        text-decoration: none;
      }
    }
  }
}
</style>
