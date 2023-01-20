<template>
  <div>
    <lazy-hydrate never :trigger-hydration="!$store.state.isBot">
      <nuxt />
    </lazy-hydrate>
    <!--    <lazy-hydrate when-visible>-->
    <!--      <base-seo-text />-->
    <!--    </lazy-hydrate>-->
    <!-- <lazy-hydrate when-visible>
      <base-fast-links />
    </lazy-hydrate> -->
    <!-- <lazy-hydrate when-visible="when-visible">
      <base-fast-links></base-fast-links>
    </lazy-hydrate> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import LazyHydrate from 'vue-lazy-hydration'

@Component({
  middleware: ['robots_detector'],
  components: {
    LazyHydrate,
  },
})
export default class DefaultLayout extends Vue {
  
  /**
   * Toggle Jivosite widget when modal window is opened or closed
   */
  initHandlersForToggleJivosite() {
    /**
     * Preventing listener re-creation
     */
    ;(this.$root as Vue).$off('modal:opened')
    ;(this.$root as Vue).$off('modal:closed')

    /**
     * Creating listeners for open and closed state of modals
     */
    ;(this.$root as Vue).$on('modal:opened', (api: any) => {
      if (api.dynamicModals.length) {
        document.body.classList.add(this.$style['modal-is-opened'])
      }
    })
    ;(this.$root as Vue).$on('modal:closed', (api: any) => {
      if (!api.dynamicModals.length) {
        document.body.classList.remove(this.$style['modal-is-opened'])
      }
    })
  }

  mounted() {
    this.initHandlersForToggleJivosite()
  }
}
</script>

<style lang="scss" module>
body.modal-is-opened {
  & > jdiv {
    display: none;
  }
}
</style>
