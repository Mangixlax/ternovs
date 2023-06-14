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

import article from '@/static/pages/pacientam/pamyatka-pacientu.json'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import JournalAuthor from '~/components/Sections/Journal/JournalAuthor.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'PamyatkaPacientu',
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
      title: 'Памятка пациенту | Авторская стоматология Терновых',
      description: 'В этой памятке мы собрали полезную информацию и рекомендации для наших пациентов. Узнайте о правилах гигиены полости рта, подготовке к посещению стоматолога, послеоперационном уходе и других важных моментах. Мы стремимся обеспечить вам комфортное и безопасное стоматологическое обслуживание, и эта памятка поможет вам быть в курсе всех необходимых деталей.',
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
        name: 'Памятка пациенту',
        route: {
          name: 'pamyatka-pacientu',
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
    