<template>
  <ol v-if="breadcrumbs.length" :class="$style['breadcrumbs']" v-bind="$attrs">
    <li
      v-for="(crumb, i) in breadcrumbs"
      :key="i"
      :class="$style['breadcrumbs__item']"
    >
      <svg-icon v-if="i != 0" name="sort-right" />
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
      breadcrumbs: 'getBreadCrumbs',
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
  display: none;

  &__item {
    display: flex;
    align-items: center;

    > svg {
      width: 11px;
      height: 11px;
      fill: $color-gray-16;
      margin-right: 10px;
    }

    &-link {
      @include font-small-regular;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: $color-gray-72;
      margin-right: 10px;
      padding: 6px 0 4px;

      &.disabled {
        pointer-events: none;
        color: $color-gray-40;
        text-decoration: none;
      }
    }
  }

  @include media-breakpoint-up('md') {
    display: flex;
    margin-bottom: 48px;
  }

  @include media-breakpoint-up('lg') {
    margin-bottom: 32px;
  }

  @include media-breakpoint-up('xl') {
    margin-bottom: 64px;
  }
}
</style>
