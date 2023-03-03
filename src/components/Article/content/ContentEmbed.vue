<template>
  <div :class="$style['embed']">
    <div :class="wrapperClasses">
      <loader v-if="!show"></loader>
      <div v-if="seen && isTwitter" v-html="block.data.oembed.html"></div>
      <iframe
        v-else-if="seen && isInstagram"
        ref="iframe"
        :src="block.data.embed"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        scrolling="no"
        allowtransparency="true"
        @load="iframeLoaded"
      ></iframe
      ><iframe
        v-else-if="seen && isYoutube"
        ref="iframe"
        :src="getYoutubeUrl"
        frameborder="0"
        allowfullscreen="allowfullscreen"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        @load="iframeLoaded"
      ></iframe
      ><iframe
        v-else-if="seen"
        ref="iframe"
        :src="block.data.embed"
        frameborder="0"
        allowfullscreen="allowfullscreen"
        @load="iframeLoaded"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Loader from '@/components/Common/Loader.vue'

export default defineComponent({
  name: 'ContentEmbed',
  components: { Loader },
  props: {
    block: {
      type: Object as any,
      default: () => {},
    },
  },
  data() {
    return {
      observer: null as null | IntersectionObserver,
      seen: false,
      show: false,
    }
  },
  async mounted() {
    await this.$nextTick()

    this.observer = new IntersectionObserver(async (entries: any) => {
      const image = entries[0]
      if (image.isIntersecting) {
        this.observer?.disconnect()

        // We seen that embed block on screen
        this.seen = true

        // If it twitter embed
        if (this.isTwitter) {
          try {
            // @ts-ignore
            typeof window.twttr !== 'undefined' && window.twttr.widgets.load()
            // eslint-disable-next-line no-empty
          } catch (e) {}

          this.show = true // Hide loader
        }
      }
    })

    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer && this.observer.disconnect()
  },
  methods: {
    iframeLoaded() {
      this.show = true
    },
  },
  computed: {
    isInstagram(): any {
      return String(this.block.data.service) === 'instagram'
    },

    isYoutube(): any {
      return String(this.block.data.service) === 'youtube'
    },

    isTwitter(): any {
      return String(this.block.data.service) === 'twitter'
    },

    wrapperClasses(): any {
      return [
        this.$style.video__wrapper,
        this.isInstagram && this.$style['embed__wrapper--instagram'],
        this.isYoutube && this.$style['embed__wrapper--youtube'],
        this.isTwitter && this.$style['embed__wrapper--twitter'],
      ]
    },

    getYoutubeUrl(): any {
      return this.isYoutube
        ? this.block.data.embed.replace(
            'www.youtube.com',
            'www.youtube-nocookie.com'
          )
        : ''
    },
  },
})
</script>

<style lang="scss" module>
.embed {
  margin: 18px 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__wrapper,
  iframe {
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 320px;
  }

  &__wrapper--instagram {
    border: 1px solid #ccd6dd;
    overflow: hidden;

    &,
    iframe {
      max-width: 400px;
      height: 505px;
      margin: 0 auto;
    }
  }

  &__wrapper--youtube {
    &,
    iframe {
      height: 400px;
    }
  }

  &__wrapper--twitter {
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    &,
    iframe {
      height: auto;
    }
  }

  &__caption {
    margin-top: 24px;
    color: rgba(25, 31, 46, 0.8);
    text-align: center;
  }
}
</style>
