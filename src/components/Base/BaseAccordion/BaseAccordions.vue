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
import BaseAccordionItem from '@/components/Base/BaseAccordion/BaseAccordionItem.vue'
import BaseAccordionTabs from '@/components/Base/BaseAccordion/BaseAccordionTabs.vue'

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Jsonld } from 'nuxt-jsonld'

@Jsonld
@Component({
  components: { BaseAccordionItem, BaseAccordionTabs },
})
export default class BaseAccordions extends Vue {
  @Prop({ type: Array, default: () => {} }) list!: object[]

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
  }
}
</script>

<style lang="scss" module>
.accordions {
  width: 100%;

  &-item {
    & + & {
      border-top: solid 2px $color-primary-8;
    }
  }
}
</style>
