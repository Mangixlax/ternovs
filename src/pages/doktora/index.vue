<template>
  <main :class="$style['our_team']">
    <div :class="$style['our_team__grid']">
      <div :class="$style['our_team__grid-container']">
        <h1>О команде</h1>
        <p>
          Однако опорой клиники являются её собственные профессиональные
          стоматологи с колоссальным стажем работы. <br />
          Здесь Вам помогут снова обрести крепкие зубы и ослепительную улыбку, а
          также почувствовать радость и облегчение от получения других
          сопутствующих оздоровительных и реставрационных услуг.<br />
          Миссия нашей команды — больше здоровых красивых улыбок!
        </p>
        <img
          :src="
            $img('/sections/about/our-team.jpg', {
              format: 'webp',
            })
          "
          alt="Наша команда"
        />
        <span>Команда клиники «Авторская стоматология Терновых»</span>
      </div>
    </div>
    <sections-about-our-team />
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
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
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'
import SectionsAboutOurTeam from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeam.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'AboutOurTeamPage',
  components: {
    UiFormButton,
    SectionsAboutOurTeam,
    JournalList,
    LayoutCallback,
  },
  async asyncData(ctx: Context) {
    const postsListResponse = await ctx.$repositories.journal.getPostsList({
      query: {
        page: ctx.route.query.page || 1,
        per_page: 6,
      },
    })

    return {
      postsList: postsListResponse.data || ([] as any),
      postsListResponse: postsListResponse,
      isLoading: false,
    }
  },
  head() {
    return getHead({
      title: `Встречайте нашу команду докторов - авторскую стоматологию Терновых | Ternovs.ru`,
      description: `Наши доктора - это профессионалы своего дела с многолетним опытом работы в стоматологии. Мы стремимся предоставить лучшее лечение для наших пациентов, используя современные технологии и инновационные методы лечения. Узнайте больше о нашей команде докторов и наших услугах на сайте авторской стоматологии Терновых.`,
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
      {
        name: 'Наша команда',
        route: {
          name: 'doktora',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.our_team {
  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;
      padding: 80px 0 24px;
      display: flex;
      flex-direction: column;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 40px;
        color: $color-gray-88;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }

      > img {
        width: 100%;
        height: auto;
        object-fit: cover;
        margin-bottom: 24px;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-64;
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
      &-container {
        padding: 96px 0 24px;
        grid-column: 1 / 11;

        > h1 {
          padding: 0 192px 0 96px;
        }

        > p {
          margin-bottom: 48px;
          padding: 0 192px 0 96px;
        }

        > span {
          padding: 0 192px 0 96px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        padding: 144px 0 24px;
        grid-column: 1 / 13;

        > h1 {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 72px;
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
