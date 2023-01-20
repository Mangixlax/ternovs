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
        [$style['button--variant-primary']]: props.variant === 'primary',
        [$style['button--variant-light']]: props.variant === 'light',
        [$style['button--variant-info']]: props.variant === 'info',

        [$style['button--small-padding']]: props.smallPadding,
        [$style['button--with-blink']]: props.withBlink,
        [$style['button--with-blink-gradient']]: props.withBlinkGradient,

        [$style['button--size-11-medium']]:
          props.fontVariant === 'size-11-medium',
        [$style['button--size-12-medium']]:
          props.fontVariant === 'size-12-medium',
        [$style['button--size-13-medium']]:
          props.fontVariant === 'size-13-medium',
        [$style['button--size-14-medium']]:
          props.fontVariant === 'size-14-medium',

        [$style['button--full-size']]: props.fullSize,

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
    <span
      :class="{
        [$style['text']]: true,
        [$style['text--hidden']]: props.loading,
      }"
    >
      <slot />
    </span>
    <component
      v-if="props.loading"
      :is="injections.components.Loader"
      :color="$options.methods.getLoaderColor(props.variant)"
      size="30px"
    />
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
import Loader from '~/components/Common/Loader.vue'
import { CreateElement, VNode } from 'vue'
import { DefaultProps, RenderContext } from 'vue/types/options'
import { Location } from 'vue-router/types/router'

/*
 * @TODO Convert this component to render function
 */

@Component({
  inject: {
    components: {
      default: {
        Loader,
      },
    },
  },
})
export default class UiFormButton extends Vue {
  @Prop({ type: String, default: 'button' })
  tag!: string

  @Prop({ type: String, default: '' })
  variant!: string

  @Prop({ type: String, default: 'size-13-medium' })
  fontVariant!: string

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
  loading!: boolean

  @Prop({ type: Boolean, default: false })
  withBlinkGradient!: boolean

  @Prop({ type: Boolean, default: false })
  smallPadding!: boolean

  @Prop({ type: Boolean, default: false })
  disableHover!: boolean

  @Prop({ type: Boolean, default: false })
  disableActive!: boolean

  getLoaderColor(variant: string = ''): string {
    if (!variant || ['info'].indexOf(variant) !== -1) {
      return 'rgba(0, 0, 0, 0.5)'
    }

    return 'rgba(255, 255, 255, 0.5)'
  }
}
</script>

<style lang="scss" module>
.button {
  display: flex;
  border-radius: 9px;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  border: none;
  justify-content: center;
  padding: 15px 20px;
  background-color: $color-white-100;
  min-height: 42px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
  transform: scale(1);
  touch-action: manipulation;
  color: $color-black-100;
  text-decoration: none;
  opacity: 1;

  &--size-11-medium {
    @include size-11-medium;
  }

  &--size-12-medium {
    @include size-12-medium;
  }

  &--size-13-medium {
    @include size-13-medium;
  }

  &--size-14-medium {
    @include size-14-medium;
    min-height: 46px;
  }

  &:disabled {
    opacity: 0.4;
  }

  .text {
    transition: color 0.25s ease;
  }

  //&--border {
  //  border: 1px solid $color-black-8;
  //}
  //
  //&--primary {
  //  background: $color-blue-100;
  //
  //  & .text {
  //    color: $color-white-100;
  //  }
  //}
  //
  //&--primary-light {
  //  background-color: $color-blue-8;
  //
  //  &:disabled:before {
  //    background-color: transparent;
  //  }
  //
  //  & .text {
  //    color: $color-blue-88;
  //  }
  //
  //  &:disabled .text {
  //    color: $color-blue-48;
  //  }
  //}
  //
  //&--info {
  //  background-color: $color-blue-8;
  //
  //  & .text {
  //    color: $color-blue-88;
  //  }
  //}

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: transparent;
    border-radius: 9px;
    transition: background-color 0.25s ease;
    z-index: -1;
  }

  &--variant-primary {
    background-color: $color-primary-100;

    &:hover:not(:disabled):before {
      background-color: $color-black-8;
    }

    &:active:not(:disabled):before {
      background-color: $color-black-24;
    }

    & .text {
      color: $color-white-100;
    }
  }

  &--variant-light {
    background-color: $color-white-100;

    &:hover:not(:disabled):before {
      background-color: $color-primary-8;
    }

    &:active:not(:disabled):before {
      background-color: $color-primary-16;
    }

    & .text {
      color: $color-primary-88;
    }
  }

  &--variant-info {
    background-color: $color-primary-8;

    &:hover:not(:disabled):before {
      background-color: $color-primary-8;
    }

    &:active:not(:disabled):before {
      background-color: $color-primary-100;
    }

    & .text {
      color: $color-primary-88;
    }

    &:active:not(:disabled) .text {
      color: $color-white-100;
    }
  }

  //&:not(&--disable-hover):hover::before {
  //  background-color: $color-black-8;
  //}
  //
  //&--info:not(&--disable-hover):hover::before {
  //  background-color: $color-blue-8;
  //}
  //
  //&:active:not(&--disable-active):not(:disabled) {
  //  transition: none;
  //  transform: scale(0.98);
  //}
  //
  //&:active:not(&--disable-active)::before {
  //  background-color: $color-black-24;
  //}
  //
  //&--info:active:not(&--disable-active)::before {
  //  background-color: $color-blue-24;
  //}

  //&--primary-light:disabled {
  //  &:before {
  //    background: $color-blue-8;
  //  }
  //}

  //&--info:disabled::before {
  //  background-color: $color-blue-24;
  //}

  &--full-size {
    width: 100%;
  }

  &--padding-left {
    padding: 15px 20px 15px 16px;
  }

  &--padding-right {
    padding: 15px 16px 15px 20px;
  }

  &--small-padding {
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 7px;

    &::before {
      border-radius: 7px;
    }
  }

  &--with-blink {
    background-color: $color-blue-100;
    padding: 8px 23px 10px 23px;
    border-radius: 12px;
    border: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background-color 0.25s ease;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 72px;
      width: 72px;
      background: linear-gradient(
        113.03deg,
        rgba(255, 255, 255, 0) 44.37%,
        rgba(255, 255, 255, 0.4) 44.38%,
        rgba(255, 255, 255, 0.32) 67.31%,
        rgba(255, 255, 255, 0) 67.32%
      );
      animation-name: order-animation;
      animation-duration: 3s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
    }

    span {
      position: relative;
      z-index: 2;
      white-space: nowrap;
    }
  }

  &--with-blink-gradient {
    background-image: linear-gradient(
      to left,
      #6c93ff -2.56%,
      #976fff 51.27%,
      #df69d1 107.39%
    ) !important;
    background-size: 200% 200%;
    animation: bg-move 5s infinite;
    will-change: background-position;

    span {
      color: white !important;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        $color-white-40 50%,
        transparent 100%
      );
      animation: wave 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
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

.text {
  white-space: nowrap;
  color: $color-black-100;
  opacity: 1;
  transition: opacity 0.25s ease;
  pointer-events: all;

  &--hidden {
    opacity: 0;
    pointer-events: none;
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

@keyframes wave {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes bg-move {
  0%,
  100% {
    background-position: 0 center;
  }
  50% {
    background-position: 100% center;
  }
}
</style>
