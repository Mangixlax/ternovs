<template>
  <div :class="$style['slider']">
    <div v-if="title" :class="$style['slider-title']">{{ title }}</div>
    <div :class="$style['slider__block-list']">
      <div :class="$style['slider__block']">
        <div :class="$style['slider__block-input']">
          <input
            v-model="sliderValue"
            ref="value"
            type="number"
            v-autowidth="{ maxWidth: '80px', minWidth: '20px', comfortZone: 0 }"
            @blur="blurInput"
            @focus="focusInput"
            @input="update"
          />
          <div
            v-if="dimension"
            :class="$style['slider__block-dimension']"
            v-html="dimension"
          ></div>
        </div>
        <span v-if="displayPercent" :class="$style['slider__block-percent']">
          {{ displayPercent }}%
        </span>
      </div>
    </div>
    <div :class="$style['slider__wrapper']">
      <div
        v-if="!hideLabel"
        :style="{ left: position }"
        :class="$style['slider__label']"
      >
        {{ sliderLabel }}
      </div>
      <div
        :class="{
          [$style['slider__track']]: true,
          [$style['slider__track--rectangular']]: !raising,
        }"
      >
        <div
          v-if="raising"
          :style="{ 'border-left-width': sliderWidth + 'px' }"
          :class="$style['slider__track-top']"
        ></div>
        <div
          v-if="raising"
          :style="{ 'border-right-width': sliderWidth + 'px' }"
          :class="$style['slider__track-bottom']"
        ></div>
      </div>
      <input
        ref="slider"
        v-model="sliderValue"
        :max="sliderMax"
        :class="$style['slider__input']"
        type="range"
        :min="sliderMin"
        :step="step"
        @input="update"
        @change="change"
        @click="click"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'

interface IValue {
  label: string
  value: string
}

@Component({
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class MortgageCalculatorSlider extends Vue {
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: Array, default: () => [] }) values!: Array<IValue>
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '0' }) min!: string
  @Prop({ type: String, default: '100' }) max!: string
  @Prop({ type: String, default: '1' }) step!: string
  @Prop({ type: [Number, String], default: 0 }) inputValue!: number | string
  @Prop({ type: String, default: '' }) dimension!: string
  @Prop({ type: Boolean, default: false }) hideLabel!: boolean
  @Prop({ type: Boolean, default: false }) raising!: boolean
  @Prop({ type: [Number, Boolean, String], default: false }) displayPercent!:
    | number
    | boolean
    | string

  public sliderWidth: number = 0
  public sliderValues: Array<IValue> = []
  public sliderValue: string | null = null
  public sliderMax: string | null | number = null
  public sliderMin: string | null = null
  public isFocusInput: boolean = false

  get sliderLabel() {
    // If using custom values, the custom label is returned, otherwise the value is also the label
    return this.sliderValues.length
      ? this.sliderValues[Number(this.sliderValue) - 1].label
      : this.sliderValue
  }

  get sliderOutputValue() {
    // If using custom values, the custom value is returned, otherwise just the default value
    return this.sliderValues.length
      ? this.sliderValues[Number(this.sliderValue) - 1].value
      : this.sliderValue
  }

  get position() {
    const val = this.sliderValue
    // Measure width of slider element. Adjust by 20 to account for thumbsize
    const width = this.sliderWidth - 20
    // Calculate percentage between left and right of input
    const percent =
      (Number(val) - Number(this.sliderMin)) /
      (Number(this.sliderMax) - Number(this.sliderMin))
    // Janky value to get pointer to line up better
    const offset = -2
    const position = width * percent + offset
    return `${position}px`
  }

  public changeValues() {
    // Set local values, depending on use of custom or default
    if (this.values.length) {
      this.sliderValues = this.values
      this.sliderMin = '1'
      this.sliderMax = this.sliderValues.length
      // Find the corresponding custom value, and set the local sliderValue
      let index = 0
      this.values.map((item, i) => {
        if (item.value === this.value) {
          index = i
        }
        return true
      })
      this.sliderValue = String(index + 1)
    } else {
      // In case of using default slider methods
      this.sliderMin = this.min
      this.sliderMax = this.max
      this.sliderValue = this.value
    }
    this.update()
  }

  public update() {
    this.$emit('input', this.sliderOutputValue)
  }

  public change() {
    this.$emit('change', this.sliderOutputValue)
  }

  public click(event: any) {
    if (this.sliderValue == undefined) {
      this.sliderValue = event.target.value
      this.$emit('input', this.sliderOutputValue)
    }
  }

  async focusInput() {
    if (this.isFocusInput) return
    this.isFocusInput = true
    await this.$nextTick()
    ;(this as any).$refs.value.focus()
  }

  blurInput() {
    this.changeValues()
  }

  public resizeHandler() {
    this.sliderWidth = (this as any).$refs.slider.clientWidth
  }

  created() {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted() {
    this.changeValues()
    this.$nextTick(() => {
      this.resizeHandler()
    })
  }

  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  @Watch('value')
  onChangeValue(value: string) {
    this.changeValues()
  }

  @Watch('max')
  onChangeMax(value: string) {
    this.changeValues()
  }
  // @Watch('values')
  // onChangeValues() {
  // }
}
</script>

