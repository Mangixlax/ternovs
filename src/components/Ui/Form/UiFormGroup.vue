<template functional>
  <component
    v-bind="data.attrs"
    :is="props.tag"
    :class="{
      [$style['group']]: true,
      [$style['group--vertical']]: props.variant == 'vertical',
      [$style['group--horizontal']]: props.variant == 'horizontal',
    }"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UiFormGroup',
  props: {
    variant: { type: String, default: 'vertical' },
    tag: { type: String, default: 'input' },
  },
})
</script>

<style lang="scss" module>
.group {
  display: flex;

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }
}

.group + .group {
  margin-top: 4px;
}
</style>
