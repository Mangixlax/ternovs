<template>
  <main :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h1>Услуги стоматологии</h1>
        <span>
          Работа ведётся по четырём основным направлениям: ортопедия, хирургия,
          терапия и ортодонтия. Новейшее оборудование и методики позволяют
          добиться блестящего результата работы как в прямом, так и переносном
          смысле. Тысяч довольных пациентов уже получили свою возможность снова
          улыбаться. Возможно, следующим счастливым человеком сможете стать
          именно Вы.
        </span>
        <base-scroll-block>
          <div :class="$style['services__grid-links']">
            <nuxt-link
              v-for="(item, index) in categoriesList"
              :key="index"
              :to="{
                name: 'uslugi-category',
                params: { category: item.slug },
              }"
            >
              {{ item.short_name }}
            </nuxt-link>
          </div>
        </base-scroll-block>
      </div>
    </div>
    <div :class="$style['services__list']">
      <sections-services
        v-for="(item, index) in categoriesList"
        :key="index"
        :item="item"
      />
    </div>
    <journal-list
      :posts-list="postList"
      :is-loading="isLoading"
      ref="journalList"
    >
      <template #header>
        <h2>Другие наши услуги</h2>
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
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import SectionsServices from '@/components/Sections/Services/SectionsServices.vue'
import BaseScrollBlock from '@/components/Base/BaseScrollBlock/BaseScrollBlock.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'ServicesPage',
  components: {
    SectionsServices,
    BaseScrollBlock,
    JournalList,
    UiFormButton,
    LayoutCallback,
  },
  async asyncData(ctx: Context) {
    let [categoriesListResponse, postListResponse] = await Promise.all([
      ctx.$repositories.services.getCategoriesList(),
      ctx.$repositories.journal.getPostsList({
        query: {
          per_page: 1000,
        },
      }),
    ])

    return {
      categoriesList: categoriesListResponse.data,
      categoriesListResponse: categoriesListResponse,
      postList: postListResponse.data.slice(-10),
      isLoading: false as boolean,
    }
  },
  head() {
    return getHead({
      title: `Услуги клиники Терновс. Стоматология, лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `Наша стоматология №1 в вопросе здоровых улыбок`,
      route: this.$route,
      seo: this.categoriesListResponse.page,
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
        name: 'Услуги',
        route: {
          name: 'uslugi',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.services {
  width: 100%;
  padding: 80px 0 0;

  &__grid {
    @include grid-container;
    padding: 0;

    &-container {
      grid-column: 1 / 5;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        color: $color-gray-100;
        margin-bottom: 24px;
        padding: 0 12px;
      }

      > span {
        @include font-lead-regular-160;
        display: block;
        color: $color-gray-100;
        padding: 0 12px;
        margin-bottom: 24px;
      }
    }

    &-links {
      display: flex;
      grid-gap: 8px;
      padding-left: 12px;

      > a {
        @include font-p-medium-160;
        text-decoration: none;
        padding: 10px 20px 8px 20px;
        background: $color-gray-4;
        color: $color-gray-100;
        border-radius: 30px;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      padding: 0 12px;

      &-container {
        grid-column: 1 / 9;

        > h1 {
          padding: 0;
        }

        > span {
          padding: 0;
        }
      }

      &-links {
        padding-left: 0;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 0 0;

    &__grid {
      &-container {
        grid-column: 2 / 9;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 0;

    &__grid {
      &-container {
        grid-column: 2 / 11;
      }
    }
  }
}
</style>
