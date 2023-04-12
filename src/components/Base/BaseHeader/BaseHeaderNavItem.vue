<template>
  <li
    :class="{
      [$style['item']]: true,
      [$style['item--sticky']]: sticky,
    }"
  >
    <nuxt-link
      :to="item.route"
      :class="$style['item-link']"
      :active-class="$style['item-link--active']"
    >
      {{ item.label }}
    </nuxt-link>
    <svg-icon name="dropdown-menu" v-if="item.list?.length" />
    <ul v-if="item.list?.length">
      <svg-icon name="up" />
      <li v-for="(link, index) in item.list" :key="index">
        <nuxt-link :to="link.route" :active-class="$style['item-link--active']">
          {{ link.label }}

          <svg-icon name="dropdown-menu" />
        </nuxt-link>
        <ul>
          <li v-for="(child, index) in link.childList" :key="index">
            <nuxt-link
              :to="child.route"
              :active-class="$style['item-link--active']"
            >
              {{ child.label }}
            </nuxt-link>
          </li>
        </ul>
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
    sticky: { type: Boolean, default: true },
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

  > svg {
    height: 11px;
    width: 11px;
    fill: $color-gray-100;
    margin-left: 4px;
    transition: transform 0.3s ease;
  }

  > ul {
    position: absolute;
    padding: 13px 0;
    top: 100%;
    list-style: none;
    background: #eef7f1;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    transition: opacity 0.3s ease;
    pointer-events: none;
    opacity: 0;
    border-radius: 8px;
    border: 1px solid $color-gray-4;

    > svg {
      height: 4px;
      width: 14px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      fill: #eef7f1;
    }

    > li {
      width: 170px;

      a {
        @include font-p-regular-130;
        text-decoration: none;
        color: $color-gray-100;
        padding: 7px 20px;
        white-space: nowrap;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > svg {
          transform: rotate(-90deg);
          width: 11px;
          height: 11px;
          fill: $color-gray-100;
          transition: transform 0.3s ease;
        }

        &:hover {
          color: $color-primary-100;
        }
      }

      > ul {
        position: absolute;
        left: 96%;
        top: -1px;
        background: #f6f6f6;
        padding: 13px 20px;
        list-style: none;
        height: calc(100% + 2px);
        display: flex;
        flex-direction: column;
        border-radius: 0 8px 8px 0;
        border: 1px solid $color-gray-4;
        opacity: 0;
        pointer-events: none;
        min-width: 300px;

        a {
          @include font-p-regular-130;
          text-decoration: none;
          color: $color-gray-100;
          padding: 7px 0;
          white-space: nowrap;

          &:hover {
            color: $color-primary-100;
          }
        }
      }

      &:hover {
        > ul {
          opacity: 1;
          pointer-events: all;
        }

        > a {
          > svg {
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  &--sticky {
    > ul {
      background-color: $color-white-100 !important;
      transition: all 0.3s ease;

      > svg {
        fill: $color-white-100;
        transition: all 0.3s ease;
      }
    }
  }

  &:hover {
    > ul {
      opacity: 1;
      pointer-events: all;
    }

    > svg {
      transform: rotate(180deg);
    }
  }
}
</style>
