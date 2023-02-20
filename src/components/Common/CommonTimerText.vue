<template>
  <div v-bind="$attrs">
    <slot :now="localSeconds" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CommonTimerText',
  props: {
    seconds: { type: [Number, String], required: true },
    onFinished: { type: Function as PropType<() => {}>, default: () => {} },
  },
  data() {
    return {
      localSeconds: Number(this.seconds) as number,
      lastUpdateTime: new Date().getTime() as number,
      currentUpdateTime: 0 as number,
      requestTimer: null as number | null,
    }
  },
  methods: {
    animate() {
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
    },
  },
  mounted() {
    this.animate()
  },
  beforeDestroy() {
    this.requestTimer && cancelAnimationFrame(this.requestTimer as number)
  },
})
</script>
