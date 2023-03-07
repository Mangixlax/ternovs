<template>
  <main :class="$style['about']">
    <div :class="$style['about__grid']">
      <div :class="$style['about__grid-container']">
        <h1>Стоматологи, которых не боятся</h1>
        <p>
          Клиника «Авторская стоматология Терновых» – это место сочетания
          профессиональных стоматологических услуг, честной цены, опыта
          специалистов, комфорта и максимально возможного отсутствия боли при
          процедурах.
        </p>
        <p>
          <img
            :src="$img('/sections/about/our-team.jpg', { format: 'webp' })"
            alt="Наша команда"
            :class="$style['about__grid-container-image']"
          />
        </p>
        <span>Команда клиники «Авторская стоматология Терновых»</span>
      </div>
    </div>
    <sections-home-benefits />
    <sections-home-services />
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
    <layout-callback />
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import SectionsHomeBenefits from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefits.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'
import SectionsAboutOurTeam from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeam.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'AboutPage',
  components: {
    SectionsHomeBenefits,
    SectionsHomeServices,
    SectionsAboutOurTeam,
    JournalList,
    UiFormButton,
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
      title: `О нашей авторской стоматологии Терновс. Лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `Свяжитесь с нами, нельзя откладывать лечение зубов, ведь они как нервные клетки - не восстанавливаются`,
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
        name: 'О компании',
        route: {
          name: 'o-kompanii',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.about {
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

      > p:first-of-type {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 40px;
        color: $color-gray-88;
      }

      &-image {
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

        > p:first-of-type {
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

        > p:first-of-type {
          margin-bottom: 72px;
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
