<template>
  <main :class="$style['article']">
    <article :class="$style['article__grid']">
      <div :class="$style['article__grid-container']">
        <div :class="$style['article__grid-header']">
          <h1 :class="$style['article-item__header-title']">
            {{ article.title }}
          </h1>
        </div>
        <article-render v-for="(block, index) in article.content" :key="index" :index="index" :block="block" />
      </div>
    </article>

    <layout-callback />
  </main>
</template>
  
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import article from '@/static/pages/pacientam/bezopasnost-i-garantii.json'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import JournalAuthor from '~/components/Sections/Journal/JournalAuthor.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'BezopasnostIGarantii',
  components: {
    ArticleRender,
    JournalAuthor,
    JournalList,
    LayoutCallback,
  },
  async asyncData() {
    return { article }
  },
  head() {
    return getHead({
      title: 'Безопасность и гарантии | Авторская стоматология Терновых',
      description: 'Узнайте о нашем приоритете - безопасности пациентов, и о наших гарантиях качества стоматологических услуг. Мы делаем все возможное, чтобы обеспечить безопасность и комфорт наших пациентов, предоставляя высококлассные стоматологические процедуры и долгосрочные гарантии',
      route: this.$route,
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
        name: 'Пациентам',
        route: {
          name: 'pacientam',
        },
      },
      {
        name: 'Безопасность и гарантии',
        route: {
          name: 'pacientam-bezopasnost-i-garantii',
        },
      },
    ])
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
      >h1 {
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
        >h1 {
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
  