<template functional>
  <component
    :is="props.tag"
    v-bind="data.attrs"
    v-on="listeners"
    :class="{ [$style['badge']]: true, [$style['badge--small']]: props.small }"
  >
    <span
      v-if="$slots['icon-before']"
      :class="[$style['icon'], $style['icon-before']]"
    >
      <slot name="icon-before"></slot>
    </span>
    <span :class="$style['text']">
      <slot></slot>
    </span>
    <span
      v-if="$slots['icon-after']"
      :class="[$style['icon'], $style['icon-after']]"
    >
      <slot name="icon-after"></slot>
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class UiBadge extends Vue {
  @Prop({ type: String, default: 'div' })
  tag!: string

  @Prop({ type: Boolean, default: false })
  small!: boolean
}
</script>

<style lang="scss" module>
.badge {
  @include size-12-regular;
  grid-gap: 3.5px;
  border-radius: 9px;
  background: $color-black-4;
  width: fit-content;
  padding: 8px 12px;
  color: $color-black-72;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;

  &--small {
    @include size-10-semi-bold;
    padding: 4px 8px;
  }
}

.icon {
  height: 16px;
  width: 16px;

  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
