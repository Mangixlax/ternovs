<template functional>
  <code>{{ props.block.data.code }}</code>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentCode',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
})
</script>
