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
          [this.$style['journal__content-main']]: true,
        },
      },
      [
        this.$slots.header,
        this.$createElement(
          'ul',
          {
            class: {
              [this.$style['journal__content-grid']]: true,
              [this.$style['journal__content-grid--loading']]: this.isLoading,
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
        this.$slots.footer,
      ]
    )
  },
})
</script>

<style lang="scss" module>
.journal__content {
  &-main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &-grid {
    display: grid;
    opacity: 1;
    grid-template-columns: 264px 264px 264px;
    grid-gap: 24px;
    grid-auto-rows: 355px;
    width: 100%;
    z-index: 4;
    margin-right: auto;
    padding-right: 24px;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
      padding-right: initial;
    }

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
    }

    &--loading {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
