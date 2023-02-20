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
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UiFormCheckbox',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: { type: [String, Boolean], default: true },
    checked: { type: Boolean, default: false },
    valid: { type: Boolean, default: false },
  },
  computed: {
    checkboxIcon() {
      if (this.checked) {
        return 'form/checkbox-checked'
      } else if (!this.valid) {
        return 'form/checkbox-error'
      } else if (!this.checked) {
        return 'form/checkbox'
      }
    },
  },
  methods: {
    onInput(value: string) {
      this.$emit('input', value)
    },
  },
})
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
