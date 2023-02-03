<template>
  <main>
    <sections-about-our-team-detail />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SectionsAboutOurTeamDetail from '@/components/Sections/About/SectionsAboutOurTeamDetail/SectionsAboutOurTeamDetail.vue'

@Component({
  components: {
    SectionsAboutOurTeamDetail,
  },
})
export default class OurTeamPage extends Vue {
  mounted() {
    console.log(this.$route.path.split('/').slice(1, -1).pop())
  }
}
</script>

<style lang="scss" module></style>
