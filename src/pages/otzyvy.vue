<template>
  <main>
    <sections-reviews />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import SectionsReviews from '@/components/Sections/Reviews/SectionsReviews.vue'

export default defineComponent({
  name: 'ReviewsPage',
  components: {
    SectionsReviews,
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
