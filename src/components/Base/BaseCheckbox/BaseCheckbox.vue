<template functional>
  <label
    v-bind="data.attrs"
    :class="[
      data.staticClass,
      data.class,
      $style['checkbox'],
      { [$style['checkbox--checked']]: props.checked },
    ]"
    :for="props.id"
  >
    <span :class="[$style['checkbox__squared'], props.checkboxClasses]">
      <input
        type="checkbox"
        :value="props.value"
        :id="props.id"
        :checked="props.value"
        :indeterminate.prop="props.indeterminate"
        :disabled="props.disabled"
        @click="listeners['click'] && listeners['click'](!props.value)"
      />
      <svg-icon
        :name="props.checked ? 'form/checkbox-checked' : 'form/checkbox'"
      ></svg-icon>
    </span>
    <span :class="$style['checkbox__label']">
      <slot name="label" :label="props.label" :description="props.description">
        {{ props.label }}
        <p
          v-if="props.description"
          :class="$style['checkbox__label-description']"
        >
          {{ props.description }}
        </p>
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseCheckbox extends Vue {
  @Prop({ type: String, default: '' }) id!: string
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) description!: string
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: String, default: '' }) checkboxClasses!: string
}
</script>

<style lang="scss" module>
.checkbox {
  position: relative;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  padding-left: 36px;
  border-radius: 7px;
  padding-top: 8px;
  padding-bottom: 8px;

  &:hover {
    background-color: $color-black-6;
  }

  &__squared {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-right: 2px;
    position: absolute;
    top: 10px;
    left: 12px;

    input {
      visibility: hidden;
      margin-top: 0;
      color: #000000;
    }

    svg {
      display: inline-block;
      max-width: 100%;
      width: 16px;
      height: 16px;
      margin-top: 0;
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
    }
  }

  &--checked label {
    border-color: $color-blue-100;
  }

  &__label {
    white-space: nowrap;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    display: inline-block;
    max-width: 100%;
    @include size-13-regular;

    &-description {
      color: $color-black-40;
      margin-top: 2px;
      margin-bottom: 0;
      @include size-11-medium;
    }
  }
}
</style>
