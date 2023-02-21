<template>
  <main :class="$style['article']">
    <article :class="$style['article-item']">
      <header :class="$style['article-item__header']">
        <h1 :class="$style['article-item__header-title']">
          {{ article.title }}
        </h1>
      </header>
      <div :class="$style['article-item__container']">
        <div :class="$style['article-item__container-main']">
          <journal-statistic
            :published-at="article.published_at"
            :views-count="article.views_count"
          />
          <nav :class="$style['article-item__container-nav']">
            <p :class="$style['article-item__container-nav-text']">
              Содержание статьи
            </p>
            <article-navigation :list="getHeadings" />
          </nav>
          <div ref="blocks" :class="$style['article-item__container-content']">
            <article-render
              v-for="(block, index) in article.content"
              :key="index"
              :index="index"
              :block="block"
            />
          </div>
        </div>
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

import CommonBreadCrumbs from '~/components/Common/CommonBreadCrumbs.vue'
import JournalStatistic from '~/components/Sections/Journal/JournalStatistic.vue'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import ArticleNavigation from '~/components/Article/ArticleNavigation.vue'

export default defineComponent({
  name: 'ArticlePage',
  components: {
    CommonBreadCrumbs,
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

  &__breadcrumbs {
    margin-top: 21px;
    margin-bottom: 17px;
  }

  &-item {
    display: flex;
    position: relative;
    flex-direction: column;
    @include container;

    &__header {
      display: flex;
      flex-direction: column;
      margin: 16px 0 20px 0;

      &-breadcrumbs {
        margin-bottom: 17px;
      }

      &-title {
        @include font-p-regular-160;
        max-width: 982px;
        margin: 0;
      }
    }

    &__container {
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;

      @include media-breakpoint-up('xl') {
        grid-template-columns: 1fr 312px;
        column-gap: 24px;
      }

      &-main {
        max-width: 840px;
      }

      &-nav {
        margin-bottom: 18px;

        &-text {
          @include font-p-regular-160;
          margin-bottom: 10px;
        }
      }

      &-aside {
        width: 100%;
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

      &-content {
        width: 100%;

        a {
          cursor: pointer;
          color: $color-primary-80;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
