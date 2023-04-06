<template>
  <section :class="$style['prices']">
    <div :class="$style['prices__grid']">
      <div :class="$style['prices__grid-container']">
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
        <ul
          :class="{
            [$style['prices__grid-list']]: true,
          }"
        >
          <li v-for="(item, index) in block" @click="onShowCallback(index)">
            <div
              :class="{
                [$style['prices__grid-list-item']]: true,
                [$style['prices__grid-list-item--disable']]:
                  isModalOpen && activeItemIndex === index,
              }"
            >
              <loader v-if="isLoading && activeItemIndex == index" color="green" />
              <div :class="$style['prices__grid-list_text']">
                {{ item.name }}
                <span>
                  {{ getPriceText(item) }}
                </span>
              </div>
              <div :class="$style['prices__grid-list_appointment']">
                <span>Записаться</span>
                <div :class="$style['prices__grid-list_svg']">
                  <svg-icon name="external-link" />
                </div>
                <div :class="$style['prices__grid-list_svg--mobile']">
                  <svg-icon name="back-arrow" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { PriceListItem } from '~/types/models/prices.js'
import { formatNumber } from '~/lib/utils'

import Loader from '~/components/Common/Loader.vue'

export default defineComponent({
  name: 'SectionsPricesContentBlock',
  components: {
    Loader,
  },
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    block: { type: Array as PropType<PriceListItem[]>, default: () => [] },
  },
  data() {
    return {
      isLoading: false,
      isModalOpen: false,
    }
  },
  computed: {},
  methods: {
    getPriceText(item: any): string {
      if (item.price_max) {
        return `Цена от ${formatNumber(item.price_min)} ₽ до
        ${formatNumber(this.item.price_max)}} ₽ за услугу`
      } else {
        return `Цена ${formatNumber(item.price_min)} ₽ за услугу`
      }
    },
    onShowCallback(index: number) {
      this.activeItemIndex = index
      this.isLoading = true
      this.$modal.show({
        bind: {
          name: 'Callback',
        },
        on: {
          'before-open': () => {
            this.isLoading = false
            this.isModalOpen = true
          },
          'before-close': () => {
            this.isModalOpen = false
          },
        },
        component: () =>
          import(
            '~/components/Modal/Content/Callback/ModalContentCallback.vue'
          ),
      })
    },
  },
})
</script>

<style lang="scss" module>
.prices {
  & + & {
    margin-top: 64px;
  }

  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;
      display: flex;
      flex-direction: column;

      > h2 {
        @include font-h2-medium;
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

      > span {
        @include font-lead-regular-160;
        padding: 24px 0;
        color: $color-gray-64;
      }
    }

    &-list {
      padding: 0;
      margin: 0;
      list-style: none;

      &-item {
        padding: 16px 0 11px;
        display: flex;
        flex-direction: column;
        color: $color-gray-100;
        grid-gap: 6px;
        cursor: pointer;
        position: relative;

        &--disable {
          opacity: 0.4;
        }
      }

      > li {
        border-top: 2px solid transparent;
        transition: background-color 0.25s ease, border-radius 0.25s ease;

        & + li {
          border-top: 2px solid $color-gray-4;
        }

        &:hover {
          border-radius: 16px;
          background-color: $color-gray-4;
          border-top: 2px solid transparent;

          & + li {
            border-top: 2px solid transparent;
          }

          svg {
            fill: $color-primary-100;
            transition: fill 0.25s ease;
          }

          .prices__grid-list_appointment {
            > span {
              opacity: 1;
            }
          }
        }
      }

      &_text {
        @include font-h6-medium;
        display: flex;
        flex-direction: column;
        grid-gap: 8px;

        > span {
          @include font-p-regular-130;
        }
      }

      &_appointment {
        padding: 11px 0 9px;
        display: flex;
        align-items: center;

        > span {
          @include font-lead-medium-160;
          margin-top: 1px;
          color: $color-gray-100;
          transition: opacity 0.25s ease;
        }
      }

      &_svg {
        display: none;

        > svg {
          height: 30px;
          width: 30px;
          fill: $color-gray-100;
        }

        &--mobile {
          > svg {
            height: 30px;
            width: 30px;
            fill: $color-primary-100;
          }
        }
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }

      &-list {
        &-item {
          padding: 16px 0;
          flex-direction: row;
          grid-gap: initial;
          justify-content: space-between;
          align-items: center;
        }

        &_text {
          margin-right: 8px;
        }

        &_appointment {
          > span {
            margin-right: 4px;
          }
        }

        &_svg {
          &--mobile {
            height: fit-content;
          }
        }
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      &-container {
        grid-column: 2 / 10;

        > h2 {
          padding: 0 24px;
        }

        > p {
          padding: 0 24px;
          padding-right: 120px;
          margin-bottom: 32px;
        }
      }

      &-list {
        &-item {
          padding: 20px 24px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 1 / 13;
        padding: 0 72px;

        > p {
          padding-right: 192px;
        }
      }

      &-list {
        &_svg {
          display: block;
          height: fit-content;

          &--mobile {
            display: none;
          }
        }

        &_appointment {
          > span {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
