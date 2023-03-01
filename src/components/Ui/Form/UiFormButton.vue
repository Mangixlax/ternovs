<template>
  <component
    :is="tag"
    ref="button"
    v-on="$listeners"
    v-bind="$attrs"
    :class="[
      {
        [$style['button']]: true,
        [$style['button--gray']]: variant === 'gray',
        [$style['button--md']]: variant === 'md',
        [$style['button--xl']]: variant === 'xl',
        [$style['button--full-size']]: fullSize,
        [$style['button--disable-hover']]: disableHover,
        [$style['button--disable-active']]: disableActive,
        [$style['button--loading']]: isLoading,
        [$style['button--padding-left']]: $slots['icon-before'],
        [$style['button--padding-right']]: $slots['icon-after'],
      },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span
      v-if="$slots['icon-before']"
      :class="[$style['icon'], $style['icon--before']]"
    >
      <slot name="icon-before" />
    </span>
    <span :class="$style['content']"><slot /></span>
    <loader v-if="isLoading" />
    <span
      v-if="$slots['icon-after']"
      :class="[$style['icon'], $style['icon--after']]"
    >
      <slot name="icon-after" />
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Loader from '~/components/Common/Loader.vue'

export default defineComponent({
  name: 'UiFormButton',
  model: {
    prop: 'value',
    event: 'input',
  },
  components: {
    Loader,
  },
  props: {
    tag: { type: String, default: 'button' },
    variant: { type: String, default: 'sm' },
    textClasses: { type: [String, Array], default: '' },
    border: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    fullSize: { type: Boolean, default: false },
    withBlink: { type: Boolean, default: false },
    disableHover: { type: Boolean, default: false },
    disableActive: { type: Boolean, default: false },
    action: { type: String, default: '' },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      isLoading: this.loading,
    }
  },
  methods: {
    handleClick() {
      if (this.$listeners.click || this.tag == 'nuxt-link' || this.tag == 'a') {
        return
      } else {
        this.onShowCallback()
      }
    },
    onShowCallback() {
      this.isLoading = true
      this.$modal.show({
        bind: {
          name: 'Callback',
        },
        on: {
          'before-open': () => {
            this.isLoading = false
          },
        },
        component: () =>
          import(
            '~/components/Modal/Content/Callback/ModalContentCallback.vue'
          ),
      })
    },
  },
})
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
  transition: transform 0.25s ease-in;
  touch-action: manipulation;
  color: $color-white-100;
  text-decoration: none;
  border-radius: 28px;

  &--gray {
    background-color: $color-gray-100;
    color: $color-white-100;
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
    transform: scale(0.97);
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

  &--loading {
    .content {
      opacity: 0.16;
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

@keyframes order-animation {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(400%);
  }
}
</style>
