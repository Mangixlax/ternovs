<template functional>
  <component
    v-on="listeners"
    :is="props.tag"
    v-bind="data.attrs"
    :class="[data.staticClass, data.class, { [$style['label']]: true }]"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class UiFormLabel extends Vue {
  @Prop({ type: String, default: 'label' }) tag!: string
}
</script>

<style lang="scss" module>
.label {
  @include size-14-medium;
  margin-left: 6px;
  margin-bottom: 10px;
  display: block;
}
</style>
