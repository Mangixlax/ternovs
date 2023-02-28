<template>
  <main :class="$style['services']">
    <sections-services :item="category" />/
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import SectionsServices from '@/components/Sections/Services/SectionsServices.vue'

export default defineComponent({
  name: 'ServicesDetailPage',
  components: {
    SectionsServices,
  },
  async asyncData(ctx: Context) {
    const categoryResponse = await ctx.$repositories.services.getCategory(
      ctx.params.category
    )

    return {
      category: categoryResponse,
      isLoading: false as boolean,
    }
  },
  created() {
    this.$store.commit('setBreadCrumbs', [
      {
        name: 'Главная',
        route: {
          name: 'index',
        },
      },
      {
        name: 'Услуги',
        route: {
          name: 'uslugi',
        },
      },
      {
        name: this.category.name,
        route: {
          name: 'uslugi-category',
          params: {
            category: this.category.slug
          }
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.services {
  width: 100%;
  padding: 80px 0 0;
}
</style>