<style lang="scss" module>
$label-color: #333 !default;
$label-background: white !default;
$label-shadow: 0 10px 20px -5px rgba(45, 45, 45, 0.25);

$slider-track-background: #999 !default;
$slider-track-height: 3px !default;

$thumb-background: #eee !default;
$thumb-size: 20px;

.slider {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  &-title {
    @include size-13-regular;
    color: $color-black-56;
    transition: color 0.3s ease;
    position: relative;
    margin-bottom: 12px;

    span {
      @include size-13-regular;
      color: rgba(255, 255, 255, 1);
    }
  }

  &__block {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 8px 4px;
    position: relative;
    z-index: 1;
    width: 100%;
    grid-gap: 2px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.16);

    &-icon {
      height: 20px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        height: 20px;
        width: 20px;
      }

      &-minus {
        fill: white;
      }

      &-plus {
        fill: #0066ff;
      }
    }

    &-list {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      height: 100%;
      grid-gap: 10%;
      overflow: hidden;
      position: relative;
      width: 100%;

      &:before {
        content: '';
        position: absolute;
        pointer-events: none;
        border: 1px solid transparent;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        transition: background-color 0.3s ease;
      }
    }

    &-input {
      display: flex;
    }

    &-percent {
      @include size-15-regular;
      color: $color-black-40;
    }

    input {
      @include size-15-regular;
      background: inherit;
      border: none;
      text-align: center;
      outline: none;
      width: 100%;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &-caption {
      padding-top: 3px;
    }

    &-dimension {
      display: flex;
      align-items: center;
    }
  }

  &__label {
    position: absolute;
    top: -17px;
    background: white;
    color: $label-color;
    font-weight: bold;
    padding: 2px 5px;
    font-size: 12px;
    text-align: center;
    transform: translateX(-50%);
    margin-left: 1em;
    box-shadow: $label-shadow;
    min-width: 30px;
    white-space: nowrap;

    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      height: 0;
      width: 0;
      left: 0;
      right: 0;
      margin: auto;
      border: 5px solid transparent;
      border-top-color: $label-background;
    }
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__track {
    width: 100%;
    position: absolute;
    z-index: 0;
    height: 2px;
    background: $color-blue-88;
    border-radius: 2px;

    &--rectangular {
      height: $slider-track-height;
    }
  }

  &__track-top,
  &__track-bottom {
    content: '';
    width: 100%;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &__track-top {
    top: -6px;
    border-width: 0 0 6px 500px;
    border-color: transparent transparent $slider-track-background transparent;
  }

  &__track-bottom {
    top: 3px;
    border-width: 0 500px 6px 0;
    border-color: transparent $slider-track-background transparent transparent;
  }

  &__input {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
    background: none;
    padding: 0;
    z-index: 1;
    position: relative;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      animation-duration: 0.2s;
      background: transparent;
      border-radius: 0;
      border: none;
    }

    // Thumb
    &::-webkit-slider-thumb {
      height: $thumb-size;
      width: $thumb-size;
      border-radius: 50%;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -5px;
      background: $color-white-100;
      position: relative;
    }

    &::-moz-range-thumb {
      height: $thumb-size;
      width: $thumb-size;
      border-radius: 50%;
      background: $color-white-100;
      cursor: pointer;
      border: none;
      position: relative;

      &:after {
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: $color-blue-8;
      }
    }

    &::-ms-thumb {
      height: $thumb-size;
      width: $thumb-size;
      border-radius: 50%;
      background: $color-white-100;
      cursor: pointer;
      position: relative;
    }

    // Track

    &:focus::-webkit-slider-runnable-track {
      background: transparent;
    }

    &::-moz-range-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      animation-duration: 0.2s;
      background: transparent;
      border-radius: 0;
    }

    &::-ms-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      animation-duration: 0.2s;
      background: transparent;
      border-color: transparent;
      border-width: 10px 0;
      border-radius: 0;
      color: transparent;
    }

    &::-ms-fill-lower {
      background: transparent;
      border: none;
      border-radius: 0;
    }

    &::-ms-fill-upper {
      background: transparent;
      border: none;
      border-radius: 0;
    }
  }
}

input[type*='range']:hover::-webkit-slider-thumb:after {
  background: black;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
</style>
