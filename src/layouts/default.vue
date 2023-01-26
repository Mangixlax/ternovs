<template>
  <div>
    <nuxt />
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

@Component({
  components: {
    BaseCallback,
    BaseAccordionsHome,
    BaseFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module></style>
