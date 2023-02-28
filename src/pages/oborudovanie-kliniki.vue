<template>
  <main :class="$style['equipment']">
    <div :class="$style['equipment__grid']">
      <div :class="$style['equipment__grid-container']">
        <h1>Оборудование клиники</h1>
        <p>
          Всё оборудование, которое используется в стоматологии, можно условно
          разделить на несколько видов.
        </p>
        <ui-form-button>
          Записаться на прием
        </ui-form-button>
      </div>
    </div>
    <sections-about-content-block
      v-for="(block, index) in equipmentBlocks"
      :key="index"
      :block="block"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AboutContentBlock } from '~/types/models/models.js'

import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'
import SectionsAboutContentBlock from '@/components/Sections/About/SectionsAboutContentBlock.vue'

export default defineComponent({
  name: 'EquipmentPage',
  components: {
    UiFormButton,
    SectionsAboutContentBlock,
  },
  data() {
    return {
      equipmentBlocks: <AboutContentBlock[]>[
        {
          title: 'Аппарат AirFlow Prophylaxis Master',
          subtitle: [
            'Оригинальный аппарат от изобретателя. Гарантированная швейцарская точность и превосходный дизайн. Надёжность и ноу-хау, начиная с 1981 г. Производимый в Швейцарии, аппарат AIRFLOW® Prophylaxis Master создавался в Научно-исследовательском центре компании EMS, более 100 000 часов было затрачено на проведение технических и клинических испытаний при сотрудничестве ведущих специалистов-стоматологов со всего мира.',
          ],
          image: {
            src: 'airflow-prophylaxis-master.jpg',
            caption: 'Аппарат AirFlow Prophylaxis Master',
          },
          text: {
            subtitle: [
              'AIRFLOW® Prophylaxis Master - это новейший инновационный аппарат для "Guided Biofilm Therapy” от компании EMS: уникальное решение для лечения кариеса, профилактики заболеваний пародонта и поддерживающей терапии. Предусмотренный для интенсивного профессионального использования, данный аппарат характеризуется уникальной эргономикой, высокой точностью, лёгким обслуживанием и соответствует высоким гигиеническим нормам. AIRFLOW® Prophylaxis Master создан с учётом наивысших стандартов в области производительности, безопасности и комфорта, чтобы полностью отвечать требованиям трёх основных видов лечения.',
              'Порошок AIRFLOW PLUS приятно и эффективно устраняет биоплёнку, пигментацию и слабоминерализованные наддесневые и поддесневые зубные отложения, снижая необходимость использования ручных и ультразвуковых инструментов. Больше никаких резиновых чашечек, щёток и паст. Если требуется, дополнительно производится минимально инвазивный скейлинг с помощью аппарата PIEZON® NO PAIN и насадки PS. На комфорт проведения процедуры складываются возможность регуляции температуры воды и управление посредством беспроводной педали.',
            ],
          },
        },
        {
          title: 'Автономный эндомотор X-smart, X-smart plus, Marita',
          subtitle: [
            'Простой и удобный в использовании мотор (эндодонтический наконечник), созданный для врачей-стоматологов.',
            'Мотор отличает компактность и эргономичность. Легкая рукоятка наконечника с миниатюрной головкой, отсутствие напольной педали и возможность работы от аккумулятора позволяют чувствовать себя более комфортно при выполнении операции и полностью сконцентрировать свое внимание на пациенте.',
            'Мотор обладает реципрокным движением, помимо ротационного, а также контролем торка и режимом авто-реверса.',
          ],
          image: {
            src: 'x-smart.jpg',
            caption: 'Автономный эндомотор X-smart, X-smart plus, Marita',
          },
        },
        {
          title: 'Установка VARIO SURG',
          subtitle: [
            'Пьезохирургическая установка с оптикой. Удобный комплект для хирургии. Новая ультразвуковая хирургическая система VarioSurg 3 VSRG (230 V) с увеличенной мощностью на 50% относительно старой версиис оптикой LED, в комплекте с наконечником и 6-ю насадками и ножной педалью ифизиодиспенсер Surgic Pro Opt - аппарат для хирургической стоматологии и имплантологии. Комплектуется педалью управления, титановым наконечником Ti-Max X-SG20L (понижение 20:1) с оптикой и микромотором SGL70M c LED подсветкой.',
          ],
          image: {
            src: 'vario-surg.jpg',
            caption: 'Установка VARIO SURG',
          },
          text: {
            title: 'Преимущества ультразвуковой системы',
            subtitle: [
              'Ультразвуковая хирургическая система незаменима при проведении операций по имплантологии. VarioSurg 3 – это последняя разработка в модельной линейке VarioSurg. Она оснащена легким и эргономичным наконечником, как и в предыдущей версии, с тем же превосходным балансом и захватом, но на 50% более мощным. Функции обратной связи и автонастройки вместе с широким модельным рядом насадок обеспечивают быстрое и более точное проведение операции.',
              'VarioSurg 3 представляет первую в мире функцию динамического соединения с микромоторной системой Surgic Pro, что позволяет вам управлять обоими приборами с помощью одной педали. Интуитивное управление и более четкий ЖК-дисплей помогают с легкостью управлять прибором и проводить деликатные манипуляции без стресса.',
            ],
          },
        },
      ],
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
        name: 'Оборудование клиники',
        route: {
          name: 'oborudovanie-kliniki',
        },
      },
    ])
  },
})
</script>

<style lang="scss" module>
.equipment {
  &__grid {
    @include grid-container;
    padding: 80px 12px 40px 12px;

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
    &__grid {
      &-container {
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      padding: 96px 12px 24px 12px;

      &-container {
        grid-column: 1 / 11;
        padding: 0 192px 0 96px;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      padding: 144px 12px 24px 12px;

      &-container {
        grid-column: 1 / 13;

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
