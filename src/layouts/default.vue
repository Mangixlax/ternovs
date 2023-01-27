<template>
  <div>
    <nuxt />
    <layout-callback />
    <layout-accordion />
    <base-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LayoutCallback from '@/components/Layout/LayoutCallback'
import LayoutAccordion from '@/components/Layout/LayoutAccordion'
import BaseFooter from '@/components/Base/BaseFooter/BaseFooter.vue'

@Component({
  components: {
    LayoutCallback,
    LayoutAccordion,
    BaseFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module></style>
