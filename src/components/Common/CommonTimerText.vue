<template>
  <div v-bind="$attrs">
    <slot :now="localSeconds"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CommonTimerText extends Vue {
  @Prop({ type: [Number, String], required: true })
  seconds!: number | string

  @Prop({ type: Function, default: () => {} })
  onFinished!: () => {}

  public localSeconds: number = Number(this.seconds)
  public lastUpdateTime: number = new Date().getTime()
  public currentUpdateTime: number = 0
  public requestTimer: number | null = null

  public animate() {
    this.currentUpdateTime = new Date().getTime()

    if (this.localSeconds > 0) {
      this.requestTimer = requestAnimationFrame(this.animate)
    } else {
      cancelAnimationFrame(this.requestTimer as number)
      typeof this.onFinished === 'function' && this.onFinished()
    }

    if (this.currentUpdateTime - this.lastUpdateTime >= 1000) {
      this.lastUpdateTime = this.currentUpdateTime
      this.localSeconds = this.localSeconds - 1
    }
  }

  mounted() {
    this.animate()
  }

  beforeDestroy() {
    this.requestTimer && cancelAnimationFrame(this.requestTimer as number)
  }
}
</script>
