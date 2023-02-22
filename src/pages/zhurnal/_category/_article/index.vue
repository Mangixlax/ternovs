<template>
  <main :class="$style['article']">
    <article :class="$style['article__grid']">
      <div :class="$style['article__grid-container']">
        <div :class="$style['article__grid-header']">
          <journal-statistic
            :published-at="article.published_at"
            :views-count="article.views_count"
            :category="article.category.title"
          />
          <h1 :class="$style['article-item__header-title']">
            {{ article.title }}
          </h1>
        </div>
        <article-render
          v-for="(block, index) in article.content"
          :key="index"
          :index="index"
          :block="block"
        />
      </div>
    </article>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { Location } from 'vue-router/types/router'
import { IBlock } from '~/types/models/journal'
import metaGenerator from '~/lib/meta'
import { getSiteUrl } from '~/lib/utils'

import JournalStatistic from '~/components/Sections/Journal/JournalStatistic.vue'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import ArticleNavigation from '~/components/Article/ArticleNavigation.vue'

export default defineComponent({
  name: 'ArticlePage',
  components: {
    JournalStatistic,
    ArticleRender,
    ArticleNavigation,
  },
  async asyncData(ctx: Context) {
    const article = await ctx.$repositories.media.getPost(
      ctx.params.article.split('-').pop() as string
    )

    /**
     * Return 404 error if:
     * 1. Article is not found
     * 2. Category slug in article is not equal with category in route params
     */
    if (!article || article?.category?.slug !== ctx.route.params.category) {
      ctx.error({ statusCode: 404 })
    }

    return {
      article,
    }
  },
  computed: {
    // TODO: TBD
    getHeadings() {
      return ((this as any).article?.content || [])
        .map((block: IBlock, index: number): IBlock & { index: number } => {
          return { ...block, index }
        })
        .filter((block: IBlock) => block.type === 'header')
        .map((block: any) => {
          return { text: block.data.text, index: block.index }
        })
    },
  },
  created() {
    this.$store.commit('setBreadcrumbs', [
      {
        name: 'Журнал',
        route: {
          name: 'journal-category',
        },
      },
      {
        name: (this as any).article?.category?.title,
        route: {
          name: 'journal-category',
          params: { category: (this as any).article?.category?.slug },
        },
      },
      {
        name: (this as any).article.title,
        route: {
          name: 'journal-category-article',
          params: {
            category: (this as any).article?.category?.slug,
            article: (this as any).article.slug,
          },
        },
      },
    ])
  },
  mounted() {
    console.log(this.article);
    
    if (this.article?.id) {
      this.$repositories.media.incrementPostViews(this.article.id)
    }
  },
  head() {
    return {
      title: this.article?.title,
      meta: metaGenerator(this.article?.seo),
      link: [
        {
          rel: 'canonical',
          href: getSiteUrl(
            this.article?.seo?.canonical || this.$route.path,
            true
          ),
        },
      ],
    }
  },
})
</script>

<style lang="scss" module>
.article {
  width: 100%;
  padding: 80px 40px;

  &__grid {
    @include grid-container;

    &-header {
      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin: 8px 0 24px;
        color: $color-gray-100;
      }
    }

    &-container {
      grid-column: 1 / 5;
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
    padding: 96px 48px;

    &__grid {
      &-header {
        padding: 0 96px;
      }

      &-container {
        grid-column: 1 / 11;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 72px;

    &__grid {
      &-header {
        > h1 {
          margin: 8px 0 32px;
        }
      }
      &-container {
        grid-column: 1 / 13;
      }
    }
  }
}
</style>
