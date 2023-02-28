<template>
  <main></main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PolicyPage',
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
