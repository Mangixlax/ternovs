<template>
  <div
    v-bind="$attrs"
    :class="[{ [$style['container']]: true, [$style['opened']]: opened }]"
    v-click-outside="onClickOutside"
  >
    <span v-if="label" :class="$style['container__label']">
      {{ label }}
    </span>

    <div :class="$style['button']" @click="opened = !opened">
      <slot name="label">
        <span :class="$style['button__value']">
          {{ localValue.label }}
        </span>
      </slot>
      <svg-icon name="form/dropdown"></svg-icon>
    </div>
    <div :class="$style['dropdown']">
      <div
        v-for="(control, key) in controls"
        :key="key"
        :class="{
          [$style['dropdown__item']]: true,
          [$style['selected']]: isSelectedItem(control),
        }"
        @click="onSelectListItem(control)"
      >
        {{ control.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { DropdownItem, DropdownListValue } from '~/types/components/ui'

export default defineComponent({
  name: 'UiFormDropdown',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    controls: { type: Array as PropType<DropdownItem[]>, default: () => [] },
    label: { type: String, default: '' },
    value: { type: Object as PropType<DropdownItem>, default: () => ({}) },
  },
  data() {
    return {
      opened: <boolean>false,
      localValue: <DropdownItem>this.value || this.controls[0],
    }
  },
  watch: {
    localValue(newValue: DropdownItem) {
      this.$emit('input', newValue)
    },
  },
  methods: {
    onClickOutside() {
      this.opened = false
    },
    onSelectListItem(value: DropdownItem) {
      this.localValue = value
      this.opened = false
    },
    isSelectedItem(item: DropdownItem): boolean {
      return this.localValue.label === item?.label
    },
  },
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  vertical-align: middle;
  display: flex;
  z-index: 1;
  border-radius: 9px;
  flex-direction: column;

  &__label {
    @include font-small-medium;
    color: $color-gray-72;
    margin-bottom: 6px;
  }
}

.button {
  @include font-p-regular-160;
  outline: 2px solid $color-gray-6;
  padding: 4px 9px 4px 16px;
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  z-index: 11;
  white-space: nowrap;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > svg {
    opacity: 1;
    width: 26px;
    height: 26px;
    transform: rotate(0);
    margin-left: 32px;
  }

  .opened & {
    background-color: $color-white-100;

    & > svg {
      transform: rotate(180deg);
    }
  }

  &__value {
    color: $color-gray-100;
    padding: 7px 0px 3px 0;
  }
}

.dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 10;
  margin-top: 6px;
  display: none;
  float: left;
  text-align: left;
  background-color: $color-white-100;
  background-clip: padding-box;
  border-radius: 9px;
  border: 1px solid $color-gray-8;
  box-shadow: 0px 6px 12px $color-gray-4;
  width: 100%;
  padding: 12px;

  &__header {
    @include font-small-medium;
    color: $color-gray-32;
    padding: 10px 16px 12px;
  }

  .opened & {
    display: block;
  }

  &__item {
    @include font-p-regular-160;
    height: auto;
    cursor: pointer;

    & + & {
      margin-top: 10px;
    }

    &:hover,
    &.selected {
      color: $color-primary-100;
    }
  }
}
</style>
