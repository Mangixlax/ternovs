<template>
  <main :class="$style['journal']">
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      ref="journalList"
    >
      <template #header>
        <h2>{{ category.title }}</h2>
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
        <base-pagination
          v-model="pagination.current_page"
          :last-page="pagination.last_page"
          :total="pagination.total"
          :link-generator="journalLinkGenerator"
        />
        <article-render
          v-for="(block, index) in getPageSeoContent"
          :key="index"
          :index="index"
          :block="block"
        />
      </template>
    </journal-list>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getSiteUrl } from '~/lib/utils'
import metaGenerator from '~/lib/meta'
import journalMixin from '~/mixins/journal-mixin'

import JournalNavigation from '~/components/Sections/Journal/JournalNavigation.vue'
import JournalList from '~/components/Sections/Journal/JournalList.vue'
import BasePagination from '~/components/Base/BasePagination.vue'
import ArticleRender from '~/components/Article/ArticleRender.vue'

export default defineComponent({
  components: {
    ArticleRender,
    JournalNavigation,
    JournalList,
    BasePagination,
  },
  mixins: [journalMixin],
  head() {
    const seo_page_data: any = this.page?.seo
    const seo_category_data: any = this.category?.seo

    const result: any = {
      title:
        'Журнал Терновс. Стоматология, лечениие, зубы, личный опыт | Ternovs.ru',
      description:
        'Самые свежие материалы для пациентов клиники. Интересное и полезное из мира стоматологии и вокруг нее.',
      canonical: this.$route.path,
    }

    if (seo_page_data) {
      result.title = seo_page_data.title
      result.description = seo_page_data.description
      result.og_title = seo_page_data.og_title
      result.og_description = seo_page_data.og_description
      result.keywords = seo_page_data.keywords
      result.canonical = seo_page_data?.canonical || result.canonical
      result.robots = seo_page_data?.robots
    }

    if (seo_category_data) {
      result.title = seo_category_data.title
      result.description = seo_category_data.description
      result.og_title = seo_category_data.og_title
      result.og_description = seo_category_data.og_description
      result.keywords = seo_category_data.keywords
      result.canonical = seo_category_data?.canonical || result.canonical
      result.robots = seo_category_data?.robots
    }

    result.canonical = getSiteUrl(result.canonical, true)

    if (this.$route.query?.page) {
      result.robots = 'noindex,follow'
    }

    return {
      title: result.title,
      meta: metaGenerator(result),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(result.canonical || this.$route.path, true),
        },
      ],
    }
  },
  methods: {
    onScrollToTop(offset = 0) {
      if (this.$refs.journalList) {
        this.$scrollTo(this.$refs.journalList, 500, { offset })
      }
    },
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
        name: 'Журнал',
        route: {
          name: 'zhurnal',
        },
      },
      {
        name: this.category.title,
        route: {
          name: 'zhurnal-category',
          params: {
            category: this.category.slug
          }
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.journal {
  width: 100%;
}
</style>
