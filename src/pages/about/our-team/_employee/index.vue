<template>
  <div :class="$style['our_team']">
    <div :class="$style['our_team__grid']">
      <div :class="$style['our_team__grid-container']">
        <img
          :src="
            $img(`/sections/about/employees/${employeeById.folder}/avatar.png`)
          "
          :alt="`Сотрудник компании - ${employeeById.name}`"
        />
        <span>{{ employeeById.position }}</span>
        <h1>{{ employeeById.name }}</h1>
        <div>{{ employeeById.expierence }}</div>
        <p>{{ employeeById.description }}</p>
        <ui-form-button @click="onShowCallback">
          Записаться на прием
        </ui-form-button>
      </div>
    </div>
    <sections-about-our-team-accordion
      v-if="employeeById.accordion"
      :accordion="employeeById.accordion"
    />
    <sections-about-our-team-sertificates
      v-if="employeeById.sertificates"
      :employee="employeeById"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Employee } from '@/types/models/employee'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsAboutOurTeamAccordion from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeamAccordion.vue'
import SectionsAboutOurTeamSertificates from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeamSertificates.vue'

export default defineComponent({
  name: 'AbouAboutOurTeamDetailPagetOurTeamPage',
  components: {
    UiFormButton,
    SectionsAboutOurTeamAccordion,
    SectionsAboutOurTeamSertificates,
  },
  computed: {
    employeeById(): Employee {
      return this.$store.getters['employees/getEmployeeById'](
        this.employeeIdByRoute - 1
      )
    },
    employeeIdByRoute(): number {
      return (this as any).$route.path.split('/').slice(1, -1).pop().split('-').pop()
    },
  },
  methods: {
    onShowCallback() {
      this.$modal.show({
        bind: {
          name: 'Callback',
        },
        component: () =>
          import(
            '~/components/Modal/Content/Callback/ModalContentCallback.vue'
          ),
      })
    },
  },
})
</script>

<style lang="scss" module>
.our_team {
  width: 100%;

  &__grid {
    @include grid-container;
    padding: 80px 12px 40px 12px;

    &-container {
      grid-column: 1 / 5;
      display: flex;
      flex-direction: column;

      > img {
        height: 120px;
        width: 120px;
        margin-bottom: 34px;
      }

      > span {
        @include font-h5-medium;
        margin-bottom: 8px;
      }

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > div {
        @include font-h4-medium;
        margin-bottom: 24px;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-88;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      padding: 96px 0 48px;

      &-container {
        grid-column: 2 / 10;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      padding: 144px 0 72px;

      &-container {
        grid-column: 2 / 11;

        > img {
          height: 160px;
          width: 160px;
          margin-bottom: 48px;
        }

        > span {
          margin-bottom: 8px;
        }

        > h1 {
          margin: 0;
          margin-bottom: 32px;
          color: $color-gray-100;
        }

        > div {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 32px;
        }
      }
    }
  }
}
</style>
