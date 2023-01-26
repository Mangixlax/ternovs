<template>
  <span :class="$style['checkbox__squared']">
    <input
      v-bind="$attrs"
      :value="value"
      :checked="checked"
      type="checkbox"
      @change="onInput($event.target.checked)"
    />
    <svg-icon :name="checkboxIcon" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class UiFormCheckbox extends Vue {
  @Prop({ type: [String, Boolean], default: true }) value!: boolean | string
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) valid!: boolean

  public onInput(value: string) {
    this.$emit('input', value)
  }

  get checkboxIcon() {
    if (this.checked) {
      return 'form/checkbox-checked'
    } else if (!this.valid) {
      return 'form/checkbox-error'
    } else if (!this.checked) {
      return 'form/checkbox'
    }
  }
}
</script>

<style lang="scss" module>
.checkbox__squared {
  width: 30px;
  height: 30px;
  display: inline-block;
  position: relative;

  input {
    width: 30px;
    height: 30px;
    opacity: 0;
    margin: 0;
  }

  svg {
    max-width: 100%;
    width: 30px;
    height: 30px;
    margin-top: 0;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    cursor: pointer;
  }

  textarea {
    min-height: 210px;
  }
}
</style>
