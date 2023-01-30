<template>
  <main>
    <sections-reviews />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SectionsReviews from '@/components/Sections/Reviews/SectionsReviews.vue'

@Component({
  components: {
    SectionsReviews,
  },
})
export default class ReviewsPage extends Vue {}
</script>

<style lang="scss" module></style>
