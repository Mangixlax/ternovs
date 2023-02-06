<template>
  <header
    :class="{
      [$style['header']]: true,
      [$style['mobile-open']]: isMobileMenuOpen,
    }"
    :style="{ '--scrollbar-width': `${scrollbarWidth}px` }"
  >
    <div :class="$style['header__grid']">
      <div :class="$style['header__grid-inner']">
        <logo />
        <nav>
          <ul>
            <base-header-nav-item
              v-for="(item, index) in menu"
              :key="index"
              :item="item"
            />
          </ul>
        </nav>
        <div :class="$style['header__grid-contacts']">
          <a href="tel:+79611911116"> 8 961 191 11 16 </a>
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
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import BaseHeaderNavItem from '~/components/Base/BaseHeader/BaseHeaderNavItem.vue'
import BaseHeaderMobile from '~/components/Base/BaseHeader/BaseHeaderMobile.vue'

@Component({
  components: {
    Logo,
    BaseHeaderNavItem,
    BaseHeaderMobile,
  },
})
export default class BaseHeader extends Vue {
  public isShowOverlay: boolean = false
  public isMobileMenuOpen: boolean = false
  public scrollbarWidth: number = 15

  public menu: object[] = [
    {
      label: 'Услуги',
      route: { name: 'services' },
      list: [
        {
          label: 'Ортопедия',
          route: { name: 'services' },
        },
        {
          label: 'Хирургия',
          route: { name: 'services' },
        },
        {
          label: 'Ортодонтия',
          route: { name: 'services' },
        },
      ],
    },
    {
      label: 'Цены',
      route: { name: 'prices' },
    },
    {
      label: 'Отзывы',
      route: { name: 'reviews' },
    },
    {
      label: 'О клинике',
      route: { name: 'about' },
      list: [
        {
          label: 'Комманда',
          route: { name: 'about-our-team' },
        },
        {
          label: 'Портфолио',
          route: { name: 'about-portfolio' },
        },
        {
          label: 'Оборудование',
          route: { name: 'about-equipment' },
        },
      ],
    },
    {
      label: 'Контакты',
      route: { name: 'contacts' },
    },
    {
      label: 'Журнал',
      route: { name: 'journal' },
    },
  ]

  public calculateScrollbarWidth() {
    this.scrollbarWidth =
      window.innerWidth - document.scrollingElement!.clientWidth
  }

  mounted() {
    window.addEventListener('resize', this.calculateScrollbarWidth)
    this.calculateScrollbarWidth()
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.calculateScrollbarWidth)
  }
}
</script>

<style lang="scss" module>
.header {
  width: 100%;
  padding: 32px 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #eef7f1;

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
