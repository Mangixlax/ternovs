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
  color: $color-gray-100;
  margin: 24px 0;
}

.h1 {
  display: none;
}

.h2 {
  @include font-h2-medium;
}

.h3 {
  @include font-h3-medium;
}

.h4 {
  @include font-h4-medium;
}

.h5 {
  @include font-h5-medium;
}

.h6 {
  @include font-h6-medium;
}

@include media-breakpoint-up('lg') {
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    padding: 0 96px;
    margin: 32px 0;
  }
}
</style>
