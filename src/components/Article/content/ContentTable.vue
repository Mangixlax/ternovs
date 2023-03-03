<template functional>
  <div :class="$style['wrapper']">
    <table
      v-bind="data.attrs"
      :class="[data.staticClass, data.class, $style['table']]"
    >
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.block.data.content"
          :key="rowIndex"
          :class="$style['table-row']"
        >
          <td
            v-for="(col, colIndex) in row"
            :key="colIndex"
            :class="{
              [$style['table-col']]: true,
              [$style['table-col--heading']]:
                props.block.data.withHeadings === true && rowIndex === 0,
            }"
            v-html="col"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentTable',
  props: {
    block: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  overflow: auto;
}

.table {
  min-width: 100%;

  &-col {
    @include font-lead-regular-160;
    padding: 4px 12px;
    color: $color-gray-100;
    min-width: 160px;
    vertical-align: top;

    &--heading {
      @include font-lead-medium-160;
      border-bottom: 1px solid $color-gray-6;
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

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
}

@include media-breakpoint-up('lg') {
  .wrapper {
    padding: 0 96px;
    margin: 32px 0;
  }
}
</style>
