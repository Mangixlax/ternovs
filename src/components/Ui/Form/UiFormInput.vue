<template>
  <div :class="$style['input']">
    <input
      v-bind="$attrs"
      :value="value"
      :is="tag"
      :class="$style['input__instance']"
      @input="onInput($event.target.value)"
    />
    <span :class="$style['input__submit']">
      <svg-icon name="form/submit" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class UiFormInput extends Vue {
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: String, default: 'input' }) tag!: string

  public onInput(value: string) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" module>
.input {
  width: 100%;
  display: flex;
  border-radius: 90px;
  transition: background-color 0.25s ease;
  outline: 2px solid $color-gray-6;
  align-items: center;

  &__instance {
    padding: 11px 0 7px 20px;
    @include font-p-regular-160;
    color: $color-gray-100;
    width: 100%;
    border: none;

    &:focus ~ .input {
      background-color: $color-white-100;
      outline: 2px solid $color-primary-100;
    }
  }

  &:hover {
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
