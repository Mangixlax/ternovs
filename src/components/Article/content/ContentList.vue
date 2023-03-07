<template>
  <ul :is="getType(block)" :class="$style[getType(block)]">
    <li
      v-for="(item, index) in getList(block)"
      :key="index"
      :class="$style['li']"
    >
      <span v-html="item.content"></span>
      <content-list
        v-if="item.items.length > 0"
        :block="{
          data: { items: item.items },
          style: getType(block),
        }"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// TODO: TBD

export default defineComponent({
  name: 'ContentList',
  props: {
    block: {
      type: Object as any,
      default: () => ({}),
    },
  },
  methods: {
    getList(block: any = {}): any {
      try {
        return block.data.items.filter((item: any) => item.content.length)
      } catch (e) {
        return []
      }
    },
    getType(block: any = {}): any {
      try {
        return block.data.style === 'unordered' ? 'ul' : 'ol'
      } catch (e) {
        return 'ul'
      }
    },
  },
})
</script>

<style lang="scss" module>
.ul,
.ol {
  margin: 18px 0;
  padding: 0 24px;
  color: $color-gray-88;
  .li {
    @include font-lead-regular-160;

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
}

.ul[style-none] {
  .li {
    &:before {
      display: none;
    }
  }
}

.ul {
  list-style-type: disc;
}

.ol {
  list-style-type: decimal;
}

@include media-breakpoint-up('lg') {
  .ul,
  .ol {
    padding: 0 116px;
  }
}
</style>
