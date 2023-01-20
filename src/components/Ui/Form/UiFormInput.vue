<template>
  <div :class="$style['input']">
    <input
      v-bind="$attrs"
      :value="value"
      :is="tag"
      :class="{ [$style['input__instance']]: true }"
      @input="onInput($event.target.value)"
    />
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

  &__instance {
    padding: 16px;
    background-color: $color-black-4;
    @include size-13-regular;
    color: $color-black-100;
    width: 100%;
    border: none;
    border-radius: 9px;
    transition: background-color 0.25s ease;
    outline: none;

    &:hover {
      background-color: $color-black-8;
    }

    &:focus {
      background-color: $color-white-100;
      outline: 2px solid $color-blue-100;
    }
  }

  textarea {
    min-height: 210px;
    resize: none;
  }
}
</style>
