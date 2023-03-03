<template>
  <main :class="$style['about']">
    <div :class="$style['about__grid']">
      <div :class="$style['about__grid-container']">
        <h1>Стоматологи, которых не боятся</h1>
        <p>
          Клиника «Авторская стоматология Терновых» – это место сочетания
          профессиональных стоматологических услуг, честной цены, опыта
          специалистов, комфорта и максимально возможного отсутствия боли при
          процедурах.
        </p>
        <img :src="$img('/sections/about/our-team.jpg')" alt="Наша команда" />
        <span>Команда клиники «Авторская стоматология Терновых»</span>
      </div>
    </div>
    <sections-home-benefits />
    <sections-home-services />
    <sections-about-our-team />
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import SectionsHomeBenefits from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefits.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'
import SectionsAboutOurTeam from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeam.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'AboutPage',
  components: {
    SectionsHomeBenefits,
    SectionsHomeServices,
    SectionsAboutOurTeam,
    LayoutCallback,
  },
  head() {
    return getHead({
      title: `О нашей авторской стоматологии Терновс. Лечениие, зубы, личный опыт | Ternovs.ru`,
      description: `Свяжитесь с нами, нельзя откладывать лечение зубов, ведь они как нервные клетки - не восстанавливаются`,
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
        name: 'О компании',
        route: {
          name: 'o-kompanii',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.about {
  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;
      padding: 80px 0 24px;
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
        margin-bottom: 40px;
        color: $color-gray-88;
      }

      > img {
        width: 100%;
        height: auto;
        object-fit: cover;
        margin-bottom: 24px;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-64;
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
    &__grid {
      &-container {
        padding: 96px 0 24px;
        grid-column: 1 / 11;

        > h1 {
          padding: 0 192px 0 96px;
        }

        > p {
          margin-bottom: 48px;
          padding: 0 192px 0 96px;
        }

        > span {
          padding: 0 192px 0 96px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        padding: 144px 0 24px;
        grid-column: 1 / 13;

        > h1 {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 72px;
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
