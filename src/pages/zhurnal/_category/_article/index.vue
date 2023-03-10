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
        <journal-author :author="article.author" />
      </div>
    </article>
    <journal-list
      :posts-list="article.similar_posts"
      v-if="article.similar_posts.length"
    >
      <template #header>
        <h2>Похожие статьи</h2>
      </template>
    </journal-list>
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import JournalStatistic from '~/components/Sections/Journal/JournalStatistic.vue'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import ArticleNavigation from '~/components/Article/ArticleNavigation.vue'
import JournalAuthor from '~/components/Sections/Journal/JournalAuthor.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'ArticlePage',
  components: {
    JournalStatistic,
    ArticleRender,
    ArticleNavigation,
    JournalAuthor,
    JournalList,
    LayoutCallback,
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
  head() {
    return getHead({
      title: this.article?.title,
      description: `${this.article?.title} - на эту тему представдлена статья в блоге`,
      route: this.$route,
      seo: this.article.seo || this.article.page,
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
})
</script>

<style lang="scss" module>
.article {
  width: 100%;
  padding: 80px 0;

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
