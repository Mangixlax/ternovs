<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    :class="{
      [$style['thumbnail']]: true,
      [$style['thumbnail--loaded']]: isSeen,
      [$style['thumbnail--ratio-16:9']]: ratio === '16:9',
      [$style['thumbnail--ratio-4:3']]: ratio === '4:3',
    }"
  >
    <span
      v-if="srcBlur"
      :style="getBlurImageStyle"
      :class="$style['thumbnail-background']"
    />
    <img
      v-if="src"
      ref="img"
      loading="lazy"
      decoding="async"
      :src="getSrc"
      :srcset="srcset"
      :alt="alt"
      :title="title"
      :class="{
        [$style['thumbnail-image']]: true,
        [$style['thumbnail-image--loaded']]: isLoaded,
        [$style['thumbnail-image--cover']]: forceCover,
      }"
    />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class UiImage extends Vue {
  @Prop({ type: String, required: true, default: '' })
  src!: string

  @Prop({ type: String, default: '' })
  srcBlur!: string

  @Prop({ type: String, default: null })
  alt!: string

  @Prop({ type: String, default: null })
  title!: string

  @Prop({ type: Boolean, default: false })
  zoom!: boolean

  @Prop({ type: Boolean, default: false })
  forceCover!: boolean

  @Prop({ type: String, default: '' })
  ratio!: string

  public observer: IntersectionObserver | null = null
  public isSeen: boolean = false
  public isLoaded: boolean = false
  public srcset: string | null =
    'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA= 100w'
  public sizes: string | null = null

  get getSrc(): string {
    return this.src.indexOf('_ipx') !== -1 ? this.src : this.$img(this.src, { format: 'webp' })
  }

  get getBlurImageStyle(): Record<string, string> {
    return {
      'background-image': `url(${this.srcBlur})`,
    }
  }

  public changeSrcSet() {
    if (this.isSeen) {
      this.srcset = null
      this.sizes = null
    } else {
      this.srcset =
        'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA= 100w'
      this.sizes = `(max-width: 0px) 100vw, 0px`
    }
  }

  @Watch('src')
  async onChangeImage() {
    await this.$nextTick()
    this.init()
  }

  public checkInView() {
    if (!this.isSeen) {
      const rect = this.$el.getBoundingClientRect()
      const r =
        typeof window !== 'undefined' &&
        window !== null &&
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0

      if (r) {
        this.isSeen = true
        this.loadImage()
        window.removeEventListener('scroll', this.checkInView)
        window.removeEventListener('resize', this.checkInView)
        document.removeEventListener('DOMContentLoaded', this.checkInView)
      }
    }
  }

  public destroyIntersectionObserver() {
    this.observer && this.observer.disconnect()
  }

  public loadImage() {
    if (this.isLoaded) return

    this.changeSrcSet()

    const image = new Image()
    image.src = this.src
    this.srcset && (image.srcset = this.srcset)
    this.sizes && (image.sizes = this.sizes)

    if (image.complete) {
      this.isLoaded = true
    } else {
      image.onload = () => {
        this.isLoaded = true
      }
    }
  }

  public loadBlurImage() {
    if (this.srcBlur) {
      const image = new Image()
      image.src = this.srcBlur
    }
  }

  public createIntersectionObserver() {
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        const image = entries[0]
        if (image.intersectionRatio > 0 || image.isIntersecting) {
          this.observer?.unobserve(image.target)

          if (!this.isSeen) {
            this.isSeen = true
            this.loadBlurImage()
            this.loadImage()
          }
        }
      })

      this.$el && this.observer.observe(this.$el)
    }
  }

  public init() {
    this.destroy()

    if (window && window.IntersectionObserver) {
      this.createIntersectionObserver()
    } else {
      window.addEventListener('scroll', this.checkInView)
      window.addEventListener('resize', this.checkInView)
      document.addEventListener('DOMContentLoaded', this.checkInView)

      this.checkInView()
    }
  }

  public destroy() {
    this.destroyIntersectionObserver()
    this.isSeen = false
    this.isLoaded = false
    this.observer = null
  }

  async mounted() {
    await this.$nextTick()
    this.init()
  }
}
</script>

<style lang="scss" module>
@keyframes show {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.thumbnail {
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background-color: $color-black-6;
    background-image: url(~/assets/sprite/svg/loader.svg);
    background-size: 22px;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    z-index: 2;
  }

  &--ratio-16\:9:before,
  &--ratio-4\:3:before {
    position: relative;
  }

  &--ratio-16\:9:before {
    padding-top: 56.25%;
  }

  &--ratio-4\:3:before {
    padding-top: 75%;
  }

  &:not(&--loaded):before {
    opacity: 0;
    animation: show 0.2s 1;
    animation-fill-mode: forwards;
  }

  &--loaded:before {
    opacity: 1;
    animation: hide 0.2s 1;
    animation-fill-mode: forwards;
  }

  &-image {
    width: 100%;
    height: 100%;
    position: relative;
    max-width: 100%;
    max-height: 100%;
    z-index: 3;
    object-fit: scale-down;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease-out;

    &--loaded {
      animation: show 0.2s 1;
      animation-fill-mode: forwards;
    }

    &--cover {
      object-fit: cover;
    }
  }

  &--ratio-16\:9 &-image,
  &--ratio-4\:3 &-image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &-background {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    background-size: cover;
    background-position: 50%;
    opacity: 0;
    transition: opacity 0.5s ease-out;
    animation: show 0.2s 1;
    animation-fill-mode: forwards;
    pointer-events: none;
  }
}
</style>
