<template>
  <div
    v-bind="$attrs"
    :class="[
      { [$style['container']]: true, [$style['opened']]: opened },
      containerClasses,
    ]"
    v-click-outside="onClickOutside"
  >
    <div :class="[$style['button'], buttonClasses]" @click="opened = !opened">
      <slot name="label" :label="label">
        <span v-if="label && !someControlsIsSelected">
          {{ label }}
        </span>
      </slot>
      <svg-icon name="dropdown"></svg-icon>
      <slot name="active-label">
        <span
          v-if="someControlsIsSelected"
          :class="$style['button__active-label']"
        >
          <span>
            <span v-html="getSelectedLabels"> </span>
            <svg-icon
              :class="$style['button__active-label__clear']"
              @click="onClear"
              name="form/cross"
            ></svg-icon>
          </span>
        </span>
      </slot>
    </div>
    <div :class="$style['dropdown']">
      <div v-if="$slots['dropdown-header']" :class="$style['dropdown__header']">
        <slot name="dropdown-header"></slot>
      </div>
      <div
        :class="$style['dropdown__line']"
        v-for="(listItems, key) in controls"
        :key="key"
      >
        <slot name="list-item">
          <base-radio-button
            v-for="(item, itemIndex) in listItems"
            :key="itemIndex"
            :label="item.label"
            :checked="localValue[key] === item.value"
            @click="onSelectRadio(key, item.value)"
          ></base-radio-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import BaseRadioButton from '~/components/Base/BaseRadioButton/BaseRadioButton.vue'

export interface DropdownRadioListRowItems {
  [key: string]: DropdownRadioListRowItem[]
}

export interface DropdownRadioListRowItem {
  label: string
  value: string
}

export interface DropdownRadioListValue {
  [key: string]: string
}

@Component({
  components: { BaseRadioButton },
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class UiFormDropdownRadioListRows extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  controls!: DropdownRadioListRowItems
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Object, default: () => ({}) }) value!: DropdownRadioListValue
  @Prop({ type: [String, Object, Array], default: '' }) containerClasses!:
    | string
    | object
    | Array<string | object>
  @Prop({ type: [String, Object, Array], default: '' }) buttonClasses!:
    | string
    | object
    | Array<string | object>
  /**
   * If you need to select one radio button at a time, disable it
   */
  @Prop({ type: Boolean, default: true }) fillWhenOneSelected!: boolean

  public localValue: DropdownRadioListValue = this.value
  public opened: boolean = false

  @Watch('localValue')
  onChangeLocalValue(newValue: DropdownRadioListValue) {
    this.$emit('input', newValue)
  }

  get localValueKeys(): string[] {
    return Object.keys(this.localValue)
  }

  get controlsKeys(): string[] {
    return Object.keys(this.controls)
  }

  get getSelectedLabels(): string {
    return this.controlsKeys
      .map((key: string) => {
        const radioListItems: DropdownRadioListRowItem[] = this.controls[key]
        let result: string[] = []

        radioListItems.forEach((radioItem: DropdownRadioListRowItem) => {
          if (radioItem.value === this.localValue[key]) {
            result.push(radioItem.label)
          }
        })

        return result
      })
      .join(' ')
  }

  get someControlsIsSelected(): boolean {
    return this.localValueKeys.some(
      (key: string) => this.localValue[key] !== ''
    )
  }

  get everyControlsIsSelected(): boolean {
    return this.localValueKeys.every(
      (key: string) => this.localValue[key] !== ''
    )
  }

  public onClickOutside() {
    this.opened = false
  }

  public fillAllFirstValues(): any {
    const notFilledValueKeys: string[] = this.localValueKeys.filter(
      (key: string) => {
        return this.localValue[key] === ''
      }
    )

    const newLocalValues: DropdownRadioListValue = {}

    notFilledValueKeys.forEach((key: string) => {
      if (this.controls[key].length) {
        newLocalValues[key] = this.controls[key][0].value
      }
    })

    this.localValue = {
      ...this.localValue,
      ...newLocalValues,
    }
  }

  public onSelectRadio(key: string, value: DropdownRadioListRowItem['value']) {
    this.localValue[key] = value

    if (
      this.fillWhenOneSelected &&
      this.someControlsIsSelected &&
      !this.everyControlsIsSelected
    ) {
      this.fillAllFirstValues()
    }
  }

  public onClear(): void {
    const newLocalValues: DropdownRadioListValue = {}

    this.localValueKeys.forEach((key: string) => {
      newLocalValues[key] = ''
    })

    this.localValue = newLocalValues
  }

  mounted() {
    if (!this.localValueKeys.length) {
      /**
       * Get keys from rows and create object with empty keys
       *
       * @example If rows is { day: [...], time: [...] }
       *
       * @example Can return { day: '', time: '' } to value
       * and set by default keys with empty values in local object/value
       */
      this.localValue = this.controlsKeys.reduce(
        (previous, key) => ({ ...previous, [key]: '' }),
        {}
      )
    }
  }
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  &.opened {
    background-color: $color-white-100;
    outline: $color-blue-100 solid 2px;
    z-index: 2;
  }
}

.button {
  padding: 16px 35px 16px 16px;
  border-color: rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: left;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  z-index: 11;
  height: 48px;
  white-space: nowrap;

  & > svg {
    content: '';
    position: absolute;
    opacity: 1;
    width: 16px;
    height: 16px;
    right: 16px;
    top: 16px;
    transform: rotate(0);
  }

  .opened & {
    background-color: $color-white-100;

    & > svg {
      transform: rotate(180deg);
    }
  }

  &__active-label {
    display: inline-block;
    position: absolute;
    left: 16px;
    top: 10px;
    height: 28px;
    overflow: hidden;
    max-width: calc(100% - 58px);

    & > span {
      background: $color-blue-100;
      color: $color-white-100;
      border-radius: 6px;
      text-align: left;
      line-height: 1;
      max-width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      @include size-13-regular;

      sup {
        @include size-9-medium;
        position: relative;
        top: 2px;
        margin-left: 1px;
      }

      span:nth-child(1) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 6px 0 6px 8px;
      }

      span:nth-child(2) {
        display: inline-block;
        margin-left: 4px;
        flex-shrink: 0;
      }
    }

    &__clear {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      margin-left: 3px;
      display: inline-block;
      cursor: pointer;
      flex-shrink: 0;
      pointer-events: all;
    }
  }
}

.dropdown {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  display: none;
  float: left;
  text-align: left;
  background-color: $color-white-100;
  background-clip: padding-box;
  border-radius: 9px;
  padding: 48px 0 10px;
  box-shadow: 0 4px 32px $color-black-8;

  &__header {
    @include size-13-regular;
    color: $color-black-32;
    padding: 10px 16px 12px;
  }

  .opened & {
    display: block;
  }

  &__line {
    padding: 0 10px;
    height: auto;
  }
}
</style>
