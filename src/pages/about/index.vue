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
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SectionsHomeBenefits from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefits.vue'
import SectionsHomeServices from '@/components/Sections/Home/SectionsHomeServices/SectionsHomeServices.vue'
import SectionsAboutOurTeam from '@/components/Sections/About/SectionsAboutOurTeam/SectionsAboutOurTeam.vue'

@Component({
  components: {
    SectionsHomeBenefits,
    SectionsHomeServices,
    SectionsAboutOurTeam,
  },
})
export default class AboutPage extends Vue {}
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
