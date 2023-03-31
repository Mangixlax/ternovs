<template>
  <main :class="$style['portfolio']">
    <div :class="$style['portfolio__grid']">
      <div :class="$style['portfolio__grid-container']">
        <h1>Наши работы</h1>
        <span>
          Фотогалерея работ врачей клиники «Авторская стоматология Терновых». На
          нашем сайте вы можете посмотреть фото до и после работ, выполненных
          врачами нашей стоматологической клиники.
        </span>
        <base-scroll-block :class="$style['portfolio__grid-buttons--mobile']">
          <div :class="$style['portfolio__grid-buttons']">
            <div
              v-for="(item, key, index) in portfolioBlocks"
              :key="index"
              :class="$style['portfolio__grid-button']"
              @click="curentCategory = key.toString()"
            >
              {{ item.title }}
            </div>
          </div>
        </base-scroll-block>
        <div :class="$style['portfolio__grid-buttons--desktop']">
          <div :class="$style['portfolio__grid-buttons']">
            <div
              v-for="(item, key, index) in portfolioBlocks"
              :key="index"
              :class="$style['portfolio__grid-button']"
              @click="curentCategory = key.toString()"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <sections-about-content-block-portfolio
      v-for="(block, index) in portfolioBlocks[curentCategory].blocks"
      :key="index"
      :foler="curentCategory"
      :block="block"
    />
    <journal-list
      :posts-list="postsList"
      :is-loading="isLoading"
      v-if="postsList.length"
    >
      <template #header>
        <h2>Другое оборудование</h2>
        <p>
          {{ postsListResponse.category.excerpt }}
        </p>
      </template>
      <template #footer>
        <ui-form-button
          variant="gray"
          tag="nuxt-link"
          :to="{
            name: 'zhurnal-category',
            params: { category: postsListResponse.category.slug },
          }"
          :style="{ margin: '0 auto' }"
        >
          Показать больше
        </ui-form-button>
      </template>
    </journal-list>
    <layout-callback />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { PortfolioBlocks } from '~/types/models/models.js'
import { Context } from '@nuxt/types'

import { getHead } from '~/lib/utils'

import BaseScrollBlock from '@/components/Base/BaseScrollBlock/BaseScrollBlock.vue'
import SectionsAboutContentBlockPortfolio from '@/components/Sections/About/Portfolio/SectionsAboutContentBlockPortfolio.vue'
import JournalList from '@/components/Sections/Journal/JournalList.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import LayoutCallback from '@/components/Layout/LayoutCallback.vue'

