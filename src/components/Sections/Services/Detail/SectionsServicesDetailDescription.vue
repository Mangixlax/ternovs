<template>
  <div :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h2>{{ descriprion.title }}</h2>
        <span>{{ descriprion.subtitle }}</span>
        <p v-html="descriprion.text"></p>
        <h3>Особенности</h3>
        <p v-html="descriprion.text_2"></p>
        <ul :class="$style['services__grid-list']">
          <li
            v-for="(item, index) in descriprion.list"
            :class="$style['services__grid-item']"
          >
            <span>
              <svg-icon name="ok"> </svg-icon>
            </span>
            {{ item }}
          </li>
        </ul>
        <p v-html="descriprion.text_3"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ServiceItemContentDescription } from '@/types/models/servises'

import SectionsServicesItem from '@/components/Sections/Services/SectionsServicesItem.vue'

export default defineComponent({
  name: 'SectionsServicesDetailDescription',
  components: {
    SectionsServicesItem,
  },
  props: {
    descriprion: {
      type: Object as PropType<ServiceItemContentDescription>,
      default: () => {},
    },
  },
})
</script>

<style lang="scss" module>
.services {
  width: 100%;
  padding: 40px 0;

  &__grid {
    @include grid-container;
    padding: 0;

    &-container {
      grid-column: 1 / 5;
      grid-row: 1 / 2;
      padding: 0 12px;

      > h2 {
        @include font-h2-medium;
        margin: 0;
        margin-bottom: 8px;
        color: $color-gray-100;
      }

      > span {
        @include font-h5-medium;
        color: $color-gray-100;
        margin-bottom: 24px;
      }

      > h3 {
        @include font-h3-medium;
        margin-bottom: 24px;
        margin-top: 56px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        color: $color-gray-88;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }

      > button {
        margin: 0 auto;
      }

      > ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0;
        padding: 0;
        list-style: none;
        grid-gap: 24px;
        margin: 24px 0;

        > li {
          @include font-p-regular-160;
          display: flex;
          flex-direction: column;
          color: $color-gray-100;

          > span {
            padding: 7px 9px 11px 9px;
            border-radius: 30px;
            background: $color-primary-8;
            width: fit-content;
            display: flex;
            margin-bottom: 16px;

            svg {
              fill: $color-primary-100;
              height: 30px;
              width: 30px;
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        padding: 0;
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 48px 0;

    &__grid {
      &-container {
        grid-column: 2 / 9;

        > ul {
          padding-right: 192px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 36px 0;

    &__grid {
      &-container {
        grid-column: 2 / 12;

        > ul {
          margin: 32px 0;
        }

        > span {
          margin-bottom: 32px;
        }
      }
    }
  }
}
</style>
