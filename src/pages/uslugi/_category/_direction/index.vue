<template>
  <main :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h1>{{ direction.title }}</h1>
        <p>{{ direction.excerpt }}</p>
        <div>
          <ui-form-button> Записаться на прием </ui-form-button>
        </div>
      </div>
      <div :class="$style['services__grid-article']">
        <article-render
          v-for="(block, index) in direction.content"
          :key="index"
          :index="index"
          :block="block"
        />
      </div>
    </div>
    <sections-prices-content-block
      :block="direction.services"
      title="Цены на услуги"
    />
    <journal-list
      :posts-list="direction.journal_posts"
      :is-loading="isLoading"
      ref="journalList"
    >
      <template #header>
        <h2>Другие наши услуги</h2>
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
        <ui-form-button
          variant="gray"
          tag="nuxt-link"
          :to="{
            name: 'zhurnal-category',
            params: { category: direction.slug },
          }"
          :style="{ margin: '0 auto' }"
        >
          Показать больше
        </ui-form-button>
      </template>
    </journal-list>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import BaseImageCompare from '@/components/Base/BaseImageCompare.vue'
import SectionsPricesContentBlock from '@/components/Sections/Prices/SectionsPricesContentBlock.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'

export default defineComponent({
  name: 'ServicesDetailPageDescription',
  components: {
    UiFormButton,
    ArticleRender,
    BaseImageCompare,
    SectionsPricesContentBlock,
    JournalList,
  },
  async asyncData(ctx: Context) {
    const directionResponse = await ctx.$repositories.services.getDirection(
      ctx.params.direction
    )

    return {
      direction: directionResponse.data,
      isLoading: false as boolean,
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
        name: 'Услуги',
        route: {
          name: 'uslugi',
        },
      },
      {
        name: this.direction.category.name,
        route: {
          name: 'uslugi-category',
          params: {
            category: this.direction.category.slug,
          },
        },
      },
      {
        name: this.direction.name,
        route: {
          name: 'uslugi-category-direction',
          params: {
            category: this.direction.category.slug,
            direction: this.direction.slug,
          },
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.services {
  width: 100%;
  padding: 80px 0 0;

  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        color: $color-gray-100;
        margin-bottom: 24px;
      }

      > p {
        @include font-lead-regular-160;
        display: block;
        color: $color-gray-100;
        margin-bottom: 24px;
      }

      > img {
        width: 100%;
        height: auto;
        margin-top: 50px;
        margin-bottom: 24px;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-64;
        margin-bottom: 24px;
      }
    }

    &-article {
      grid-column: 1 / 5;
      grid-row: 2 / 2;
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }

      &-article {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 0 0;

    &__grid {
      &-container {
        grid-column: 1 / 11;

        > h1 {
          padding: 0 192px 0 96px;
        }

        > p {
          padding: 0 192px 0 96px;
        }

        > div {
          padding: 0 192px 0 96px;
        }

        > span {
          padding: 0 192px 0 96px;
        }
      }
    }

    &-article {
      grid-column: 1 / 11;
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 0;

    &__grid {
      &-container {
        grid-column: 1 / 13;
      }

      &-article {
        grid-column: 1 / 13;
      }
    }
  }
}
</style>
