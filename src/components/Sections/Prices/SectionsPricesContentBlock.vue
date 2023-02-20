<template>
  <section :class="$style['prices']">
    <div :class="$style['prices__grid']">
      <div :class="$style['prices__grid-container']">
        <h2>{{ block.title }}</h2>
        <p>{{ block.description }}</p>
        <ul :class="$style['prices__grid-list']">
          <li v-for="(item, index) in block.list">
            <div :class="$style['prices__grid-list_text']">
              {{ item.title }}
              <span> {{ item.price }}</span>
            </div>
            <div :class="$style['prices__grid-list_svg']">
              <svg-icon name="external-link" />
            </div>
            <div :class="$style['prices__grid-list_svg--mobile']">
              <span>Записаться</span>
              <svg-icon name="back-arrow" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { PricesContentBlock } from '~/types/models/prices.js'

export default defineComponent({
  name: 'SectionsPricesContentBlock',
  props: {
    block: { type: Object as PropType<PricesContentBlock>, default: () => {} },
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

      > li {
        padding: 16px 0 11px;
        display: flex;
        flex-direction: column;
        color: $color-gray-100;
        grid-gap: 6px;

        & + li {
          border-top: 2px solid $color-gray-4;
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

      &_svg {
        padding: 11px 0 9px;
        display: none;

        > svg {
          height: 30px;
          width: 30px;
          fill: $color-gray-100;
        }

        &--mobile {
          display: flex;
          align-items: center;

          > span {
            @include font-lead-medium-160;
            margin-top: 1px;
            color: $color-gray-100;
          }

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
        > li {
          padding: 16px 0;
          flex-direction: row;
          grid-gap: initial;
          justify-content: space-between;
          align-items: center;
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

        > p {
          padding-right: 120px;
          margin-bottom: 32px;
        }
      }

      &-list {
        > li {
          padding: 20px 0;
        }

        &_svg {
          display: block;
          height: fit-content;

          &--mobile {
            display: none;
          }
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 2 / 12;

        > p {
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
