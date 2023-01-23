<template>
  <div>
    <nuxt />
    <base-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseFooter from '@/components/Base/BaseFooter/BaseFooter.vue'

@Component({
  components: {
    BaseFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module></style>
