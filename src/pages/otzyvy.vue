<template>
  <main>
    <sections-reviews />
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import SectionsReviews from '@/components/Sections/Reviews/SectionsReviews.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'ReviewsPage',
  components: {
    SectionsReviews,
    LayoutCallback,
  },
  head() {
    return getHead({
      title: `Отзывы пациентов о стоматологии Терновых | Ternovs.ru`,
      description: `Прочитайте отзывы наших пациентов, которые описывают свой опыт лечения и оставляют свои рекомендации.`,
      route: this.$route,
    })
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
        name: 'Отзывы',
        route: {
          name: 'otzyvy',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module></style>
