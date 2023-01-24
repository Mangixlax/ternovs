<template>
  <div>
    <nuxt />
    <base-accordions-home/>
    <base-footer />
  </div> 
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseFooter from '@/components/Base/BaseFooter/BaseFooter.vue'
import BaseAccordionsHome from '@/components/Base/BaseAccordion/BaseAccordionsHome.vue'

@Component({
  components: {
    BaseFooter,
    BaseAccordionsHome,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module></style>
