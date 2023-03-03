<template functional>
  <hr v-bind="data.attrs" :class="$style['hr']" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentDivider',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
})
</script>

<style lang="scss" module>
.hr {
  position: relative;
  width: 100%;
  height: 28px;
  margin: 12px 0;
  border: none;

  &:before {
    content: '* * *';
    position: absolute;
    color: rgba(25, 31, 46, 0.4);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
