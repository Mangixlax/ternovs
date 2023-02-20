<template>
  <div :class="$style['accordions']">
    <base-accordion-item
      v-for="(accordion, i) in list"
      :key="i"
      :title="accordion.title"
      :active="accordion.is_active"
      :class="$style['accordions-item']"
    >
      <p v-for="(item, index) in accordion.content">
        {{ item }}
      </p>
    </base-accordion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AccordionItem } from '@/types/components/components'

import BaseAccordionItem from '@/components/Base/BaseAccordion/BaseAccordionItem.vue'
import BaseAccordionTabs from '@/components/Base/BaseAccordion/BaseAccordionTabs.vue'

export default defineComponent({
  name: 'BaseAccordions',
  components: { BaseAccordionItem, BaseAccordionTabs },
  props: {
    list: { type: Array as PropType<AccordionItem[]>, default: () => [] },
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
}
</style>
