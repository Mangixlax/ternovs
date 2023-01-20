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
        <svg-icon name="arrow-right" />Предыдущая страница
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
        Следующая страница<svg-icon name="arrow-right" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Location } from 'vue-router/types/router'

type PageNumber = string | number

@Component
export default class BasePagination extends Vue {
  /**
   * Total records in pagination data
   */
  @Prop({ type: Number, default: 0 }) total!: number

  /**
   * Last page in pagination data
   */
  @Prop({ type: Number, default: 1 }) lastPage!: number

  /**
   * Loading state for disable/enable pagination
   * @TODO Need to think about implementation
   */
  @Prop({ type: Boolean, default: false }) loading!: boolean

  /**
   * Used for v-model
   */
  @Prop({ type: Number, default: 1 }) value!: number

  /**
   * Function for generate params for location
   */
  @Prop({ type: Function, default: () => {} }) linkGenerator!: (
    pageNumber: PageNumber
  ) => Location

  /**
   * If "false" - send only $emit with page number
   * If "true" - send $emit with page number and change
   */
  @Prop({ type: Boolean, default: true }) routerPush!: boolean

  public pageRange: number = 2

  public generatePaginateLocation(pageNumber: PageNumber = '1'): Location {
    let routeParams: Location = this.linkGenerator(pageNumber)

    if (String(pageNumber) === '1') {
      delete routeParams.query!.page
    } else {
      routeParams.query!.page = String(pageNumber)
    }

    return routeParams
  }

  public generatePaginateHref(pageNumber: PageNumber = '1'): string {
    return this.$router.resolve(this.generatePaginateLocation(pageNumber)).href
  }

  public goToPage(pageNumber: PageNumber = '1') {
    this.$emit('input', pageNumber)

    // If need change route after click to page button
    if (this.routerPush) {
      this.$router.push(this.generatePaginateLocation(pageNumber))
    }
  }

  get pages(): Array<number> {
    const pages = []

    for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
      pages.push(i)
    }

    return pages
  }

  get rangeStart(): number {
    const start = this.value - this.pageRange
    return start > 0 ? start : 1
  }

  get rangeEnd(): number {
    const end = this.value + this.pageRange
    return end < this.lastPage ? end : this.lastPage
  }

  get nextPage(): number {
    return this.value + 1
  }

  get prevPage(): number {
    return this.value - 1
  }

  get hasFirst(): boolean {
    return this.rangeStart !== 1
  }

  get hasLast(): boolean {
    return this.rangeEnd < this.lastPage
  }

  get hasPrev(): boolean {
    return this.value > 1
  }

  get hasNext(): boolean {
    return this.value < this.lastPage
  }
}
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
    padding: 6px 9px;
    border-radius: 6px;
    background-color: transparent;
    color: $color-black-100;
    @include size-13-regular;
    text-decoration: none;
    margin-right: 4px;
    display: flex;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }

    svg {
      width: 16px;
      height: 16px;
    }

    &:not(&--current):not(&--divider):hover {
      background-color: $color-black-4;
    }

    &--current {
      background-color: $color-blue-100;
      color: $color-white-100;
    }

    &--divider {
      color: $color-black-40;
    }

    &--to-last-page,
    &--to-first-page {
      border-radius: 9px;
      outline: 1px solid $color-black-8;
    }

    &--to-first-page {
      padding: 10px 10px 10px 14px;

      svg {
        margin-right: 6px;
        transform: rotate(180deg);
      }
    }

    &--to-last-page {
      padding: 10px 14px 10px 10px;

      svg {
        margin-left: 6px;
      }
    }
  }
}
</style>
