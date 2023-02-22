<template>
  <div
    :class="{
      [$style['journal-statistic']]: true,
      [$style['journal-statistic--white']]: isWhite,
    }"
  >
    <span> {{ category }}</span>
    <time :class="$style['journal-statistic__date']" :datetime="dateTime">
      {{ getPublishedDate }}
    </time>
    <div :class="$style['journal-statistic__view']">
      <svg-icon
        name="journal/vision-edit"
        :class="$style['journal-statistic__view-icon']"
      />
      <span>{{ viewsCount }}</span>
    </div>
    <!--    <div :class="$style['journal-statistic__comment']">-->
    <!--      <svg-icon-->
    <!--        name="journal/comment"-->
    <!--        :class="$style['journal-statistic__comment-icon']"-->
    <!--      />-->
    <!--      {{ statistic.comment }}-->
    <!--    </div>-->
    <!--    <div :class="$style['journal-statistic__favorite']">-->
    <!--      <svg-icon-->
    <!--        name="journal/favorite"-->
    <!--        :class="$style['journal-statistic__favorite-icon']"-->
    <!--      />-->
    <!--      {{ statistic.favorite }}-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'JournalStatistic',
  props: {
    publishedAt: { type: Number, default: null },
    viewsCount: { type: Number, default: 0 },
    isWhite: { type: Boolean, default: false },
    category: { type: String, default: '' },
  },
  computed: {
    getPublishedDate(): string {
      const publishDate = new Date(this.publishedAt * 1000)
      const currentYear = new Date().getFullYear()

      if (currentYear == this.$dayjs(publishDate).format('YYYY')) {
        return this.$dayjs(publishDate).format('D MMMM')
      } else {
        return this.$dayjs(publishDate).format('D MMMM YYYY')
      }
    },

    dateTime(): string {
      const publishDate = new Date(this.publishedAt * 1000)

      return this.$dayjs(publishDate).format('YYYY-MM-DDTHH:mm:ss:SSSZZ')
    },
  },
})
</script>

<style lang="scss" module>
.journal-statistic {
  width: 100%;
  display: flex;
  @include font-small-medium;
  align-items: center;

  span, time {
    margin-top: 3px;
    color: $color-gray-100;
  }

  time {
    margin-left: 8px;
    margin-right: 8px;

    &::before {
      content: '·';
      color: $color-gray-40;
      margin-right: 7px;
    }
  }

  &__date {
    margin-right: 8px;
    color: $color-gray-100;
  }

  &__view {
    display: flex;
    margin-right: 14px;
    align-items: center;

    > span {
      margin-top: 3px;
      color: $color-gray-64;
    }

    &-icon {
      margin-right: 4px;
      fill: $color-gray-40;
      height: 25px;
      width: 25px;
    }
  }

  &__comment {
    display: flex;
    margin-right: 14px;
    align-items: center;

    &-icon {
      margin-right: 4px;
      fill: $color-gray-40;
      height: 20px;
      width: 25px;
    }
  }

  &__favorite {
    display: flex;
    align-items: center;

    &-icon {
      margin-right: 4px;
      fill: $color-gray-40;
      height: 18px;
      width: 18px;
    }
  }
}

.journal-statistic--white {
  color: $color-white-80;

  &__view {
    &-icon {
      fill: $color-white-80;
    }
  }

  &__comment {
    &-icon {
      fill: $color-white-80;
    }
  }

  &__favorite {
    &-icon {
      fill: $color-white-80;
    }
  }
}
</style>
