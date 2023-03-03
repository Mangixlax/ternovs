<template>
  <main>
    <sections-home-slider />
    <sections-home-about />
    <layout-address />
    <sections-home-benefits />
    <sections-home-services />
    <sections-home-reviews />
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import SectionsHomeSlider from '@/components/Sections/Home/SectionsHomeSlider.vue'
import LayoutAddress from '@/components/Layout/LayoutAddress.vue'
import SectionsHomeAbout from '@/components/Sections/Home/SectionsHomeAbout.vue'
import SectionsHomeBenefits from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefits.vue'
import SectionsHomeReviews from '@/components/Sections/Home/SectionsHomeReviews/SectionsHomeReviews.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    SectionsHomeSlider,
    LayoutAddress,
    SectionsHomeAbout,
    SectionsHomeBenefits,
    SectionsHomeReviews,
    SectionsHomeServices,
    LayoutCallback,
  },
  head() {
    return getHead({
      title: `Авторская стоматология Терновс. Лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `Стоматология терновс является одной из луших в своей сфере. Мы поможем вашей улыбке сиять и радовать Вас`,
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
    ])
  },
})
</script>

<style lang="scss" module></style>
