<template>
  <section :class="$style['fastlinks']">
    <h3 :class="$style['fastlinks-title']" @click="onClick">
      {{ title }}
      <svg-icon name="dropdown-mini"></svg-icon>
    </h3>
    <div
      :style="{ height: contentHeight }"
      :class="$style['fastlinks__wrapper']"
    >
      <ol :class="$style['fastlinks__list']" ref="linkContainer">
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
      </ol>
    </div>
    <slot :name="`link-${$vnode.key}`"></slot>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'active',
    event: 'update',
  },
})
export default class BaseFastLinks extends Vue {
  @Prop({ type: String })
  public title!: string

  @Prop({ type: Array })
  public list!: Array<object>

  @Prop({ type: Boolean, default: false })
  public active!: boolean

  public show: boolean = this.active

  public contentHeight: string = '0px'

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
          ;($child as this).hideAccordion()
        }
      }
    }
  }

  hideAccordion() {
    this.contentHeight = '0px'
    this.show = false
  }

  showAccordion() {
    this.contentHeight =
      (this.$refs.linkContainer as Element).clientHeight + 'px'
    this.show = true
  }

  mounted() {
    if (this.active) {
      this.showAccordion()
    }
  }
}
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
        width: 24px;
        height: 24px;
        stroke: $color-gray-88;

        .dark & {
          stroke: $color-white-96;
        }
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
