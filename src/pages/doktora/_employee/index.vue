<template>
  <div :class="$style['our_team']">
    <div :class="$style['our_team__grid']">
      <div :class="$style['our_team__grid-container']">
        <img
          :src="
            $img(`/sections/about/employees/${employeeById.slug}/avatar.png`)
          "
          :alt="`Сотрудник компании - ${employeeById.name}`"
        />
        <span>{{ employeeById.position }}</span>
        <h1>{{ employeeById.name }}</h1>
        <div>{{ employeeById.expierence }}</div>
        <p>{{ employeeById.description }}</p>
        <ui-form-button> Записаться на прием </ui-form-button>
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
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      ref="journalList"
      v-if="postsList.length"
    >
      <template #header>
        <h2>Новости клиники</h2>
        <p>
          Ежедневно в нашу клинику обращаются десятки новых пациентов, но
          вопросы, которые они задают - одни и те же. Масштабы заблуждений в
          области стоматологии поражают воображение: многие боятся врачей,
          кто-то не доверяет им, а другие - агрессивны и недоверчивы по
          отношению к медицине в целом. При этом практически все пациенты читают
          разные форумы в интернете и занимаются самолечением. Мы решили, что с
          этим нужно бороться.
        </p>
      </template>
      <template #footer>
        <ui-form-button
          variant="gray"
          tag="nuxt-link"
          :to="{
            name: 'zhurnal',
          }"
          :style="{ margin: '0 auto' }"
        >
          Показать больше
        </ui-form-button>
      </template>
    </journal-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Employee } from '@/types/models/employee'
import { Context } from '@nuxt/types'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsAboutOurTeamAccordion from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeamAccordion.vue'
import SectionsAboutOurTeamSertificates from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeamSertificates.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'

export default defineComponent({
  name: 'AbouAboutOurTeamDetailPagetOurTeamPage',
  components: {
    UiFormButton,
    SectionsAboutOurTeamAccordion,
    SectionsAboutOurTeamSertificates,
    JournalList,
  },
  async asyncData(ctx: Context) {
    const employee = await ctx.store.getters['employees/getEmployeeBySlug'](
      ctx.params.employee
    )

    if (!employee) {
      ctx.error({ statusCode: 404 })
    }

    const postsListResponse = await ctx.$repositories.journal.getPostsList({
      query: {
        page: ctx.route.query.page || 1,
        per_page: 6,
      },
    })

    return {
      employeeById: employee as Employee,
      postsList: postsListResponse.data || ([] as any),
      postsListResponse: postsListResponse,
      isLoading: false,
    }
  },
  created() {
    this.$store.commit('setBreadCrumbs', [
      {
        name: 'Главная',
        route: {
          name: 'index',
        },
      },
      {
        name: 'Наша комманда',
        route: {
          name: 'doktora',
        },
      },
      {
        name: this.employeeById.name,
        route: {
          name: 'doktora-employee',
          params: {
            employee: this.employeeById.slug,
          },
        },
      },
    ])
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
