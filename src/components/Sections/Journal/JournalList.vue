<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import JournalCard from '~/components/Sections/Journal/JournalCard.vue'

// TODO: TBD

export default defineComponent({
  name: 'CompaniesTypeList',
  components: { JournalCard },
  props: {
    isLoading: { type: Boolean, default: false },
    postsList: { type: Array, default: () => [] },
  },
  render() {
    return this.$createElement(
      'section',
      {
        class: {
          [this.$style['journal']]: true,
        },
      },
      [
        this.$createElement(
          'div',
          {
            class: {
              [this.$style['journal__grid']]: true,
            },
          },
          [
            this.$createElement(
              'div',
              {
                class: {
                  [this.$style['journal__grid-slot']]: true,
                },
              },
              [this.$slots.header]
            ),
            this.$createElement(
              'ul',
              {
                class: {
                  [this.$style['journal__grid-container']]: true,
                  [this.$style['journal__grid-container--loading']]:
                    this.isLoading,
                },
              },
              [
                (this.postsList as any).map((card: any, index: number) => {
                  return [
                    this.$slots[`item:${index}:prepend`],
                    this.$createElement('journal-card', {
                      props: { card: card },
                    }),
                    this.$slots[`item:${index}:append`],
                  ]
                }),
              ]
            ),
            this.$createElement(
              'div',
              {
                class: {
                  [this.$style['journal__grid-slot']]: true,
                },
              },
              [this.$slots.footer]
            ),
          ]
        ),
      ]
    )
  },
})
</script>

<style lang="scss" module>
.journal {
  width: 100%;
  padding: 48px 0;

  &__grid {
    @include grid-container;

    &-container {
      display: grid;
      opacity: 1;
      grid-template-columns: 1fr;
      grid-gap: 24px;
      grid-column: 1 / 5;
      z-index: 4;

      &--loading {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    &-slot {
      width: 100%;
      grid-column: 1 / 5;

      > h2 {
        @include font-h2-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        color: $color-gray-88;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-template-columns: 1fr 1fr;
        grid-column: 1 / 9;
      }
      &-slot {
        width: 100%;
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      &-container {
        grid-template-columns: 1fr 1fr;
        grid-column: 1 / 11;
        grid-gap: 0;
      }
      &-slot {
        width: 100%;
        grid-column: 1 / 11;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 36px 0 72px;

    &__grid {
      &-container {
        grid-template-columns: 1fr 1fr;
        grid-column: 1 / 13;
        grid-gap: 0;
        padding: 0 72px;
      }
      &-slot {
        width: 100%;
        grid-column: 2 / 12;

        > h2 {
          margin-bottom: 32px;
        }
      }
    }
  }
}
</style>
