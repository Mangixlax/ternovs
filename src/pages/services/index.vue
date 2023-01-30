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
            <nuxt-link :to="{ name: 'services-ortopediya' }"
              >Ортопедия</nuxt-link
            >
            <nuxt-link :to="{ name: 'services-hirurgiya' }">Хирургия</nuxt-link>
            <nuxt-link :to="{ name: 'services-terapiya' }">Терапия</nuxt-link>
            <nuxt-link :to="{ name: 'services-ortodontiya' }">
              Ортодонтия
            </nuxt-link>
          </div>
        </base-scroll-block>
      </div>
    </div>
    <div :class="$style['services__list']">
      <sections-services
        v-for="(item, index) in services"
        :key="index"
        :item="item"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Location } from 'vue-router/types/router'
import SectionsServices from '@/components/Sections/Services/SectionsServices.vue'
import BaseScrollBlock from '@/components/Base/BaseScrollBlock/BaseScrollBlock.vue'

interface service {
  title: string
  description: string
  list: serviceList[]
}

interface serviceList {
  image: string
  title: string
  description: string
  route: Location
}

@Component({
  components: {
    SectionsServices,
    BaseScrollBlock,
  },
})
export default class ServicesPage extends Vue {
  public services: service[] = [
    {
      title: 'Услуги по терапии',
      description:
        'Кратко изложить суть направления, а также упомянуть вложенные услуги. Ограничения на кол-во символов нет, но не стоит писать больше 200 символов. Т.к. на телефоне будет много хлама в виде текста.',
      list: [
        {
          image: 'image-1',
          title: 'Лечение кариеса',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
        {
          image: 'image-2',
          title: 'Под микроскопом',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
        {
          image: 'image-3',
          title: 'Реставрация зубов',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
      ],
    },
    {
      title: 'По гигиене',
      description:
        'Кратко изложить суть направления, а также упомянуть вложенные услуги. Ограничения на кол-во символов нет, но не стоит писать больше 200 символов. Т.к. на телефоне будет много хлама в виде текста.',
      list: [
        {
          image: 'image-4',
          title: 'Лечение десен',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
        {
          image: 'image-5',
          title: 'Отбеливание зубов',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
        {
          image: 'image-6',
          title: 'Гигиена полости рта',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
      ],
    },
    {
      title: 'По гигиене',
      description:
        'Кратко изложить суть направления, а также упомянуть вложенные услуги. Ограничения на кол-во символов нет, но не стоит писать больше 200 символов. Т.к. на телефоне будет много хлама в виде текста.',
      list: [
        {
          image: 'image-4',
          title: 'Лечение десен',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
        {
          image: 'image-5',
          title: 'Отбеливание зубов',
          description:
            'Краткое описание категории услуги, можно на пару строк.',
          route: {
            name: 'services',
          },
        },
      ],
    },
  ]
}
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
