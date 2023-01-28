<template>
  <main>
    <sections-home-about />
    <layout-address />
    <sections-home-benefits />
    <sections-home-services />
    <sections-home-reviews />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LayoutAddress from '@/components/Layout/LayoutAddress.vue'
import SectionsHomeAbout from '@/components/Sections/Home/SectionsHomeAbout.vue'
import SectionsHomeBenefits from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefits.vue'
import SectionsHomeReviews from '@/components/Sections/Home/SectionsHomeReviews/SectionsHomeReviews.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'

@Component({
  components: {
    LayoutAddress,
    SectionsHomeAbout,
    SectionsHomeBenefits,
    SectionsHomeReviews,
    SectionsHomeServices,
  },
})
export default class IndexPage extends Vue {}
</script>

<style lang="scss" module></style>
