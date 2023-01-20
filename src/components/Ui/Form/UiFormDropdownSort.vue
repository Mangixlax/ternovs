<template>
  <div
    v-bind="$attrs"
    :class="[{ [$style['container']]: true, [$style['opened']]: opened }]"
    v-click-outside="onClickOutside"
  >
    <div :class="$style['button']" @click="opened = !opened">
      <slot name="label" :label="label">
        <span v-if="label" :class="$style['button__label']">
          {{ label }}
        </span>
        <span :class="$style['button__value']">
          {{ localValue.label }}
        </span>
      </slot>
      <svg-icon name="dropdown"></svg-icon>
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
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { DropdownSortItem, DropdownSortListValue } from '~/types/models/Ui'
import BaseRadioButton from '~/components/Base/BaseRadioButton/BaseRadioButton.vue'

@Component({
  components: { BaseRadioButton },
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class UiFormDropdownSort extends Vue {
  @Prop({ type: Array, default: () => [] })
  controls!: DropdownSortItem[]
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Object, default: () => ({}) }) value!: DropdownSortListValue

  public localValue: DropdownSortItem = this.value || this.controls[0]
  public opened: boolean = false

  @Watch('localValue')
  onChangeLocalValue(newValue: DropdownSortListValue) {
    this.$emit('input', newValue)
  }

  public onClickOutside() {
    this.opened = false
  }

  public onSelectListItem(value: DropdownSortItem) {
    this.localValue = value
    this.opened = false
  }

  public isSelectedItem(item: DropdownSortItem): boolean {
    return this.localValue.label === item?.label
  }
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  vertical-align: middle;
  display: flex;
  z-index: 1;
  border-radius: 9px;
  width: fit-content;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  &.opened,
  &:hover {
    background-color: $color-white-100;
    outline: $color-blue-8 solid 2px;
    z-index: 2;
  }
}

.button {
  padding: 9px 12px;
  border: 1px solid $color-black-8;
  position: relative;
  text-align: left;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  z-index: 11;
  white-space: nowrap;
  border-radius: 9px;
  @include size-12-regular;
  display: flex;
  align-items: center;

  & > svg {
    opacity: 1;
    width: 16px;
    height: 16px;
    right: 16px;
    top: 16px;
    transform: rotate(0);
    margin-left: 32px;
  }

  .opened & {
    background-color: $color-white-100;

    & > svg {
      transform: rotate(180deg);
    }
  }

  &__label {
    color: $color-black-100;
    margin-right: 0.25rem;
  }

  &__value {
    color: $color-black-72;
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
  border: 1px solid $color-black-8;
  box-shadow: 0px 6px 12px $color-black-4;
  width: 100%;
  padding: 12px;

  &__header {
    @include size-13-regular;
    color: $color-black-32;
    padding: 10px 16px 12px;
  }

  .opened & {
    display: block;
  }

  &__item {
    @include size-12-regular;
    height: auto;
    cursor: pointer;

    & + & {
      margin-top: 10px;
    }

    &:hover,
    &.selected {
      color: $color-blue-100;
    }
  }
}
</style>
