<template>
  <main :class="$style['journal']">
    <journal-navigation :categories-list="categoriesList" />
    <div :class="$style['journal-list__wrapper']" ref="journalList">
      <!-- <journal-list :posts-list="postsList" :is-loading="isLoading">
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
      </journal-list> -->
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { Location, Dictionary } from 'vue-router/types/router'

import { getSiteUrl } from '~/lib/utils'
import metaGenerator from '~/lib/meta'

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
  async asyncData(ctx: Context) {
    const postsListResponse = await ctx.$repositories.media.getPostsList({
      query: {
        search: {
          category_slug: ctx.route.params.category,
        },
        page: ctx.route.query.page || 1,
        per_page: 9,
      },
    })

    if (!postsListResponse.category && ctx.route.params.category) {
      ctx.error({ statusCode: 404 })
    }

    // TODO: TBD
    return {
      category: postsListResponse.category as any,
      categoriesList: postsListResponse.categories || ([] as any),
      postsList: postsListResponse.data || ([] as any),
      page: postsListResponse.page as any,
      pagination: {
        total: postsListResponse.total,
        current_page: postsListResponse.current_page,
        last_page: postsListResponse.last_page,
      } as any,
      isLoading: false as boolean,
    }
  },
  head() {
    const seo_page_data: any = this.page?.seo
    const seo_category_data: any = this.category?.seo

    const result: any = {
      title:
        'Журнал Терновс. Недвижимость, дом, ипотека, личный опыт | Ternovs.ru',
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
  computed: {
    categorySeoBinds(): any {
      if (this.page !== null) {
        return {
          header: this.page.seo.header,
          description: this.page.seo.sub_header,
        }
      }

      if (this.category !== null && this.category?.seo !== null) {
        return {
          header: this.category.seo.header,
          description: this.category.seo.sub_header,
        }
      }

      return {}
    },
    getPageSeoContent(): string {
      return this.category?.seo?.content || []
    },
  },
  watch: {
    async '$route.query'(
      query: Dictionary<string | (string | null)[] | null | undefined>
    ) {
      this.isLoading = true
      this.onScrollToTop()

      const postsListResponse = await this.$repositories.media.getPostsList({
        query: {
          search: {
            category_slug: this.$route.params.category,
          },
          page: this.$route.query.page || 1,
          per_page: 9,
        },
      })

      this.postsList = postsListResponse.data
      this.pagination.total = postsListResponse.total
      this.pagination.current_page = postsListResponse.current_page
      this.pagination.last_page = postsListResponse.last_page

      this.isLoading = false
    },
  },
  methods: {
    journalLinkGenerator(pageNumber: number | string): Location {
      return {
        name: this.$route.name as string,
        params: {
          category: this.$route.params.category,
        },
        query: {
          ...this.$route.query,
          page: String(pageNumber),
        },
      }
    },
    onScrollToTop(offset = -100) {
      if (this.$refs.journalList) {
        this.$scrollTo(this.$refs.journalList, 500, { offset })
      }
    },
  },
})
</script>

<style lang="scss" module>
.journal {
  &__breadcrumbs {
    margin-top: 21px;
    margin-bottom: 17px;
  }

  &-list {
    &__wrapper {
      max-width: 1152px;
      display: flex;
      margin: 0 auto;
      margin-top: 36px;
      padding: 24px 12px;
      justify-content: space-between;

      @media (max-width: 1200px) {
        justify-content: center;
      }
    }

    &__aside {
      width: 260px;
      padding: 0 24px;

      @media (max-width: 1200px) {
        display: none;
      }

      &-hash-tags {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      &-hash-tag {
       @include font-p-regular-160;
        display: flex;
        text-decoration: none;
        color: $color-gray-100;
        margin-bottom: 14px;

        &::before {
          content: '#';
          color: $color-gray-24;
          margin-right: 0.25em;
        }
      }

      &-modal {
       @include font-p-regular-160;
        margin: 14px 0 40px 0;
      }

      &-list {
        & + & {
          margin: 32px 0;
        }
      }
    }
  }
}
</style>
