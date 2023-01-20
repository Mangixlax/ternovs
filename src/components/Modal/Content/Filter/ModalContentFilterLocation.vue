<template>
  <div :class="$style['locality']">
    <div
      v-for="(v, i) in Array(100)"
      :key="i"
      :class="$style['locality__title']"
    >
      Много много фильтров
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ModalContentFilterLocation extends Vue {}
</script>

<style lang="scss" module>
.locality {
  max-width: 352px;
  width: 100%;

  &__title {
    @include size-20-semi-bold;
  }

  &__description {
    @include size-14-regular;
    margin: 24px 0;
  }
}
</style>
