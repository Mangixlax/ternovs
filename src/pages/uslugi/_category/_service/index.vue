<template>
  <main :class="$style['services']">
    <div :class="$style['services__grid']">
      <div :class="$style['services__grid-container']">
        <h1>{{ serviceByParams.title }}</h1>
        <p>{{ serviceByParams.content.subtitle }}</p>
        <div>
          <ui-form-button @click="onShowCallback">
            Записаться на прием
          </ui-form-button>
        </div>
        <img
          :src="
            $img(
              `/sections/services/detail/${serviceByParams.content.image.src}`
            )
          "
          :alt="serviceByParams.content.image.caption"
        />
        <span :class="$style['services__grid-container']">
          {{ serviceByParams.content.image.caption }}
        </span>
      </div>
    </div>
    <sections-services-detail-description
      :descriprion="serviceByParams.content.description"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsServicesDetailDescription from '@/components/Sections/Services/Detail/SectionsServicesDetailDescription.vue'

export default defineComponent({
  name: 'ServicesDetailPageDescription',
  components: {
    UiFormButton,
    SectionsServicesDetailDescription,
  },
  computed: {
    serviceByParams() {
      return this.$store.getters['services/getServiceByParams'](
        this.$route.params
      )
    },
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
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
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
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 0;

    &__grid {
      &-container {
        grid-column: 1 / 13;
      }
    }
  }
}
</style>
