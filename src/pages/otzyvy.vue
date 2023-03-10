<template>
  <main>
    <sections-reviews />
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      v-if="postsList.length"
    >
      <template #header>
        <h2>Истории пациентов</h2>
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
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import SectionsReviews from '@/components/Sections/Reviews/SectionsReviews.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'ReviewsPage',
  components: {
    SectionsReviews,
    JournalList,
    UiFormButton,
    LayoutCallback,
  },
  async asyncData(ctx: Context) {
    const postsListResponse = await ctx.$repositories.journal.getPostsList({
      query: {
        search: {
          category_slug: 'istorii-pacientov',
        },
        page: ctx.route.query.page || 1,
        per_page: 6,
      },
    })

    return {
      postsList: postsListResponse.data || ([] as any),
      postsListResponse: postsListResponse,
      isLoadig: false,
    }
  },
  head() {
    return getHead({
      title: `Отзывы пациентов о стоматологии Терновых | Ternovs.ru`,
      description: `Прочитайте отзывы наших пациентов, которые описывают свой опыт лечения и оставляют свои рекомендации.`,
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
        name: 'Отзывы',
        route: {
          name: 'otzyvy',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module></style>
