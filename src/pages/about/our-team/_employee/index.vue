<template>
  <main>
    <sections-about-our-team-detail />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SectionsAboutOurTeamDetail from '@/components/Sections/About/SectionsAboutOurTeamDetail/SectionsAboutOurTeamDetail.vue'
import { Employee } from '@/types/models'

@Component({
  components: {
    SectionsAboutOurTeamDetail,
  },
})
export default class OurTeamPage extends Vue {

  get employeeById(): Employee {
    return this.$store.getters['employees/getEmployeeById'](
      this.employeeIdByRoute - 1
    )
  }

  get employeeIdByRoute(): any {
    return (this as any).$route.path.split('/').slice(1, -1).pop().split('-').pop()
  }

  mounted() {
    console.log(this.$route.path.split('/').slice(1, -1).pop())
  }
}
</script>

<style lang="scss" module></style>
