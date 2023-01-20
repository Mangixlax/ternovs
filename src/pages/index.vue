<template>
  <main>

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getSiteUrl } from '~/lib/utils'
import metaGenerator from '~/lib/meta'

@Component({
  components: {},
  head() {
    const result: any = {
      title: ``,
      canonical: this.$route.path,
    }

    result.canonical = getSiteUrl(result.canonical, true)

    return {
      title: result.title,
      meta: metaGenerator(result),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(result.canonical || this.$route.path, true),
        },
      ],
    }
  },
})

export default class IndexPage extends Vue {}
</script>

<style lang="scss" module>
</style>
