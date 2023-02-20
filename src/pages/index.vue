<template>
  <main>
    <sections-home-slider />
    <sections-home-about />
    <layout-address />
    <sections-home-benefits />
    <sections-home-services />
    <sections-home-reviews />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import SectionsHomeSlider from '@/components/Sections/Home/SectionsHomeSlider.vue'
import LayoutAddress from '@/components/Layout/LayoutAddress.vue'
import SectionsHomeAbout from '@/components/Sections/Home/SectionsHomeAbout.vue'
import SectionsHomeBenefits from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefits.vue'
import SectionsHomeReviews from '@/components/Sections/Home/SectionsHomeReviews/SectionsHomeReviews.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    SectionsHomeSlider,
    LayoutAddress,
    SectionsHomeAbout,
    SectionsHomeBenefits,
    SectionsHomeReviews,
    SectionsHomeServices,
  },
})
</script>

<style lang="scss" module></style>