export default defineComponent({
  name: 'PortfolioPage',
  components: {
    BaseScrollBlock,
    SectionsAboutContentBlockPortfolio,
    JournalList,
    UiFormButton,
    LayoutCallback,
  },
  async asyncData(ctx: Context) {
    const postsListResponse = await ctx.$repositories.journal.getPostsList({
      query: {
        search: {
          category_slug: 'nashi-raboty',
        },
        page: ctx.route.query.page || 1,
        per_page: 6,
      },
    })

    return {
      postsList: postsListResponse.data || ([] as any),
      postsListResponse: postsListResponse,
      isLoading: false,
    }
  },
  head() {
    return getHead({
      title: `Портфолио работ стоматологии Терновых | Ternovs.ru`,
      description: `В этом разделе вы найдете примеры наших работ и увидите результаты лечения наших пациентов. Ознакомьтесь с нашим портфолио и убедитесь в качестве наших услуг.`,
      route: this.$route,
    })
  },
  data() {
    return {
      curentCategory: 'otbelivanie',
      portfolioBlocks: {
        otbelivanie: {
          title: 'Отбеливание',
          blocks: [
            {
              title: 'Отбеливание',
              subtitle: [
                'На фото монжо увидеть сравение до и после процедуры отбеливания зубов.',
                'Процедура отбеливания зубов может значительно улучшить внешний вид зубов, повысить уверенность в себе и улучшить общее настроение.',
              ],
              comparison: {
                images: ['otbelivanie/pacient-1-1.jpg', 'otbelivanie/pacient-1-2.jpg'],
                caption: 'Результат отбеливания в стоматологической клинике Терновых',
              },
            },
          ],
        },
        implantaciya: {
          title: 'Имплантация',
        },
        karies: {
          title: 'Лечение кариеса',
          // blocks: [
          //   {
          //     title: 'Лечение кариеса',
          //     subtitle: [
          //       'Оригинальный аппарат от изобретателя. Гарантированная швейцарская точность и превосходный дизайн. Надёжность и ноу-хау, начиная с 1981 г. Производимый в Швейцарии, аппарат AIRFLOW® Prophylaxis Master создавался в Научно-исследовательском центре компании EMS, более 100 000 часов было затрачено на проведение технических и клинических испытаний при сотрудничестве ведущих специалистов-стоматологов со всего мира.',
          //     ],
          //     image: {
          //       src: 'difference.jpg',
          //       caption: 'Аппарат AirFlow Prophylaxis Master',
          //     },
          //     text: {
          //       subtitle: [
          //         'AIRFLOW® Prophylaxis Master - это новейший инновационный аппарат для "Guided Biofilm Therapy” от компании EMS: уникальное решение для лечения кариеса, профилактики заболеваний пародонта и поддерживающей терапии. Предусмотренный для интенсивного профессионального использования, данный аппарат характеризуется уникальной эргономикой, высокой точностью, лёгким обслуживанием и соответствует высоким гигиеническим нормам. AIRFLOW® Prophylaxis Master создан с учётом наивысших стандартов в области производительности, безопасности и комфорта, чтобы полностью отвечать требованиям трёх основных видов лечения.',
          //         'Порошок AIRFLOW PLUS приятно и эффективно устраняет биоплёнку, пигментацию и слабоминерализованные наддесневые и поддесневые зубные отложения, снижая необходимость использования ручных и ультразвуковых инструментов. Больше никаких резиновых чашечек, щёток и паст. Если требуется, дополнительно производится минимально инвазивный скейлинг с помощью аппарата PIEZON® NO PAIN и насадки PS. На комфорт проведения процедуры складываются возможность регуляции температуры воды и управление посредством беспроводной педали.',
          //       ],
          //     },
          //   },
          // ],
        },
        viniri: {
          title: 'Виниры',
          // blocks: [
          //   {
          //     title: 'Аппарат AirFlow Prophylaxis Master',
          //     subtitle: [
          //       'Оригинальный аппарат от изобретателя. Гарантированная швейцарская точность и превосходный дизайн. Надёжность и ноу-хау, начиная с 1981 г. Производимый в Швейцарии, аппарат AIRFLOW® Prophylaxis Master создавался в Научно-исследовательском центре компании EMS, более 100 000 часов было затрачено на проведение технических и клинических испытаний при сотрудничестве ведущих специалистов-стоматологов со всего мира.',
          //     ],
          //     image: {
          //       src: 'airflow-prophylaxis-master.jpg',
          //       caption: 'Аппарат AirFlow Prophylaxis Master',
          //     },
          //     text: {
          //       subtitle: [
          //         'AIRFLOW® Prophylaxis Master - это новейший инновационный аппарат для "Guided Biofilm Therapy” от компании EMS: уникальное решение для лечения кариеса, профилактики заболеваний пародонта и поддерживающей терапии. Предусмотренный для интенсивного профессионального использования, данный аппарат характеризуется уникальной эргономикой, высокой точностью, лёгким обслуживанием и соответствует высоким гигиеническим нормам. AIRFLOW® Prophylaxis Master создан с учётом наивысших стандартов в области производительности, безопасности и комфорта, чтобы полностью отвечать требованиям трёх основных видов лечения.',
          //         'Порошок AIRFLOW PLUS приятно и эффективно устраняет биоплёнку, пигментацию и слабоминерализованные наддесневые и поддесневые зубные отложения, снижая необходимость использования ручных и ультразвуковых инструментов. Больше никаких резиновых чашечек, щёток и паст. Если требуется, дополнительно производится минимально инвазивный скейлинг с помощью аппарата PIEZON® NO PAIN и насадки PS. На комфорт проведения процедуры складываются возможность регуляции температуры воды и управление посредством беспроводной педали.',
          //       ],
          //     },
          //   },
          // ],
        },
        microscope: {
          title: 'Лечение под микроскопом',
          // blocks: [
          //   {
          //     title: 'Лечение под микроскопом',
          //     subtitle: [
          //       'Оригинальный аппарат от изобретателя. Гарантированная швейцарская точность и превосходный дизайн. Надёжность и ноу-хау, начиная с 1981 г. Производимый в Швейцарии, аппарат AIRFLOW® Prophylaxis Master создавался в Научно-исследовательском центре компании EMS, более 100 000 часов было затрачено на проведение технических и клинических испытаний при сотрудничестве ведущих специалистов-стоматологов со всего мира.',
          //     ],
          //     image: {
          //       src: 'difference.jpg',
          //       caption: 'Аппарат AirFlow Prophylaxis Master',
          //     },
          //     text: {
          //       subtitle: [
          //         'AIRFLOW® Prophylaxis Master - это новейший инновационный аппарат для "Guided Biofilm Therapy” от компании EMS: уникальное решение для лечения кариеса, профилактики заболеваний пародонта и поддерживающей терапии. Предусмотренный для интенсивного профессионального использования, данный аппарат характеризуется уникальной эргономикой, высокой точностью, лёгким обслуживанием и соответствует высоким гигиеническим нормам. AIRFLOW® Prophylaxis Master создан с учётом наивысших стандартов в области производительности, безопасности и комфорта, чтобы полностью отвечать требованиям трёх основных видов лечения.',
          //         'Порошок AIRFLOW PLUS приятно и эффективно устраняет биоплёнку, пигментацию и слабоминерализованные наддесневые и поддесневые зубные отложения, снижая необходимость использования ручных и ультразвуковых инструментов. Больше никаких резиновых чашечек, щёток и паст. Если требуется, дополнительно производится минимально инвазивный скейлинг с помощью аппарата PIEZON® NO PAIN и насадки PS. На комфорт проведения процедуры складываются возможность регуляции температуры воды и управление посредством беспроводной педали.',
          //       ],
          //     },
          //   },
          // ],
        },
        koronki: {
          title: 'Коронки из диоксида циркония',
          // blocks: [
          //   {
          //     title: 'Коронки из диоксида циркония',
          //     subtitle: [
          //       'Оригинальный аппарат от изобретателя. Гарантированная швейцарская точность и превосходный дизайн. Надёжность и ноу-хау, начиная с 1981 г. Производимый в Швейцарии, аппарат AIRFLOW® Prophylaxis Master создавался в Научно-исследовательском центре компании EMS, более 100 000 часов было затрачено на проведение технических и клинических испытаний при сотрудничестве ведущих специалистов-стоматологов со всего мира.',
          //     ],
          //     image: {
          //       src: 'airflow-prophylaxis-master.jpg',
          //       caption: 'Аппарат AirFlow Prophylaxis Master',
          //     },
          //     text: {
          //       subtitle: [
          //         'AIRFLOW® Prophylaxis Master - это новейший инновационный аппарат для "Guided Biofilm Therapy” от компании EMS: уникальное решение для лечения кариеса, профилактики заболеваний пародонта и поддерживающей терапии. Предусмотренный для интенсивного профессионального использования, данный аппарат характеризуется уникальной эргономикой, высокой точностью, лёгким обслуживанием и соответствует высоким гигиеническим нормам. AIRFLOW® Prophylaxis Master создан с учётом наивысших стандартов в области производительности, безопасности и комфорта, чтобы полностью отвечать требованиям трёх основных видов лечения.',
          //         'Порошок AIRFLOW PLUS приятно и эффективно устраняет биоплёнку, пигментацию и слабоминерализованные наддесневые и поддесневые зубные отложения, снижая необходимость использования ручных и ультразвуковых инструментов. Больше никаких резиновых чашечек, щёток и паст. Если требуется, дополнительно производится минимально инвазивный скейлинг с помощью аппарата PIEZON® NO PAIN и насадки PS. На комфорт проведения процедуры складываются возможность регуляции температуры воды и управление посредством беспроводной педали.',
          //       ],
          //     },
          //   },
          // ],
        },
        gigiena: {
          title: 'Гигиена полости рта',
          // blocks: [
          //   {
          //     title: 'Гигиена полости рта',
          //     subtitle: [
          //       'Оригинальный аппарат от изобретателя. Гарантированная швейцарская точность и превосходный дизайн. Надёжность и ноу-хау, начиная с 1981 г. Производимый в Швейцарии, аппарат AIRFLOW® Prophylaxis Master создавался в Научно-исследовательском центре компании EMS, более 100 000 часов было затрачено на проведение технических и клинических испытаний при сотрудничестве ведущих специалистов-стоматологов со всего мира.',
          //     ],
          //     image: {
          //       src: 'airflow-prophylaxis-master.jpg',
          //       caption: 'Аппарат AirFlow Prophylaxis Master',
          //     },
          //     text: {
          //       subtitle: [
          //         'AIRFLOW® Prophylaxis Master - это новейший инновационный аппарат для "Guided Biofilm Therapy” от компании EMS: уникальное решение для лечения кариеса, профилактики заболеваний пародонта и поддерживающей терапии. Предусмотренный для интенсивного профессионального использования, данный аппарат характеризуется уникальной эргономикой, высокой точностью, лёгким обслуживанием и соответствует высоким гигиеническим нормам. AIRFLOW® Prophylaxis Master создан с учётом наивысших стандартов в области производительности, безопасности и комфорта, чтобы полностью отвечать требованиям трёх основных видов лечения.',
          //         'Порошок AIRFLOW PLUS приятно и эффективно устраняет биоплёнку, пигментацию и слабоминерализованные наддесневые и поддесневые зубные отложения, снижая необходимость использования ручных и ультразвуковых инструментов. Больше никаких резиновых чашечек, щёток и паст. Если требуется, дополнительно производится минимально инвазивный скейлинг с помощью аппарата PIEZON® NO PAIN и насадки PS. На комфорт проведения процедуры складываются возможность регуляции температуры воды и управление посредством беспроводной педали.',
          //       ],
          //     },
          //   },
          // ],
        },
      },
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
        name: 'Портфолио',
        route: {
          name: 'portfolio',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.portfolio {
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

    &-buttons {
      display: flex;
      grid-gap: 8px;
      padding-left: 12px;

      &--desktop {
        display: none;
      }
    }

    &-button {
      @include font-p-medium-160;
      text-decoration: none;
      padding: 10px 20px 8px 20px;
      background: $color-gray-4;
      color: $color-gray-100;
      border-radius: 30px;
      white-space: nowrap;
      cursor: pointer;
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

      &-buttons {
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

      &-buttons {
        flex-wrap: wrap;

        &--desktop {
          display: flex;
        }

        &--mobile {
          display: none;
        }
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
