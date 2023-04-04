<template>
  <main :class="$style['equipment']">
    <div :class="$style['equipment__grid']">
      <div :class="$style['equipment__grid-container']">
        <h1>Цены на услуги</h1>
        <p>
          Успех доктора Терновых был обусловлен твердой приверженностью
          этическому и качественному уходу, мотивированному достижением их
          философии стоматологии.
        </p>
        <ui-form-button> Записаться на прием </ui-form-button>
      </div>
    </div>
    <sections-prices-content-block
      v-for="(block, index) in directionList"
      :key="index"
      :block="block.services"
      :title="block.name"
      :description="block.short_excerpt"
    />
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      v-if="postsList.length"
    >
      <template #header>
        <h2>Другие наши услуги</h2>
        <p>
          {{ postsListResponse.category.excerpt }}
        </p>
      </template>
      <template #footer>
        <ui-form-button
          variant="gray"
          tag="nuxt-link"
          :to="{
            name: 'zhurnal-category',
            params: { category: postsListResponse.category.slug },
          }"
          :style="{ margin: '0 auto' }"
        >
          Показать больше
        </ui-form-button>
      </template>
    </journal-list>
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { PricesContentBlock } from '~/types/models/prices.js'
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsPricesContentBlock from '~/components/Sections/Prices/SectionsPricesContentBlock.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'PricesPage',
  components: {
    UiFormButton,
    SectionsPricesContentBlock,
    JournalList,
    LayoutCallback,
  },
  async asyncData(ctx: Context) {
    let [directionListResponse, postsListResponse] = await Promise.all([
      ctx.$repositories.services.getDirectionsList(),
      ctx.$repositories.journal.getPostsList({
        query: {
          search: {
            category_slug: 'uslugi',
          },
        },
        page: ctx.route.query.page || 1,
        per_page: 6,
      }),
    ])
    return {
      directionList: directionListResponse.data as PricesContentBlock[],
      postsList: postsListResponse.data || ([] as any),
      postsListResponse: postsListResponse,
      isLoading: false as boolean,
    }
  },
  head() {
    return getHead({
      title: `Цены на услуги в стоматологии Терновс. Стоматология, лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `Наши цены в стоматологии Терновс вас приятно удивят`,
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
        name: 'Цены на услуги',
        route: {
          name: 'ceny-na-uslugi',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.equipment {
  padding-bottom: 40px;

  &__grid {
    @include grid-container;
    padding: 80px 12px 64px 12px;

    &-container {
      grid-column: 1 / 5;
      display: flex;
      flex-direction: column;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-88;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }
    }
  }

  @include media-breakpoint-up('md') {
    padding-bottom: 48px;

    &__grid {
      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      padding: 96px 12px;

      &-container {
        grid-column: 2 / 8;

        > h2 {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 32px;
          padding-right: 120px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding-bottom: 72px;

    &__grid {
      padding: 144px 12px 96px 12px;

      &-container {
        grid-column: 2 / 12;

        > p {
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
