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
})
</script>

<style lang="scss" module></style>
