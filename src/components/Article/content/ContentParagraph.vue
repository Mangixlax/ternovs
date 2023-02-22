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
  @include font-lead-regular-160;
  color: $color-gray-100;
  margin: 24px 0;

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
    @include font-lead-medium-160;
  }

  a {
    color: $color-primary-88;
    text-decoration: none;
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

@include media-breakpoint-up('lg') {
  .p {
    padding: 0 96px;
    margin: 32px 0;
  }
}
</style>
