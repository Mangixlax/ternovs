<template>
  <base-scroll-block>
    <ul :class="$style['nav']">
      <li :class="[$style['nav__item']]">
        <nuxt-link
          :class="{
            [$style['nav__item-link']]: true,
            [$style['nav__item-link--active']]: getActiveLink('journal'),
          }"
          :to="{ name: 'journal-category' }"
          title="Все"
        >
          Все
        </nuxt-link>
      </li>
      <li
        :class="[$style['nav__item']]"
        v-for="(item, index) in categoriesList"
        :key="index"
      >
        <nuxt-link
          :class="{
            [$style['nav__item-link']]: true,
            [$style['nav__item-link--active']]: getActiveLink(item.slug),
          }"
          :to="{
            name: 'journal-category',
            params: {
              category: item.slug,
            },
          }"
          :title="item.title"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </base-scroll-block>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import BaseScrollBlock from '~/components/Base/BaseScrollBlock/BaseScrollBlock.vue'

// TODO: TBD

export default defineComponent({
  name: 'JournalNavigation',
  components: {
    BaseScrollBlock,
  },
  props: {
    categoriesList: { type: Array as PropType<Array<any>>, default: () => [] },
  },
  methods: {
    getActiveLink(item: any) {
      return this.$route.path.split('/').slice(1, -1).pop() === item
    },
  },
})
</script>

<style lang="scss" module>
.nav {
  list-style: none;
  display: flex;
  @include container;

  &__item {
    display: flex;

    &:not(:last-child) {
      margin-right: 16px;
    }

    &-link {
      padding: 4px 2px 22px 2px;
      @include font-p-regular-160;
      cursor: pointer;
      color: $color-gray-56;
      text-decoration: none;
      border-bottom: 2px solid transparent;

      &--active {
        border-bottom: 2px solid $color-primary-100;
        color: $color-gray-88;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
}
</style>
