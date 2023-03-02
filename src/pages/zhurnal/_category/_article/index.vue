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
    const article: any = await ctx.$repositories.journal.getPost(
      ctx.params.article
    )

    if (!article) {
      ctx.error({ statusCode: 404 })
    }

    if (ctx.params.category != article?.category?.slug) {
      return ctx.redirect(301, {
        name: 'zhurnal-category-article',
        params: { category: article.category.slug, article: article.slug },
      })
    }

    return {
      article,
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
        name: 'Журнал',
        route: {
          name: 'zhurnal',
        },
      },
      {
        name: this.article.category.title,
        route: {
          name: 'zhurnal-category',
          params: {
            category: this.article.category.slug,
          },
        },
      },
      {
        name: this.article.title,
        route: {
          name: 'zhurnal-category-article',
          params: {
            category: this.article.category.slug,
            article: this.article.slug,
          },
        },
      },
    ])
  },
  mounted() {
    if (this.article?.slug) {
      this.$repositories.journal.incrementPostViews(this.article.slug)
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
