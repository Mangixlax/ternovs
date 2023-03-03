<template>
  <div>
    <base-header />
    <nuxt />
    <layout-accordion />
    <base-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import BaseHeader from '@/components/Base/BaseHeader/BaseHeader.vue'
import LayoutAccordion from '@/components/Layout/LayoutAccordion.vue'
import BaseFooter from '@/components/Base/BaseFooter/BaseFooter.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    BaseHeader,
    LayoutAccordion,
    BaseFooter,
  },
})
</script>

<style lang="scss" module></style>
