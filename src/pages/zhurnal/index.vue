<template>
  <main :class="$style['journal']">
    <journal-navigation :categories-list="categoriesList" />
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      ref="journalList"
    >
      <template #header>
        <h2>Актуальное в журнале</h2>
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

import { getHead } from '~/lib/utils'
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
    return getHead({
      title: `Журнал Терновс. Стоматология, лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `Самое интересное в журнале Терновс`,
      route: this.$route,
      seo: this.postsListResponse.page,
    })
  },
  methods: {
    onScrollToTop(offset = 580) {
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
    ])
  },
})
</script>

<style lang="scss" module>
.journal {
  width: 100%;
}
</style>
