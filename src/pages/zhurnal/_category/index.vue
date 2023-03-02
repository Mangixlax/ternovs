<template>
  <main :class="$style['journal']">
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      ref="journalList"
    >
      <template #header>
        <h2>{{ category.title }}</h2>
        <p>{{ category.excerpt }}</p>
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
      title: `${this.category?.title} в журнале Терновс. Стоматология, лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `${this.category?.excerpt}`,
      route: this.$route,
      seo: this.category.seo || this.category.page,
    })
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
            category: this.category.slug,
          },
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
