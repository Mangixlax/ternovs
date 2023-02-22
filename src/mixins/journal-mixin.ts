
import { Context } from '@nuxt/types'
import { Location, Dictionary } from 'vue-router/types/router'
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  async asyncData(ctx: Context) {
    const postsListResponse = await ctx.$repositories.media.getPostsList({
      query: {
        search: {
          category_slug: ctx.route.params.category,
        },
        page: ctx.route.query.page || 1,
        per_page: 12,
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
          per_page: 12,
        },
      })

      this.postsList = postsListResponse.data
      this.pagination.total = postsListResponse.total
      this.pagination.current_page = postsListResponse.current_page
      this.pagination.last_page = postsListResponse.last_page

      this.isLoading = false
    },
  },
  computed: {
    getPageSeoContent(): string {
      return this.category?.seo?.content || []
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
  },
});