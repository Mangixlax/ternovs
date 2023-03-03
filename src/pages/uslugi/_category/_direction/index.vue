<template>
  <main :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h1>{{ direction.title }}</h1>
        <p>{{ direction.excerpt }}</p>
        <div>
          <ui-form-button @click="onShowCallback">
            Записаться на прием
          </ui-form-button>
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
    <!-- <sections-services-detail-description
      :descriprion="content.description"
    /> -->
    <sections-prices-content-block
      :block="direction.services"
      title="Цены на услуги"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import ArticleRender from '~/components/Article/ArticleRender.vue'
import SectionsServicesDetailDescription from '@/components/Sections/Services/Detail/SectionsServicesDetailDescription.vue'
import SectionsPricesContentBlock from '@/components/Sections/Prices/SectionsPricesContentBlock.vue'

export default defineComponent({
  name: 'ServicesDetailPageDescription',
  components: {
    UiFormButton,
    ArticleRender,
    SectionsServicesDetailDescription,
    SectionsPricesContentBlock,
  },
  async asyncData(ctx: Context) {
    const directionResponse = await ctx.$repositories.services.getDirection(
      ctx.params.direction
    )

    return {
      direction: directionResponse,
      isLoading: false as boolean,
    }
  },
  methods: {
    onShowCallback() {
      this.$modal.show({
        bind: {
          name: 'Callback',
        },
        component: () =>
          import(
            '~/components/Modal/Content/Callback/ModalContentCallback.vue'
          ),
      })
    },
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
