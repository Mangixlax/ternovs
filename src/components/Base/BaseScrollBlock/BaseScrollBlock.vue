<template>
  <section :class="$style['block']">
    <div
      ref="scroll"
      :class="classes"
      @scroll="checkArrowsOnDisabled"
      @mousemove="positionCursorDrag"
      @mousedown="mouseDownOnBody"
      @mouseup="mouseUpOnBody"
      @mouseleave="mouseUpOnBody"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { scrollLeft } from '@/lib/utils'

export default defineComponent({
  name: 'BaseScrollBlock',
  components: {},
  props: {
    hasNavBtn: {
      type: Boolean,
      default: false,
    },

    hasPadding: {
      type: Boolean,
      default: false,
    },

    verticalPadding: {
      type: Boolean,
      default: true,
    },

    gapItem: {
      type: [Number, String],
      default: 0,
    },

    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mouseDownOnBlock: false,
      startX: 0,
      lastPositionMove: 0,
      scrollLeft: 0,
      widthBlock: 0,
      disableLeftBtn: false,
      disableRightBtn: false,
      scrollIsDisabled: false,
      positionWrap: null,
      allowClickTimer: null as ReturnType<typeof setTimeout> | null,
      allowClick: true,
      scrollingTimer: null,
      lastScrollAt: Date.now(),
    }
  },
  computed: {
    classes(): any {
      return [
        this.$style['scroll-block'],
        this.verticalPadding && this.$style['vertical-padding'],
        !this.allowClick && this.$style['click-disabled'],
        !this.disableLeftBtn &&
          !this.disableRightBtn &&
          this.$style['can-grabbing'],
      ]
    },

    refScroll(): HTMLElement {
      return this.$refs.scroll as HTMLElement
    },
  },
  methods: {
    /**
     * Скроллинг до элемента внутри scrollBlock
     * @param {Array|Element|Vue} el - DOM элемент
     * @param {Boolean} centered - центрировать позицию скролла
     */
    scrollToItem(el: any, centered: boolean = false) {
      const target = Array.isArray(el) ? el[el.length - 1] : el.$el || el

      let calcPosition = target.offsetLeft

      if (centered) {
        calcPosition += target.clientWidth / 2 - this.refScroll.clientWidth / 2
      }

      scrollLeft(this.$refs.scroll, calcPosition, 300)
    },

    checkWidthBlock() {
      this.widthBlock =
        this.refScroll.querySelector<HTMLElement>('[data-item]')?.offsetWidth ||
        0
    },

    positionCursorDrag(event: any) {
      // TODO: TBD
      event.preventDefault()
      if (!this.mouseDownOnBlock || !this.$refs.scroll) return

      const x = event.pageX - this.refScroll.offsetLeft
      const walk = (x - this.startX) * 1.2

      if (this.$refs.scroll) {
        this.refScroll.scrollLeft = this.scrollLeft - walk
      }

      this.checkArrowsOnDisabled()

      // Отслеживаем начало скроллинга
      if (Date.now() - this.lastScrollAt > 100) {
        // Запрещаем клики
        this.setClickState(false, 0)
      }

      this.lastScrollAt = Date.now()
    },

    mouseDownOnBody(event: any) {
      // TODO: TBD
      if (!this.$refs.scroll) return
      this.mouseDownOnBlock = true
      this.startX = event.pageX - this.refScroll.offsetLeft
      this.scrollLeft = this.refScroll.scrollLeft
    },

    mouseUpOnBody() {
      if (!this.$refs.scroll) return
      this.mouseDownOnBlock = false
      // Разрешаем клики
      this.setClickState(true)
    },

    async rightClick() {
      if (this.scrollIsDisabled || !this.$refs.scroll) return
      this.scrollIsDisabled = true
      this.checkWidthBlock()

      await scrollLeft(
        this.$refs.scroll,
        this.widthBlock + Number(this.gapItem) + this.refScroll.scrollLeft,
        300
      )

      this.checkArrowsOnDisabled()
      this.scrollLeft = this.refScroll.scrollLeft
      this.scrollIsDisabled = false
    },

    async leftClick() {
      if (this.scrollIsDisabled || !this.$refs.scroll) return
      this.scrollIsDisabled = true
      this.checkWidthBlock()

      await scrollLeft(
        this.$refs.scroll,
        this.refScroll.scrollLeft - this.widthBlock - Number(this.gapItem),
        300
      )

      this.checkArrowsOnDisabled()
      this.scrollIsDisabled = false
    },

    checkArrowsOnDisabled() {
      if (this.$refs.scroll) {
        this.disableLeftBtn = this.refScroll.scrollLeft === 0
        this.disableRightBtn =
          this.refScroll.scrollWidth ===
          this.refScroll.scrollLeft + this.refScroll.offsetWidth
      }
    },

    /**
     * Метод для запрета и разрешения кликов по блокам
     * @param {Boolean} value - true разрешить, false запретить
     * @param {Number} delay - задержка, с которой будет установлен параметр
     */
    setClickState(value: boolean, delay = 100) {
      this.allowClickTimer && clearTimeout(this.allowClickTimer as NodeJS.Timeout)
      this.allowClickTimer = null
      setTimeout(() => {
        this.allowClick = value
      }, delay)
    },
  },

  async mounted() {
    // Ждем обновления DOM
    await this.$nextTick()

    if (this.$refs.scroll) {
      this.checkArrowsOnDisabled()
    }
  },

  updated() {
    if (this.$refs.scroll) {
      this.checkArrowsOnDisabled()
    }
  },
})
</script>

<style lang="scss" module>
.block {
  position: relative;
  overflow: hidden;
}

.scroll-block {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none !important;
  scrollbar-width: none;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  z-index: 1;

  &.can-grabbing {
    cursor: grab;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.click-disabled.can-grabbing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

.click-disabled > * {
  pointer-events: none;
}

.nav-btn {
  position: absolute;
  top: 50%;
  width: 68px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $color-white-100;
  box-shadow: 0 0 32px rgba(25, 31, 46, 0.02);
  z-index: 1;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  border-radius: 32px 0 0 32px;
  opacity: 1;

  &.disable {
    pointer-events: none;
    cursor: default;
  }

  &:hover {
    box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.1);
  }

  &.left {
    transform: translateY(-50%) rotate(180deg);
    left: 0;

    &:hover {
      transform: translateY(-50%) rotate(180deg);
    }

    &.disable {
      opacity: 0;
      transform: translateY(-50%) translateX(-68px) rotate(180deg);
    }
  }

  &.right {
    transform: translateY(-50%);
    right: 0;

    &:hover {
      transform: translateY(-50%);
    }

    &.disable {
      opacity: 0;
      transform: translateY(-50%) translateX(68px);
    }
  }
}

.shadow__left,
.shadow__right {
  position: absolute;
  top: 0;
  height: 100%;
  width: 41px;
  background-color: $color-white-100;
  z-index: 1;
  transition: box-shadow 0.25s ease;

  &.disable {
    box-shadow: 0 0 16px -12px rgba(0, 0, 0, 0);
  }
}

.shadow__left {
  left: -41px;
  box-shadow: 8px 0 16px -12px rgba(0, 0, 0, 0.16);
}

.shadow__right {
  right: -41px;
  box-shadow: -8px 0 16px -12px rgba(0, 0, 0, 0.16);
}
</style>
