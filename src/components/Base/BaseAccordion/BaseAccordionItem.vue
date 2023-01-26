<template>
  <section
    :class="$style['accordion']"
    itemscope="itemscope"
    itemprop="mainEntity"
    itemtype="https://schema.org/Question"
  >
    <div :class="$style['accordion__header']" @click="onClick">
      <h2 :class="$style['accordion__header-title']">
        {{ title }}
      </h2>
      <svg-icon
        name="form/dropdown"
        :class="$style['accordion__header-button']"
      ></svg-icon>
    </div>
    <div
      :style="{ height: myHeight }"
      :class="$style['accordion__body']"
      itemscope="itemscope"
      itemprop="acceptedAnswer"
      itemtype="https://schema.org/Answer"
    >
      <div ref="textContainer" itemprop="text">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseAccordionItem extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: false }) active!: boolean

  public show = this.active
  public myHeight = '0px'

  onClick() {
    if (this.show) {
      this.hideAccordion()
    } else {
      this.showAccordion()
    }

    // @TODO Поправить тип данных или переработать компонент без использования $parent/$children
    const $parent = this.$parent as any

    if ($parent.$children.length) {
      for (const $child of $parent.$children) {
        if (
          $child._name.includes('AccordionItem') &&
          this._uid !== $child._uid
        ) {
          $child.hideAccordion()
        }
      }
    }
  }

  hideAccordion() {
    this.myHeight = '0px'
    this.show = false
  }

  showAccordion() {
    this.myHeight = (this.$refs as any).textContainer.clientHeight + 'px'
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
.accordion {
  box-sizing: border-box;

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 26px 0;
    justify-content: space-between;

    &-title {
      @include font-h6-medium;
      color: $color-gray-100;
      max-width: 85%;
      margin: 0;
    }

    &-button {
      width: 30px;
      height: 30px;
      fill: $color-primary-88;
    }
  }

  &__body {
    display: flex;
    transition: all 1s ease;
    overflow: hidden;
    flex-direction: column-reverse;

    > div {
      padding-bottom: 24px;

      a {
        text-decoration: underline;
        text-decoration-color: $color-gray-4;
        text-underline-offset: 7px;
        color: $color-gray-100;
      }
      h2,
      h3,
      h4,
      p {
        margin: 0;
      }
      p {
        @include font-p-regular-160;
        color: $color-gray-88;

        & + & {
          margin-top: 6px;
        }
      }
    }
  }

  &__body p:first-child {
    margin-top: 0;
  }
}
</style>
