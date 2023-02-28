<template>
  <main>
    <sections-reviews />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import SectionsReviews from '@/components/Sections/Reviews/SectionsReviews.vue'

export default defineComponent({
  name: 'ReviewsPage',
  components: {
    SectionsReviews,
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
