<template>
  <section :class="$style['benefits']">
    <div :class="$style['benefits__grid']">
      <div :class="$style['benefits__grid-text']">
        <span> Стоматологическая клиника </span>
        <h2>«Авторская стоматология Терновых»</h2>
        <p>
          Клиника «Авторская стоматология Терновых – это место сочетания
          профессиональных стоматологических услуг, честной цены, опыта
          специалистов, комфорта и максимально возможного отсутствия боли при
          процедурах.
        </p>
        <p>
          Стоматология с современным оборудованием, используются новейшие методы
          и технологии для безболезненного и эффективного лечения всей полости
          рта. Весь накопленный опыт отечественных и зарубежных специалистов,
          позволяет стоматологам клиники оказывать квалифицированные услуги и
          создавать собственные зубные протезы безупречного качества.
        </p>
        <p>Наша миссия — больше здоровых и красивых улыбок!</p>
      </div>
      <div :class="$style['benefits__grid-items']">
        <sections-home-benefits-item
          v-for="(item, index) in benefits"
          :key="index"
          :item="item"
        />
      </div>
      <div :class="$style['benefits__grid-container']">
        <h3>Пациенты не боятся наших врачей!</h3>
        <p>
          Высокие стандарты работы, удобный график и индивидуальный подход к
          каждому пациенту – это особенности, которыми гордится
          стоматологическая клиника «Авторская стоматология Терновых».
        </p>
        <p>
          Опорой клиники являются её собственные профессиональные стоматологи с
          колоссальным стажем работы.
        </p>
        <ui-form-button>Записаться на прием</ui-form-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SwiperOptions } from 'swiper'
import { HomeBenefitsItem } from '@/types/models/home'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsHomeBenefitsItem from '@/components/Sections/Home/SectionsHomeBenefits/SectionsHomeBenefitsItem.vue'

export default defineComponent({
  name: 'SectionsHomeBenefits',
  components: {
    UiFormButton,
    SectionsHomeBenefitsItem,
  },
  data() {
    return {
      benefits: <HomeBenefitsItem[]>[
        {
          icon: 'welding-tool',
          title: 'Новейшее<br/>оборудование',
        },
        {
          icon: 'bill',
          title: 'Честные и только<br/>прозрачные цены',
        },
        {
          icon: 'medical-doctor',
          title: 'Индивидуальный<br/>подход к каждому',
        },
        {
          icon: 'facebook-like',
          title: 'Чистота, комфорт<br/>и безопасность',
        },
      ],
    }
  },
  computed: {
    swiperOption(): SwiperOptions {
      return {
        slidesPerView: 1.3,
        spaceBetween: 24,
        loop: false,
        autoHeight: true,
        autoplay: false,
        breakpoints: {
          // when window width is >= 250
          768: {
            slidesPerView: 3.3,
          },
        },
      }
    },
  },
})
</script>

<style lang="scss" module>
.benefits {
  width: 100%;
  padding: 40px 0;

  &__grid {
    @include grid-container;
    grid-row-gap: 64px;
    position: relative;

    &-text {
      grid-column: 1 / 5;
      grid-row: 1 / 2;
      display: flex;
      flex-direction: column;

      span {
        @include font-h5-medium;
        color: $color-gray-100;
        margin-bottom: 4px;
      }

      h2 {
        @include font-h2-medium;
        color: $color-gray-100;
        margin: 0;
        margin-bottom: 24px;
      }

      p {
        @include font-lead-regular-160;
        margin: 0;
        color: $color-gray-88;

        & + p {
          margin-top: 8px;
        }
      }
    }

    &-items {
      grid-column: 1 / 5;
      grid-row: 2 / 3;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 40px;
    }

    &-container {
      grid-column: 1 / 5;
      grid-row: 3 / 4;

      h3 {
        @include font-h3-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      p {
        @include font-lead-regular-160;
        margin: 0;
        color: $color-gray-88;

        & + p {
          margin-top: 8px;
        }
      }

      > p:last-of-type {
        margin-bottom: 24px;
      }
    }
  }

  @include media-breakpoint-up('md') {
    padding: 40px 0 120px;

    &__grid {
      grid-row-gap: 48px;

      &-text {
        grid-column: 1 / 9;
        justify-content: flex-end;
      }

      &-items {
        grid-column: 1 / 6;
        grid-column-gap: 24px;
      }

      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 48px 0 140px;

    &__grid {
      grid-row-gap: 56px;

      &-text {
        grid-column: 2 / 10;
      }

      &-items {
        grid-column: 2 / 7;
      }

      &-container {
        grid-column: 2 / 10;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 96px 0 240px;

    &__grid {
      grid-row-gap: 64px;

      &-text {
        grid-column: 2 / 12;
      }

      &-items {
        grid-column: 7 / 12;
        grid-row: 2 / 3;
      }

      &-container {
        grid-column: 2 / 6;
        grid-row: 2 / 3;
      }
    }
  }
}
</style>
