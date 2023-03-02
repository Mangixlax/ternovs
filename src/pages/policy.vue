<template>
  <main></main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

export default defineComponent({
  name: 'PolicyPage',
  head() {
    return getHead({
      title: `Политика конфиденциальности и безопасности данных | Ternovs.ru`,
      description: `Мы уважаем конфиденциальность и безопасность данных наших пациентов. В этом разделе вы найдете политику конфиденциальности и информацию о том, как мы обрабатываем личные данные.`,
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
        name: 'Политика конфиденциальности',
        route: {
          name: 'policy',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module></style>
