<template>
  <div>
    <nuxt />
    <base-callback />
    <layout-services />
    <layout-reviews />
    <base-callback />
    <base-accordions-home />
    <base-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseCallback from '@/components/Base/BaseCallback/BaseCallback.vue'
import BaseAccordionsHome from '@/components/Base/BaseAccordion/BaseAccordionsHome.vue'
import BaseFooter from '@/components/Base/BaseFooter/BaseFooter.vue'
import LayoutReviews from '@/components/Layout/LayoutReviews/LayoutReviews.vue'
import LayoutServices from '@/components/Layout/LayoutServices/LayoutServices.vue'

@Component({
  components: {
    LayoutServices,
    LayoutReviews,
    BaseCallback,
    BaseAccordionsHome,
    BaseFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module></style>
