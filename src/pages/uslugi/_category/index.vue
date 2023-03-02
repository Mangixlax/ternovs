<template>
  <main :class="$style['services']">
    <sections-services :item="category" />/
    <journal-list
      :posts-list="category.journal_posts"
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
            params: { category: category.slug },
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

import SectionsServices from '@/components/Sections/Services/SectionsServices.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'

export default defineComponent({
  name: 'ServicesDetailPage',
  components: {
    SectionsServices,
    JournalList,
    UiFormButton,
  },
  async asyncData(ctx: Context) {
    const categoryResponse = await ctx.$repositories.services.getCategory(
      ctx.params.category
    )

    return {
      category: categoryResponse,
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
        name: this.category.name,
        route: {
          name: 'uslugi-category',
          params: {
            category: this.category.slug,
          },
        },
      },
    ])
  },
  mounted() {
    console.log(this.category)
  },
})
</script>

<style lang="scss" module>
.services {
  width: 100%;
  padding: 80px 0 0;
}
</style>
