<template>
  <div :class="$style['input']">
    <input
      v-bind="$attrs"
      :value="value"
      :is="tag"
      :class="$style['input__instance']"
      @input="onInput($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UiFormInput',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: { type: String, default: '' },
    tag: { type: String, default: 'input' },
  },
  methods: {
    onInput(value: string) {
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" module>
.input {
  width: 100%;
  display: flex;
  border-radius: 10px;
  transition: background-color 0.25s ease;
  outline: 2px solid $color-gray-6;
  align-items: center;

  &__instance {
    padding: 11px 0 7px 16px;
    @include font-p-regular-160;
    color: $color-gray-72;
    width: 100%;
    border: none;
  }

  &:focus-within {
    background-color: $color-white-100;
    outline: 2px solid $color-primary-100;
  }

  &__submit {
    height: 34px;
    width: 34px;
    margin-right: 5px;

    svg {
      height: 34px;
      width: 34px;
      fill: $color-primary-100;
    }
  }
}
</style>
