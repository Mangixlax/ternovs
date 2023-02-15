<template>
  <div :class="$style['mobile-menu']">
    <transition name="mobile__menu">
      <div :class="$style['mobile-menu__grid']" v-if="isMobileMenuOpen">
        <div :class="$style['mobile-menu__grid-container']">
          <div :class="$style['mobile-menu__grid-header']">
            <div
              @click="closeMobileMenu"
              :class="$style['mobile-menu__grid-close']"
            >
              <svg-icon name="close"></svg-icon>
            </div>
          </div>
          <div :class="$style['mobile-menu__grid-body']">
            <ul>
              <base-header-nav-item-mobile
                v-for="(item, index) in menu"
                :item="item"
                :key="index"
                :isOpen="index === 0"
                :class="$style['mobile-menu__grid-item']"
              >
              </base-header-nav-item-mobile>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mobile__menu-overlay">
      <div
        v-if="isMobileMenuOpen"
        :class="$style['mobile-menu__overlay']"
        @click="closeMobileMenu"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { MenuItem } from '@/types/components/header'
import { getScrollbarWidth } from '@/lib/utils'
import BaseHeaderNavItemMobile from '@/components/Base/BaseHeader/BaseHeaderNavItemMobile.vue'

@Component({
  components: {
    BaseHeaderNavItemMobile,
  },
})
export default class BaseHeaderMobile extends Vue {
  @Prop({ type: Array, default: () => [] }) menu!: MenuItem[]
  @Prop({ type: Boolean, default: false }) isMobileMenuOpen!: boolean

  @Watch('isMobileMenuOpen')
  onChangeMenuIsOpen(isOpen: boolean) {
    if (isOpen) {
      document.body.setAttribute('menu-open', '')
      document.body.style.setProperty(
        '--modal-padding',
        getScrollbarWidth() + 'px'
      )
    } else {
      document.body.removeAttribute('menu-open')
      document.body.style.setProperty('--modal-padding', '0')
    }
  }

  @Watch('$route')
  onRouteChange() {
    this.$emit('closeMobileMenu')
  }

  public closeMobileMenu() {
    this.$emit('closeMobileMenu')
  }
}
</script>

<style lang="scss" module>
body[menu-open] {
  overflow: hidden;
}

.mobile-menu {
  &__grid {
    @include grid-container;
    position: fixed;
    background: $color-white-100;
    width: 100vw;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    z-index: 1000;
    padding: 32px 12px 24px 12px;
    width: 100%;

    &-container {
      grid-column: 1 / 5;
    }

    &-header {
      cursor: pointer;
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    &-close {
      display: flex;
      padding: 4px 6px 6px 6px;

      svg {
        height: 30px;
        width: 30px;
        fill: $color-gray-100;
      }
    }

    &-body {
      width: 100%;
      margin-top: 32px;

      > ul {
        padding: 0;
        list-style: none;
      }
    }
  }

  &__overlay {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    display: none;

    &__grid {
      &-container {
        grid-column: 1 / 11;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 1 / 13;
      }
    }
  }
}
</style>
