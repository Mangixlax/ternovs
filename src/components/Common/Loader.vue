<template functional>
  <span
    :class="[
      $style['loader'],
    ]"
  >
    <svg-icon name="loader"/>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  // @ts-ignore
  name: 'Loader',
  functional: true,
})
</script>

<style lang="scss" module>
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 3;
  pointer-events: none;
  min-height: 24px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 24px;
    width: 24px;
    animation: rotation 1s ease-in-out infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
