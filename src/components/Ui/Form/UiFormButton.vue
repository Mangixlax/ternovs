<template functional>
  <component
    :is="props.tag"
    ref="button"
    v-on="listeners"
    v-bind="data.attrs"
    :class="[
      data.staticClass,
      data.class,
      {
        [$style['button']]: true,
        [$style['button--sm']]: props.variant === 'sm',
        [$style['button--md']]: props.variant === 'md',
        [$style['button--xl']]: props.variant === 'xl',
        [$style['button--full-size']]: props.fullSize,
        [$style['button--disable-hover']]: props.disableHover,
        [$style['button--disable-active']]: props.disableActive,
        [$style['button--padding-left']]: $slots['icon-before'],
        [$style['button--padding-right']]: $slots['icon-after'],
      },
    ]"
    :disabled="props.disabled"
  >
    <span
      v-if="$slots['icon-before']"
      :class="[$style['icon'], $style['icon--before']]"
    >
      <slot name="icon-before" />
    </span>
    <slot />
    <span
      v-if="$slots['icon-after']"
      :class="[$style['icon'], $style['icon--after']]"
    >
      <slot name="icon-after" />
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'
import { DefaultProps, RenderContext } from 'vue/types/options'
import { Location } from 'vue-router/types/router'

@Component
export default class UiFormButton extends Vue {
  @Prop({ type: String, default: 'button' })
  tag!: string

  @Prop({ type: String, default: 'sm' })
  variant!: string

  @Prop({ type: [String, Array], default: '' })
  textClasses!: string | string[]

  @Prop({ type: Boolean, default: false })
  border!: boolean

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  @Prop({ type: Boolean, default: false })
  fullSize!: boolean

  @Prop({ type: Boolean, default: false })
  withBlink!: boolean

  @Prop({ type: Boolean, default: false })
  disableHover!: boolean

  @Prop({ type: Boolean, default: false })
  disableActive!: boolean
}
</script>

<style lang="scss" module>
.button {
  @include font-p-medium-160;
  display: flex;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  border: none;
  justify-content: center;
  padding: 13px 24px 10px 24px;
  background-color: $color-primary-100;
  min-height: 42px;
  position: relative;
  transition: transform 0.25s ease-out;
  touch-action: manipulation;
  color: $color-white-100;
  text-decoration: none;
  border-radius: 28px;

  &--xl {
  }

  &--md {
  }

  &--sm {
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: transparent;
    border-radius: 28px;
    transition: background-color 0.25s ease;
    z-index: -1;
  }

  &:not(&--disable-hover):hover::before {
    background-color: $color-gray-8;
  }

  &--info:not(&--disable-hover):hover::before {
    background-color: $color-primary-8;
  }

  &:active:not(&--disable-active):not(:disabled) {
    transition: none;
    transform: scale(0.98);
  }

  &:active:not(&--disable-active)::before {
    background-color: $color-gray-24;
  }

  &:disabled::before {
    background-color: $color-gray-24;
  }

  &--info:active:not(&--disable-active)::before {
    background-color: $color-primary-24;
  }

  &--info:disabled::before {
    background-color: $color-primary-24;
  }

  &--full-size {
    width: 100%;
  }

  &--padding-left {
    padding: 15px 20px 15px 16px;
  }

  &--padding-right {
    padding: 15px 16px 15px 20px;
  }
}

.icon {
  height: 16px;
  width: 16px;
  position: relative;

  &--before {
    margin-right: 6px;
  }

  &--after {
    margin-left: 6px;
  }

  svg {
    height: 16px;
    width: 16px;
  }
}

@keyframes order-animation {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(400%);
  }
}
</style>
