<template>
  <div :class="$style['navigation']">
    <div :class="$style['navigation__grid']">
      <div :class="$style['navigation__grid-container']">
        <h1>Журнал о стоматологии</h1>
        <p>
          Главная цель нашего журнала — ликвидировать стоматологическую
          безграмотность среди обычных пациентов. Мы хотим, чтобы все узнали о
          новых приемах и технологиях в стоматологии и о том, что врачей не
          нужно бояться. Расскажем, какие именно процедуры ждут в каждой
          конкретной ситуации, сколько они должны занимать времени и как оценить
          компетентность стоматолога.
        </p>
        <div
          :class="[
            $style['navigation__grid-nav'],
            $style['navigation__grid-nav--mobile'],
          ]"
        >
          <base-scroll-block>
            <ul>
              <li>
                <nuxt-link
                  :class="{
                    [$style['link']]: true,
                    [$style['link--active']]: getActiveLink('zhurnal'),
                  }"
                  :to="{ name: 'zhurnal' }"
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
                    [$style['link']]: true,
                    [$style['link--active']]: getActiveLink(item.slug),
                  }"
                  :to="{
                    name: 'zhurnal',
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
        </div>
        <div
          :class="[
            $style['navigation__grid-nav'],
            $style['navigation__grid-nav--desktop'],
          ]"
        >
          <ul>
            <li>
              <nuxt-link
                :class="{
                  [$style['link']]: true,
                  [$style['link--active']]: getActiveLink('zhurnal'),
                }"
                :to="{ name: 'zhurnal' }"
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
                  [$style['link']]: true,
                  [$style['link--active']]: getActiveLink(item.slug),
                }"
                :to="{
                  name: 'zhurnal-category',
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
        </div>
      </div>
    </div>
  </div>
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
.navigation {
  width: 100%;
  padding: 80px 0 40px;

  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-88;
      }
    }

    &-nav {
      ul {
        list-style: none;
        display: flex;

        > li {
          display: flex;

          &:not(:last-child) {
            margin-right: 16px;
          }

          .link {
            padding: 12px 20px 7px 20px;
            @include font-p-medium-160;
            cursor: pointer;
            color: $color-gray-100;
            text-decoration: none;
            border-radius: 100px;
            background: $color-gray-6;
            white-space: nowrap;

            &--active {
              color: $color-primary-100;
            }
          }
        }
      }

      &--mobile {
        width: calc(100% + 24px);
        position: relative;
        left: -12px;

        ul {
          li:first-child {
            padding-left: 12px;
          }
        }
      }

      &--desktop {
        display: none;

        ul {
          flex-wrap: wrap;
          grid-row-gap: 24px;
        }
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }

      &-nav {
        &--mobile {
          display: none;
        }

        &--desktop {
          display: block;
        }
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 0 48px;

    &__grid {
      &-container {
        grid-column: 1 / 11;

        > p {
          padding-right: 192px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 72px;

    &__grid {
      &-container {
        grid-column: 2 / 13;

        > h1 {
          margin-bottom: 32px;
        }

        > p {
          padding-right: 192px;
          margin-bottom: 32px;
        }
      }
    }
  }
}
</style>
