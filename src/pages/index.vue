<template>
  <main>
    <sections-home-about />
    <sections-home-services />
    <sections-home-reviews />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SectionsHomeAbout from '@/components/Sections/Home/SectionsHomeAbout/SectionsHomeAbout.vue'
import SectionsHomeReviews from '@/components/Sections/Home/SectionsHomeReviews/SectionsHomeReviews.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'

@Component({
  components: {
    SectionsHomeAbout,
    SectionsHomeReviews,
    SectionsHomeServices,
  },
})
export default class IndexPage extends Vue {}
</script>

<style lang="scss" module></style>
