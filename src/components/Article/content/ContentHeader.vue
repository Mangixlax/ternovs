<template functional>
  <component
    :is="`h${props.block.data.level}`"
    v-if="props.block.data.text"
    v-bind="{
      ...data.attrs,
      ...(props.id.toString().length && { id: props.id }),
    }"
    v-html="props.block.data.text"
    :class="$style[`h${props.block.data.level}`]"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentHeader',
  props: {
    block: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" module>
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  color: $color-gray-88;
  margin-top: 18px;
  margin-bottom: 18px;
  padding-top: 16px;
}

.h1 {
  display: none;
}

.h2 {
  @include font-h2-regular;
}

.h3 {
  @include font-h3-regular;
}

.h4 {
  @include font-h4-regular;
}

.h5 {
  @include font-h5-regular;
}

.h6 {
 @include font-h6-regular;
}
</style>
