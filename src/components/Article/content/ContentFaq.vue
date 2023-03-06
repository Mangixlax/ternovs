<template>
  <div :class="$style['accordions']">
    <base-accordion-item
      v-for="(accordion, i) in block.data.list"
      :key="i"
      :title="accordion.question"
      :active="i == 0"
      :class="$style['accordions-item']"
    >
      <p>
        {{ accordion.answer }}
      </p>
    </base-accordion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import BaseAccordionItem from '@/components/Base/BaseAccordion/BaseAccordionItem.vue'

export default defineComponent({
  name: 'ContentFaq',
  components: { BaseAccordionItem },
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
  jsonld() {
    const items = (this.list || []).map((item: any) => {
      return {
        '@type': 'Question',
        name: item.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.content.join(' '),
        },
      }
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items,
    }
  },
})
</script>

<style lang="scss" module>
.accordions {
  width: 100%;

  &-item {
    & + & {
      border-top: solid 2px $color-primary-8;
    }

    p {
      & + p {
        margin-top: 8px;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 0 96px;
  }
}
</style>
