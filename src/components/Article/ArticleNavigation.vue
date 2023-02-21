<template>
  <ul :class="$style['headings']">
    <li
      :class="[$style['headings__item']]"
      v-for="(item, index) in list"
      :key="index"
    >
      <a
        :class="$style['headings__item-link']"
        :href="`#ahead_${item.index}`"
        :title="item.text"
        @click.prevent="scrollToHead(`ahead_${item.index}`)"
        v-text="item.text"
      ></a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleNavigation',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    scrollToHead(header_id: any) {
      this.$scrollTo(`#${header_id}`, 500, { offset: -88 })
    },
  },
})
</script>

<style lang="scss" module>
.headings {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &-link {
      @include font-p-regular-160;
      cursor: pointer;
      color: $color-primary-88;
      text-decoration: none;
    }
  }
}
</style>
