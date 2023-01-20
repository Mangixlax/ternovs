<template functional>
  <component v-bind="data.attrs" :is="props.tag" :class="$style['group']">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class UiFormGroup extends Vue {
  @Prop({ type: String, default: 'div' }) tag!: string
}
</script>

<style lang="scss" module>
.group {
  display: block;
}

.group + .group {
  margin-top: 16px;
}
</style>
