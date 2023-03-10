<template>
  <section :class="$style['fastlinks']">
    <span :class="$style['fastlinks-title']" @click="onClick">
      {{ title }}
      <svg-icon name="form/dropdown" />
    </span>
    <div
      :style="{ height: contentHeight }"
      :class="$style['fastlinks__wrapper']"
    >
      <component
        :is="tag"
        :class="$style['fastlinks__list']"
        ref="linkContainer"
      >
        <li
          v-for="(link, i) in list"
          :key="i"
          :class="$style['fastlinks__item']"
        >
          <nuxt-link
            :class="$style['fastlinks__item-link']"
            :to="link.route"
            :title="link.label"
          >
            {{ link.label }}
          </nuxt-link>
        </li>
        <slot />
      </component>
    </div>
    <slot :name="`link-${$vnode.key}`" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { fastLink } from '~/types/components/footer'

export default defineComponent({
  name: 'BaseFastLinks',
  model: {
    prop: 'active',
    event: 'update',
  },
  props: {
    title: { type: String, default: '' },
    list: { type: Array as PropType<fastLink[]>, default: () => [] },
    active: { type: Boolean, default: false },
    tag: { type: String, default: 'ol' },
  },
  data() {
    return {
      show: <boolean>this.active,
      contentHeight: <string>'0px',
    }
  },
  methods: {
    onClick() {
      if (this.show) {
        this.hideAccordion()
      } else {
        this.showAccordion()
      }
      if (this.$parent?.$children.length) {
        for (const $child of this.$parent.$children) {
          if (
            ($child as any)._name.includes('BaseFastLinks') &&
            (this as any)._uid !== ($child as any)._uid
          ) {
            $child.hideAccordion()
          }
        }
      }
    },
    hideAccordion() {
      this.contentHeight = '0px'
      this.show = false
    },
    showAccordion() {
      this.contentHeight =
        (this.$refs.linkContainer as Element).clientHeight + 'px'
      this.show = true
    },
  },
  mounted() {
    if (this.active) {
      this.showAccordion()
    }
  },
})
</script>

<style lang="scss" module>
.fastlinks {
  display: flex;
  flex-direction: column;
  position: relative;

  > div {
    overflow: hidden;
    transition: all 1s ease;
  }

  &-title {
    @include font-h6-medium;
    display: flex;
    color: $color-gray-100;
    white-space: nowrap;
    position: relative;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    margin-bottom: 28px;

    svg {
      display: none;
      width: 30px;
      height: 30px;
      fill: $color-gray-80;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    justify-content: center;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;

    & + & {
      margin-top: 8px;
    }

    &-link {
      @include font-p-regular-160;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      text-decoration: none;
      color: $color-gray-72;
    }
  }

  @include media-breakpoint-up('md') {
    & > div {
      height: auto !important;
    }
  }

  @include media-breakpoint-down('md') {
    width: 100%;

    &-title {
      cursor: pointer;
      padding: 3px 0;
      margin-bottom: 0;

      svg {
        display: inline-block;
      }
    }

    &__wrapper {
      padding-bottom: 28px;
      border-bottom: 2px solid $color-gray-4;
    }

    &__list {
      padding-top: 28px;
      padding-bottom: 14px;
    }
  }
}
</style>
