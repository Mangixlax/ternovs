<template>
  <li :class="$style['item']">
    <nuxt-link
      :to="item.route"
      :class="$style['item-link']"
      :active-class="$style['item-link--active']"
    >
      {{ item.label }}
    </nuxt-link>
    <svg-icon name="dropdown-menu" v-if="item.list?.length" />
    <ul v-if="item.list?.length">
      <li v-for="(link, index) in item.list" :key="index">
        <nuxt-link :to="link.route" :active-class="$style['item-link--active']">
          {{ link.label }}
        </nuxt-link>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { MenuItem } from '@/types/components/header'

export default defineComponent({
  name: 'BaseHeaderNavItem',
  props: {
    item: { type: Object as PropType<MenuItem>, default: () => {} },
  },
  data() {
    return {
      isHoverOnItem: <boolean>false,
      isShowDropdown: <boolean>false,
    }
  },
  watch: {
    $route() {
      this.isShowDropdown = false
    },
  },
  methods: {
    onMouseEnter() {
      this.isHoverOnItem = true
    },
    onMouseLeave() {
      this.isHoverOnItem = false
    },
  },
})
</script>

<style lang="scss" module>
.item {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;

  &-link {
    @include font-p-medium-160;
    text-decoration: none;
    color: $color-gray-100;
    padding-top: 4px;

    &--active {
      color: $color-gray-64 !important;
    }
  }

  svg {
    height: 11px;
    width: 11px;
    fill: $color-gray-100;
    margin-left: 4px;
    transition: transform 0.3s ease;
  }

  > ul {
    position: absolute;
    padding: 0 20px;
    padding-bottom: 10px;
    padding-top: 8px;
    top: 100%;
    list-style: none;
    opacity: 0;
    background: #eef7f1;
    left: -20px;
    display: flex;
    flex-direction: column;
    transition: opacity 0.3s ease;
    pointer-events: none;

    > li {
      a {
        @include font-p-medium-160;
        text-decoration: none;
        color: $color-gray-100;
        padding-top: 4px;
        white-space: nowrap;
      }

      & + li {
        margin-top: 8px;
      }
    }
  }

  &:hover {
    > ul {
      opacity: 1;
      pointer-events: all;
    }

    svg {
      transform: rotate(180deg);
    }
  }
}
</style>
