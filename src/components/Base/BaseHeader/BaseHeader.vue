<template>
  <header
    :class="{
      [$style['header']]: true,
      [$style['header--sticky']]: sticky,
      [$style['mobile-open']]: isMobileMenuOpen,
    }"
    :style="{ '--scrollbar-width': `${scrollbarWidth}px` }"
    ref="header"
  >
    <div :class="$style['header__grid']">
      <div :class="$style['header__grid-inner']">
        <logo />
        <nav>
          <ul>
            <base-header-nav-item
              v-for="(item, index) in extendedMenu"
              :key="index"
              :item="item"
              :sticky="sticky"
            />
          </ul>
        </nav>
        <div :class="$style['header__grid-contacts']">
          <a href="tel:+79253595999"> 8 925 359 59 99 </a>
          <span> г. Клин, ул. Чайковского, д. 105 </span>
        </div>
        <div
          :class="$style['header__grid-burger']"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg-icon
            :name="isMobileMenuOpen ? 'close' : 'burger'"
            :class="$style['header__container-burger-svg']"
          />
        </div>
      </div>
    </div>
    <base-header-mobile
      :menu="menu"
      :is-mobile-menu-open="isMobileMenuOpen"
      @closeMobileMenu="isMobileMenuOpen = false"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { MenuItem } from '@/types/components/header'

import Logo from '~/components/Logo.vue'
import BaseHeaderNavItem from '~/components/Base/BaseHeader/BaseHeaderNavItem.vue'
import BaseHeaderMobile from '~/components/Base/BaseHeader/BaseHeaderMobile.vue'

export default defineComponent({
  name: 'BaseHeader',
  components: {
    Logo,
    BaseHeaderNavItem,
    BaseHeaderMobile,
  },
  data() {
    return {
      isShowOverlay: <boolean>false,
      isMobileMenuOpen: <boolean>false,
      scrollbarWidth: <number>15,
      sticky: false,
    }
  },
  computed: {
    menu(): MenuItem[] {
      return [
        {
          label: 'Услуги',
          route: { name: 'uslugi' },
          list: [],
        },
        {
          label: 'Цены',
          route: { name: 'ceny-na-uslugi' },
        },
        {
          label: 'Отзывы',
          route: { name: 'otzyvy' },
        },
        {
          label: 'О клинике',
          route: { name: 'o-kompanii' },
          list: [
            {
              label: 'Команда',
              route: { name: 'doktora' },
            },
            {
              label: 'Портфолио',
              route: { name: 'portfolio' },
            },
            {
              label: 'Оборудование',
              route: { name: 'oborudovanie-kliniki' },
            },
          ],
        },
        {
          label: 'Контакты',
          route: { name: 'kontakty' },
        },
        {
          label: 'Журнал',
          route: { name: 'zhurnal' },
        },
      ]
    },
    servicesLinks() {
      return this.$store.getters['getCategoriesList'].map((item: any) => {
        return {
          label: item.short_name,
          route: {
            name: 'uslugi-category',
            params: {
              category: item.slug,
            },
          },
          childList: item.directions.map((direction: any) => {
            return {
              label: direction.name,
              route: {
                name: 'uslugi-category-direction',
                params: {
                  category: item.slug,
                  direction: direction.slug
                },
              },
            }
          }),
        }
      })
    },
    extendedMenu() {
      let extendedMenu = this.menu
      extendedMenu[0].list = this.servicesLinks
      return extendedMenu
    },
  },
  methods: {
    calculateScrollbarWidth() {
      this.scrollbarWidth =
        window.innerWidth - document.scrollingElement!.clientWidth
    },
    isSticky() {
      if (window.pageYOffset !== 0) {
        this.sticky = true
      } else {
        this.sticky = false
      }
    },
  },
  mounted() {
    this.isSticky()
    window.addEventListener('resize', this.calculateScrollbarWidth)
    window.addEventListener('scroll', this.isSticky)
    this.calculateScrollbarWidth()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.calculateScrollbarWidth)
    window.removeEventListener('scroll', this.isSticky)
  },
})
</script>

<style lang="scss" module>
.header {
  width: 100%;
  padding: 32px 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #eef7f1;
  transition: all 0.3s ease;

  &--sticky {
    background-color: #fff;
  }

  &__grid {
    @include grid-container;

    &-inner {
      grid-column: 1 / 5;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > nav {
        display: none;

        > ul {
          display: flex;
          grid-gap: 20px;
        }
      }
    }

    &-burger {
      padding: 4px 6px 6px 6px;
      display: flex;

      svg {
        height: 30px;
        width: 30px;
        fill: $color-gray-100;
      }
    }

    &-contacts {
      display: none;
      margin-left: auto;
      margin-right: 16px;

      > a {
        @include font-lead-medium-130;
        color: $color-gray-100;
        text-decoration: none;
      }

      > span {
        @include font-small-medium;
        color: $color-gray-72;
        white-space: nowrap;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-inner {
        grid-column: 1 / 9;
      }

      &-contacts {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      &-inner {
        grid-column: 1 / 11;

        > nav {
          display: flex;
          width: 100%;

          > ul {
            margin: 0 auto;
          }
        }
      }

      &-contacts {
        margin-left: initial;
      }

      &-burger {
        display: none;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-inner {
        grid-column: 1 / 13;
      }
    }
  }
}
</style>
