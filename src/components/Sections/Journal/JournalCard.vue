<template>
  <li :class="$style['journal-card']">
    <div :class="$style['journal-card__wrapper']" v-bind="$attrs">
      <img
        :class="{
          [$style['journal-card__image']]: true,
          [$style['journal-card__image--loaded']]: isLoaded,
        }"
        :src="poster"
        loading="lazy"
        decoding="async"
        @load="isLoaded = true"
      />
      <div :class="$style['journal-card__container']">
        <div :class="$style['journal-card__title']">
          {{ card.title }}
        </div>
        <journal-statistic
          :published-at="card.published_at"
          :views-count="card.views_count"
        />
      </div>
      <nuxt-link
        :to="{
          name: 'journal-category-article',
          params: {
            category: card.category.slug,
            article: card.slug,
          },
        }"
        :class="$style['journal-card__link']"
      />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import JournalAuthor from '~/components/Sections/Journal/JournalAuthor.vue'
import JournalStatistic from '~/components/Sections/Journal/JournalStatistic.vue'

export default defineComponent({
  name: 'JournalCard',
  components: {
    JournalAuthor,
    JournalStatistic,
  },
  props: {
    card: { type: Object as PropType<any>, default: () => {} },
  },
  data() {
    return {
      isLoaded: false as boolean,
    }
  },
  computed: {
    poster(): string {
      if (this.card.poster) {
        const filePath = this.card.poster.filename
          .match(/.{1,3}/g)
          ?.slice(0, 3)
          .join('/')

        return this.$img(`st3/` + filePath + '/' + this.card.poster.filename, {
          format: 'webp',
          height: 250,
          width: 250,
        })
      }

      return ''
    },
  },
})
</script>

<style lang="scss" module>
.journal-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 8px;
  border-collapse: separate;
  z-index: 0;
  overflow: hidden;
  background: $color-gray-4;

  &__image {
    object-fit: cover;
    background-color: $color-gray-8;
    height: 196px;
    width: 100%;

    &--loaded {
      background-color: transparent;
    }
  }

  &__container {
    padding: 0 20px;
    display: flex;
  }

  &__author {
    margin-bottom: 12px;
  }

  &__tags {
    margin-bottom: 12px;
  }

  &__title {
    @include font-p-regular-160;
    margin: 12px 0;
  }

  &__link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    z-index: 3;

    &:hover ~ .journal-card__title {
      color: $color-primary-100;
    }
  }
}
</style>
