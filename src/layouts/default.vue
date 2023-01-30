<template>
  <div>
    <base-header />
    <nuxt />
    <layout-callback />
    <layout-accordion />
    <base-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseHeader from '@/components/Base/BaseHeader/BaseHeader.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'
import LayoutAccordion from '@/components/Layout/LayoutAccordion.vue'
import BaseFooter from '@/components/Base/BaseFooter/BaseFooter.vue'

@Component({
  components: {
    BaseHeader,
    LayoutCallback,
    LayoutAccordion,
    BaseFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module></style>
