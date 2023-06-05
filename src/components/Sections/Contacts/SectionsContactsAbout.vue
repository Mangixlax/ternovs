<template>
  <div :class="$style['about']">
    <div :class="$style['about__grid']">
      <div :class="$style['about__grid-container']">
        <h2>Немного о клинике</h2>
        <p>
          Стоматология с современным оборудованием, используются новейшие методы
          и технологии для безболезненного и эффективного лечения всей полости
          рта. Весь накопленный опыт, включая опыт отечественных и зарубежных
          специалистов, позволяет стоматологам клиники оказывать
          квалифицированные услуги и создавать собственные зубные протезы
          безупречного качества. Высокие стандарты
          работы, удобный график и индивидуальный подход к каждому пациенту –
          это те особенности, которыми гордится клиника
          «Авторская стоматология Терновых».
        </p>
        <nuxt-link
          :to="{ name: 'o-kompanii' }"
          :class="$style['about__grid-link']"
        >
          <span>О клинике</span>
          <svg-icon name="back-arrow" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SectionsContactsAbout',
})
</script>

<style lang="scss" module>
.about {
  width: 100%;
  padding: 40px 0 80px;

  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;

      > h2 {
        @include font-h2-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > p {
        @include font-lead-regular-160;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }
    }

    &-link {
      @include font-p-medium-160;
      color: $color-gray-100;
      display: flex;
      text-decoration: none;

      > span {
        margin-top: 5px;
      }

      > svg {
        height: 30px;
        width: 30px;
        fill: $color-primary-100;
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
    padding: 48px 0 96px;

    &__grid {
      &-container {
        grid-column: 2 / 9;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 72px 0 96px;

    &__grid {
      &-container {
        grid-column: 2 / 11;

        > h1 {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 32px;
        }
      }
    }
  }
}
</style>
