<template>
  <div :class="$style['author']">
    <img
      v-if="author.photo"
      :src="image"
      loading="lazy"
      decoding="async"
      :class="$style['author-avatar']"
    />
    <span v-else :class="$style['author-avatar--fake']">
      <svg-icon name="journal/avatar" />
    </span>
    <div :class="$style['author-name']">
      <h3>
        {{ author.name }}
      </h3>
      <span> {{ author.caption }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

// TODO: TBD
export default defineComponent({
  name: 'JournalAuthor',
  props: {
    author: { type: Object as PropType<any>, default: () => {} },
  },
  computed: {
    image(): any {
      const filePath = this.author.photo.filename
        .match(/.{1,3}/g)
        .slice(0, 3)
        .join('/')

      return this.$img(`s3/` + filePath + '/' + this.author.photo.filename, {
        format: 'webp',
      })
    },
  },
})
</script>

<style lang="scss" module>
.author {
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;

  &-avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;

    &--fake {
      display: flex;

      > svg {
        height: 100px;
        width: 100px;
      }
    }
  }

  &-name {
    display: flex;
    @include font-p-regular-160;
    color: $color-gray-100;
    margin-left: 10px;
    flex-direction: column;
    margin-top: 16px;

    > h3 {
      @include font-h6-medium;
      margin: 0;
      margin-bottom: 8px;
    }

    > span {
      @include font-lead-regular-160;
      display: block;
    }
  }

  @include media-breakpoint-up('lg') {
    flex-direction: row;
    padding: 24px 96px;
    align-items: flex-start;

    &-name {
      margin-left: 24px;
      margin-top: 0;
    }
  }
}
</style>
