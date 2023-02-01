<template>
  <li :class="$style['item']">
    <nuxt-link :to="item.route" :class="$style['item-link']">
      {{ item.label }}
    </nuxt-link>
    <svg-icon name="dropdown-menu" v-if="item.list?.length" />
    <ul v-if="item.list?.length">
      <li v-for="(link, index) in item.list" :key="index">
        <nuxt-link :to="link.route">
          {{ link.label }}
        </nuxt-link>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { Location } from 'vue-router/types/router'

interface navItem {
  label: string
  route: Location
  links?: Location[]
}

@Component
export default class BaseHeaderNavItem extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: navItem
  public isHoverOnItem: boolean = false
  public isShowDropdown: boolean = false

  @Watch('$route')
  onRouteChange() {
    this.isShowDropdown = false
  }

  public onMouseEnter() {
    this.isHoverOnItem = true
  }

  public onMouseLeave() {
    this.isHoverOnItem = false
  }
}
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
    display: none;
    background: #eef7f1;
    left: -20px;

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
      display: flex;
      flex-direction: column;
    }

    svg {
      transform: rotate(180deg);
    }
  }
}
</style>
