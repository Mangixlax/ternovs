<template>
  <div :class="$style['our_team']">
    <div :class="$style['our_team__grid']">
      <div :class="$style['our_team__grid-container']">
        <h2>Наша команда</h2>
        <p>
          Однако опорой клиники являются её собственные профессиональные
          стоматологи с колоссальным стажем работы.
          <br />
          Здесь Вам помогут снова обрести крепкие зубы и ослепительную улыбку, а
          также почувствовать радость и облегчение от получения других
          сопутствующих оздоровительных и реставрационных услуг.
          <br />
          Миссия нашей команды — больше здоровых красивых улыбок!
        </p>
        <div :class="$style['our_team__grid-items']">
          <sections-about-our-team-item
            v-for="(item, index) in employeesList"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Employee } from '@/types/models/employee'
import SectionsAboutOurTeamItem from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeamItem.vue'

export default defineComponent({
  name: 'SectionsAboutOurTeam',
  components: {
    SectionsAboutOurTeamItem,
  },
  computed: {
    employeesList(): Employee[] {
      return this.$store.getters['employees/getEmployeesList']
    },
  },
})
</script>

<style lang="scss" module>
.our_team {
  width: 100%;
  padding: 80px 0 40px;

  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;

      > h2 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        color: $color-gray-88;
        margin-bottom: 32px;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }
    }

    &-items {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 24px;
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }

      &-items {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 0 48px;

    &__grid {
      &-container {
        grid-column: 1 / 11;

        > h2 {
          padding: 0 96px;
        }

        > p {
          padding: 0 96px;
        }
      }

      &-items {
        padding: 0 72px;
        grid-row-gap: 24px;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 72px 0;

    &__grid {
      &-container {
        grid-column: 1 / 13;

        > h2 {
          margin-bottom: 32px;
        }

        > p {
          padding: 0 96px;
          margin-bottom: 48px;
        }
      }
    }
  }
}
</style>
