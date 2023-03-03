<template>
  <li :class="$style['journal-card']">
    <div :class="$style['journal-card__wrapper']" v-bind="$attrs">
      <img
        :class="{
          [$style['journal-card__image']]: true,
          [$style['journal-card__image--loaded']]: isLoaded,
        }"
        :src="image"
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
          :category="card.category.title"
        />
      </div>
      <nuxt-link
        :to="{
          name: 'zhurnal-category-article',
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
    image(): any {
      const filePath = (this as any).card.poster.filename
        .match(/.{1,3}/g)
        .slice(0, 3)
        .join('/')

      return this.$img(`s3/` + filePath + '/' + this.card.poster.filename, {
        format: 'webp',
      })
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

  &__image {
    object-fit: cover;
    background-color: $color-gray-8;
    height: 250px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;

    &--loaded {
      background-color: transparent;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__title {
    @include font-h6-medium;
    margin-bottom: 6px;
  }

  &__link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    z-index: 3;
  }

  @include media-breakpoint-up('lg') {
    padding: 24px 24px 20px 24px;

    &:hover {
      background-color: $color-gray-4;
    }
  }
}
</style>
