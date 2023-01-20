<template functional>
  <div
    v-bind="data.attrs"
    :class="[
      data.staticClass,
      data.class,
      { [$style['button']]: true, [$style['button--checked']]: props.checked },
    ]"
    @click="listeners['click'] && listeners['click'](!props.value)"
  >
    <span :class="$style['button__label']" v-html="props.label"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseRadioButton extends Vue {
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: String, required: true }) label!: string
}
</script>

<style lang="scss" module>
.button {
  position: relative;
  padding: 0;
  cursor: pointer;
  display: inline-block;
  margin-right: 6px;
  border-radius: 7px;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }

  &__label {
    position: relative;
    z-index: 2;
    padding: 8px 10px;
    display: inline-block;
    color: $color-black-88;
    @include size-13-regular;

    sup {
      @include size-9-medium;
      position: relative;
      top: 2px;
      margin-left: 1px;
    }
  }

  &:not(&--checked):hover &__label {
    background-color: $color-black-6;
    color: $color-black-100;
  }

  &--checked &__label {
    background-color: $color-blue-8;
    color: $color-blue-100;
  }
}
</style>
