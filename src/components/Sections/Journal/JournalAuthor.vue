<template>
  <div :class="$style['author']">
    <img
      v-if="author.avatar"
      :src="$img(`/s1${author.avatar.path}`, { format: 'webp' })"
      loading="lazy"
      decoding="async"
      :class="$style['author-avatar']"
    />
    <svg-icon
      v-else
      name="avatar"
      :class="$style['author-avatar--fake']"
    />
    <div :class="$style['author-name']">{{ author.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

// TODO: TBD

export default defineComponent({
  name: 'JournalAuthor',
  props: {
    author: { type: Object as PropType<any>, default: () => {} },
    color: { type: String, default: '' },
  },
})
</script>

<style lang="scss" module>
.author {
  display: flex;
  margin: 0 auto;
  text-align: center;
  align-items: center;

  &-avatar {
    height: 81px;
    border-radius: 50%;

    &--fake {
      height: 32px;
      width: 32px;
    }
  }

  &-name {
    display: flex;
    @include font-p-regular-160;
    color: $color-gray-100;
    margin-left: 10px;
  }
}
</style>
