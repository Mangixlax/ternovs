<template>
  <main :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h1>Услуги стоматологии</h1>
        <span>
          Работа ведётся по четырём основным направлениям: ортопедия, хирургия,
          терапия и ортодонтия. Новейшее оборудование и методики позволяют
          добиться блестящего результата работы как в прямом, так и переносном
          смысле. Тысяч довольных пациентов уже получили свою возможность снова
          улыбаться. Возможно, следующим счастливым человеком сможете стать
          именно Вы.
        </span>
        <base-scroll-block>
          <div :class="$style['services__grid-links']">
            <nuxt-link
              v-for="(item, index) in categoriesList"
              :key="index"
              :to="{
                name: 'uslugi-category',
                params: { category: item.slug },
              }"
            >
              {{ item.short_name }}
            </nuxt-link>
          </div>
        </base-scroll-block>
      </div>
    </div>
    <div :class="$style['services__list']">
      <sections-services
        v-for="(item, index) in categoriesList"
        :key="index"
        :item="item"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import SectionsServices from '@/components/Sections/Services/SectionsServices.vue'
import BaseScrollBlock from '@/components/Base/BaseScrollBlock/BaseScrollBlock.vue'

export default defineComponent({
  name: 'ServicesPage',
  components: {
    SectionsServices,
    BaseScrollBlock,
  },
  async asyncData(ctx: Context) {
    const categoriesListResponse =
      await ctx.$repositories.services.getCategoriesList()

    return {
      categoriesList: categoriesListResponse.data || ([] as any),
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
    padding: 0;

    &-container {
      grid-column: 1 / 5;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        color: $color-gray-100;
        margin-bottom: 24px;
        padding: 0 12px;
      }

      > span {
        @include font-lead-regular-160;
        display: block;
        color: $color-gray-100;
        padding: 0 12px;
        margin-bottom: 24px;
      }
    }

    &-links {
      display: flex;
      grid-gap: 8px;
      padding-left: 12px;

      > a {
        @include font-p-medium-160;
        text-decoration: none;
        padding: 10px 20px 8px 20px;
        background: $color-gray-4;
        color: $color-gray-100;
        border-radius: 30px;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      padding: 0 12px;

      &-container {
        grid-column: 1 / 9;

        > h1 {
          padding: 0;
        }

        > span {
          padding: 0;
        }
      }

      &-links {
        padding-left: 0;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 96px 0 0;

    &__grid {
      &-container {
        grid-column: 2 / 9;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 0;

    &__grid {
      &-container {
        grid-column: 2 / 11;
      }
    }
  }
}
</style>
