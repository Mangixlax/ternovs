<template>
  <p
    v-if="hasImage"
    v-bind="$attrs"
    :class="[$style['figure'], block.data.stretched && $style['full-width']]"
  >
    <img
      :src="image"
      :alt="block.data.alt"
      loading="lazy"
      decoding="async"
      :class="[$style['img'], block.data.caption && $style['with-caption']]"
    />
    <span v-if="block.data.caption" v-html="block.data.caption"></span>
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentImage',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    hasImage(): boolean {
      return Object.keys(this.block.data.file || {}).length > 0
    },
    image(): any {
      const filePath = this.block.data.file.url
        .match(/.{1,3}/g)
        .slice(0, 3)
        .join('/')

      return this.$img(`s3/` + filePath + '/' + this.block.data.file.url, {
        format: 'webp',
      })
    },
  },
})
</script>

<style lang="scss" module>
.figure {
  margin: 32px 0;

  & > p {
    margin: 0;
  }

  &.full-width {
    padding-left: 0;
    padding-right: 0;
  }

  > span {
    @include font-p-medium-160;
    color: $color-gray-64;
  }
}
.img {
  width: 100%;
  border-radius: 16px;
  height: auto;
  object-fit: cover;

  &.with-caption {
    margin-bottom: 24px;
  }
}

@include media-breakpoint-up('lg') {
  .figure {
    > span {
      padding: 0 96px;
    }
  }

  .img {
    height: 600px;
  }
}
</style>
