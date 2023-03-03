<template>
  <div v-if="pages.length > 0" :class="$style['wrapper']">
    <div :class="$style['pagination']">
      <a
        v-if="value !== 1"
        :href="generatePaginateHref(1)"
        @click.prevent="goToPage(1)"
        :class="[
          $style['pagination__item'],
          $style['pagination__item--to-first-page'],
        ]"
        title="Перейти на предыдущую страницу"
      >
        <svg-icon name="back-arrow" /><span>Предыдущая страница</span>
      </a>
      <a
        :href="generatePaginateHref(1)"
        @click.prevent="goToPage(1)"
        v-if="hasFirst"
        :class="$style['pagination__item']"
        title="Перейти на страницу №1"
        v-html="1"
      />
      <span
        v-if="hasFirst && value > 4"
        :class="[
          $style['pagination__item'],
          $style['pagination__item--divider'],
        ]"
        v-html="'...'"
      />
      <a
        :href="generatePaginateHref(page)"
        @click.prevent="goToPage(page)"
        v-for="page in pages"
        :key="`page-${page}`"
        :class="{
          [$style['pagination__item']]: true,
          [$style['pagination__item--current']]: value === page,
        }"
        :title="`Перейти на страницу №${page}`"
        v-html="page"
      />
      <span
        v-if="hasLast && lastPage - value > 3"
        :class="[
          $style['pagination__item'],
          $style['pagination__item--divider'],
        ]"
        v-html="'...'"
      />
      <a
        :href="generatePaginateHref(lastPage)"
        @click.prevent="goToPage(lastPage)"
        v-if="hasLast"
        :class="$style['pagination__item']"
        title="Перейти на последнюю страницу"
        v-html="lastPage"
      />
      <a
        v-if="value !== lastPage"
        :href="generatePaginateHref(nextPage)"
        @click.prevent="goToPage(nextPage)"
        :class="[
          $style['pagination__item'],
          $style['pagination__item--to-last-page'],
        ]"
        title="Перейти на следующую страницу"
      >
        <span>Следующая страница</span><svg-icon name="back-arrow" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Location } from 'vue-router/types/router'

type PageNumber = string | number

const pageRange: number = 2

export default defineComponent({
  name: 'BasePagination',
  props: {
    /**
     * Total records in pagination data
     */
    total: {
      type: Number,
      default: 0,
    },

    /**
     * Last page in pagination data
     */
    lastPage: {
      type: Number,
      default: 1,
    },

    /**
     * Loading state for disable/enable pagination
     * @TODO Need to think about implementation
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * Used for v-model
     */
    value: {
      type: Number,
      default: 1,
    },

    /**
     * Function for generate params for location
     */
    linkGenerator: {
      type: Function as PropType<(pageNumber: PageNumber) => Location>,
      default: () => {},
    },

    /**
     * If "false" - send only $emit with page number
     * If "true" - send $emit with page number and change
     */
    routerPush: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    generatePaginateLocation(pageNumber: PageNumber = '1'): Location {
      let routeParams: Location = this.linkGenerator(pageNumber)

      if (String(pageNumber) === '1') {
        delete routeParams.query!.page
      } else {
        routeParams.query!.page = String(pageNumber)
      }

      return routeParams
    },

    generatePaginateHref(pageNumber: PageNumber = '1'): string {
      return this.$router.resolve(this.generatePaginateLocation(pageNumber))
        .href
    },

    goToPage(pageNumber: PageNumber = '1') {
      this.$emit('input', pageNumber)

      // If a need change route after click to page button
      if (this.routerPush) {
        this.$router.push(this.generatePaginateLocation(pageNumber))
      }
    },
  },
  computed: {
    pages(): Array<number> {
      const pages = []

      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }

      return pages
    },

    rangeStart(): number {
      const start = this.value - pageRange
      return start > 0 ? start : 1
    },

    rangeEnd(): number {
      const end = this.value + pageRange
      return end < this.lastPage ? end : this.lastPage
    },

    nextPage(): number {
      return this.value + 1
    },

    prevPage(): number {
      return this.value - 1
    },

    hasFirst(): boolean {
      return this.rangeStart !== 1
    },

    hasLast(): boolean {
      return this.rangeEnd < this.lastPage
    },

    hasPrev(): boolean {
      return this.value > 1
    },

    hasNext(): boolean {
      return this.value < this.lastPage
    },
  },
})
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 10px 10px;
}
.pagination {
  display: flex;
  list-style: none;
  align-items: center;

  &__item {
    padding: 6px 10px 2px 10px;
    background-color: transparent;
    color: $color-gray-100;
    @include font-p-medium-160;
    text-decoration: none;
    border-radius: 8px;
    margin-right: 4px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: $color-gray-6;
    }
    
    &:last-child {
      margin-right: 0;
    }

    svg {
      width: 30px;
      height: 30px;
      fill: $color-primary-100;
    }

    &:not(&--current):not(&--divider):hover {
      background-color: $color-gray-4;
    }

    &--current {
      background-color: $color-primary-100;
      color: $color-white-100;
    }

    &--divider {
      color: $color-gray-40;
    }

    &--to-last-page,
    &--to-first-page {
      padding: 2px 6px 2px 10px;

      span {
        margin-top: 4px;
      }
    }

    &--to-first-page {
      svg {
        margin-right: 6px;
        transform: rotate(180deg);
      }
    }

    &--to-last-page {
      svg {
        margin-left: 6px;
      }
    }
  }
}
</style>
