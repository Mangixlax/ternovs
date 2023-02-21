<template functional>
  <p
    v-if="props.block.data.text"
    v-bind="data.attrs"
    v-html="props.block.data.text"
    :class="[
      data.staticClass,
      data.class,
      $style['p'],
      $style[`${props.block.data.variant}`],
    ]"
  ></p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentParagraph',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
})
</script>

<style lang="scss" module>
.p {
  @include font-p-regular-160;
  margin-top: 18px;
  margin-bottom: 18px;
  color: $color-gray-88;

  &:first-child {
    margin-top: 0;
  }

  mark {
    background: $color-error-24;
    padding-left: 2px;
    padding-right: 2px;
  }

  b,
  strong {
    @include font-p-regular-160;
  }

  a {
    color: $color-primary-88;
  }
}

.P1 {
  @include font-p-regular-160;
  color: $color-gray-88;
  margin: 18px 0;
}

.P2 {
  @include font-p-regular-160;
  color: $color-gray-88;
  margin: 18px 0;
}

.P3 {
  @include font-p-regular-160;
  color: $color-gray-88;
  margin: 18px 0;
}

.P4 {
  @include font-p-regular-160;
  color: $color-gray-88;
  margin: 18px 0;

  a {
    cursor: pointer;
    color: $color-primary-88;
    text-decoration: none;
  }
}

.P5 {
  @include font-p-regular-160;
  color: $color-gray-88;
  margin: 18px 0;

  a {
    cursor: pointer;
    color: $color-primary-80;
    text-decoration: none;
  }
}
</style>
