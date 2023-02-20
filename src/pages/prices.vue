<template>
  <main :class="$style['equipment']">
    <div :class="$style['equipment__grid']">
      <div :class="$style['equipment__grid-container']">
        <h1>Цены на услуги</h1>
        <p>
          Успех доктора Терновых был обусловлен твердой приверженностью
          этическому и качественному уходу, мотивированному достижением их
          философии стоматологии.
        </p>
        <ui-form-button @click="onShowCallback">
          Записаться на прием
        </ui-form-button>
      </div>
    </div>
    <sections-prices-content-block
      v-for="(block, index) in pricesBlocks"
      :key="index"
      :block="block"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { PricesContentBlock } from '~/types/models/prices.js'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsPricesContentBlock from '~/components/Sections/Prices/SectionsPricesContentBlock.vue'

export default defineComponent({
  name: 'PricesPage',
  components: {
    UiFormButton,
    SectionsPricesContentBlock
  },
  data() {
    return {
      pricesBlocks: <PricesContentBlock[]> [
    {
      title: 'Лечение осложненного кариеса',
      description:
        'Осложненный кариес лечится эндодонтически: с прохождением корневых каналов, их пломбировкой и постановкой пломбы. По показаниям стоматолог проводит методы лечения, направленные на сохранение жизнеспособности нерва.',
      list: [
        {
          title: 'Лечение одного корневого канала',
          price: 'Цена от 6 000 ₽ до 7 000 ₽ за услугу',
        },
        {
          title: 'Лечение двух корневых каналов',
          price: 'Цена от 12 000 ₽ до 14 000 ₽ за услугу',
        },
        {
          title: 'Лечение трех корневых каналов',
          price: 'Цена от 17 000 ₽ до 20 000 ₽ за услугу',
        },
        {
          title: 'Механическая мед обработка корневого канала',
          price: 'Цена 4 000 ₽ за услугу',
        },
      ],
    },
    {
      title: 'Гигиена полости рта',
      description:
        'Комплекс мер, направленных на удаление зубных отложений с целью профилактики стоматологических заболеваний. От качества ее проведения зависит не только здоровье зубов, но и состояние десен, слизистой полости рта и даже органов желудочно-кишечного тракта.',
      list: [
        {
          title: 'Профессиональная гигиена полости рта',
          price: 'Цена 12 000 ₽ за услугу',
        },
        {
          title: 'Пародонтологическая глубокая гигиена',
          price: 'Цена 16 000 ₽ за услугу',
        },
        {
          title: 'Глубокое фторирование 2 челюсти',
          price: 'Цена 2 500 ₽ за услугу',
        },
        {
          title: 'Ультразвук',
          price: 'Цена 300 ₽ за услугу',
        },
        {
          title: 'Медикаментозная обработка дёсен и слизистой',
          price: 'Цена 400 ₽ за услугу',
        },
        {
          title: 'Обработка зубов кальцийсодержащим препаратом сеанс',
          price: 'Цена 1 800 ₽ за услугу',
        },
      ],
    },
    {
      title: 'Отбеливание зубов',
      description:
        'Процедура изменения оттенка зубной эмали. Отбеливание зубов относится к области косметической стоматологии и имеет ряд сторонников и противников. Сторонники отбеливания зубов считают, что современные методики позволяют достигать значительных результатов при малых рисках для здоровья.',
      list: [
        {
          title: 'Домашнее отбеливание',
          price: 'Цена 20 000 ₽ за услугу',
        },
        {
          title: 'Изготовление индивидуальных кап для домашнего отбеливания',
          price: 'Цена от 4 000 ₽ за услугу',
        },
      ],
    },
    {
      title: 'Ортодонтия',
      description:
        'включает в себя методы по устранению и профилактике дефектов положения зубов, нормализации состояния зубочелюстного аппарата. Ухаживать за неправильно расположенными единицами очень сложно.',
      list: [
        {
          title: 'Лечение съемной ортодонтической аппаратурой',
          price: 'Цена от 15 000 ₽ за услугу',
        },
        {
          title: 'Лечение несъемной ортодонтической аппаратурой брэкет системы',
          price: 'Цена от 180 000 ₽ до 300 000 ₽ за услугу',
        },
      ],
    },
  ]
    }
  },
  methods: {
    onShowCallback() {
    this.$modal.show({
      bind: {
        name: 'Callback',
      },
      component: () =>
        import('~/components/Modal/Content/Callback/ModalContentCallback.vue'),
    })
  }
  },
})
</script>

<style lang="scss" module>
.equipment {
  padding-bottom: 40px;

  &__grid {
    @include grid-container;
    padding: 80px 12px 64px 12px;

    &-container {
      grid-column: 1 / 5;
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
        margin-bottom: 24px;
        color: $color-gray-88;

        > br {
          display: block;
          content: '';
          margin-top: 10px;
        }
      }
    }
  }

  @include media-breakpoint-up('md') {
    padding-bottom: 48px;

    &__grid {
      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      padding: 96px 12px;

      &-container {
        grid-column: 2 / 8;

        > h2 {
          margin-bottom: 32px;
        }

        > p {
          margin-bottom: 32px;
          padding-right: 120px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding-bottom: 72px;

    &__grid {
      padding: 144px 12px 96px 12px;

      &-container {
        grid-column: 2 / 12;

        > p {
          padding-right: 192px;
        }
      }
    }
  }
}
</style>
