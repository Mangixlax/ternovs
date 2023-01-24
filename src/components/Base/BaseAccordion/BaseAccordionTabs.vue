<template>
  <div :class="$style['tabs']">
    <div
      v-for="(control, index) in controls"
      @click="onClick(index)"
      :class="{
        [$style['tabs__control']]: true,
        [$style['tabs__control--active']]: index == active,
      }"
    >
      {{ control }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'active',
    event: 'change',
  },
})
export default class BaseAccordionTabs extends Vue {
  @Prop({ type: Array, default: () => [] }) controls!: object[]
  @Prop({ type: Number, default: 0 }) active!: number

  public show = this.active

  onClick(index) {
    this.$emit('change', index)
  }
}
</script>

<style lang="scss" module>
.tabs {
  display: flex;
  margin: 0 auto;
  grid-gap: 12px;
  width: fit-content;
  margin-bottom: 50px;
  
  &__control {
    @include font-small-medium;
    border-radius: 30px;
    background-color: $color-primary-6;
    color: $color-primary-100;
    padding: 4px 14px 2px 14px;

    &--active {
      background-color: $color-primary-100;
      color: $color-white-100;
    }
  }
}
</style>
