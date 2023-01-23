<template>
  <section :class="$style['footer']">
    <div :class="$style['footer__fastlinks']">
      <base-fast-links
        @update="updateAll(index)"
        :title="item.title"
        :list="item.links"
        v-for="(item, index) in fastLinks"
        :key="index"
        v-model="item.is_show"
      >
        <template v-slot:link-0>
          <base-fast-links
            title="Контакты"
            :class="$style['footer__fastlinks-nested']"
          >
            <template>
              <span :class="$style['footer__fastlinks-nested-text']">
                Вы можете записаться на прием по телефону:
              </span>
              <a
                href="tel:+79153525899"
                :class="$style['footer__fastlinks-nested-link']"
              >
                8(915) 352-58-99
              </a>
              <a
                href="mailto:info@ternovs.dental"
                :class="$style['footer__fastlinks-nested-link']"
              >
                info@ternovs.dental
              </a>
              <span :class="$style['footer__fastlinks-nested-text']">
                Ежедневно с 10:00 до 21:00
              </span>
              <span :class="$style['footer__fastlinks-nested-text']">
                Московская область, г. Клин, ул. Чайковского, д. 105, к. 2,пом.3
              </span>
            </template>
          </base-fast-links>
        </template>
      </base-fast-links>
      <div :class="$style['footer__contacts']">
        <h3 :class="$style['footer__contacts-title']">Остались вопросы?</h3>
        <div :class="$style['footer__contacts-description']">
          Мы всегда готовы ответить на все ваши вопросы. Хотите узнать стоимость
          услуг? Или вас интересует время и качество работы? Может быть, Вам
          необходимо записаться на прием? На все вопросы ответит консультант
          нашей клиники!
        </div>
        <div :class="$style['footer__contacts-input']">
          <ui-form-input />
        </div>
        <div :class="$style['footer__contacts-agreement']">
          Нажимая кнопку «
          <svg-icon
            name="form/submit"
            :class="$style['footer__contacts-submit--mini']"
          />
          », я подтверждаю и даю свое согласие на обработку моих персональных
          данных
        </div>
      </div>
    </div>
    <div :class="$style['footer__rights']">
      <nuxt-link
        :to="{
          name: 'policy',
        }"
        :class="$style['footer__rights-link']"
      >
        ООО «Авторской стоматологии Терновых» 2022 © Лицензия № ЛО-44-63-213627
        от 11.11.2021 г.
      </nuxt-link>
      <nuxt-link
        :class="$style['footer__rights-link']"
        :to="{
          name: 'policy',
        }"
      >
        Политика конфиденциальности
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseFastLinks from '@/components/Base/BaseFastLinks/BaseFastLinks.vue'
import UiFormInput from '@/components/Ui/Form/UiFormInput.vue'

@Component({
  components: {
    BaseFastLinks,
    UiFormInput,
  },
})
export default class BaseFooter extends Vue {
  public fastLinks = [
    {
      title: 'О клинике',
      links: [
        {
          label: 'Наша команда',
          route: {
            name: 'our-team',
          },
        },
        {
          label: 'Наши работы',
          route: {
            name: 'portfolio',
          },
        },

        {
          label: 'Оборудование',
          route: {
            name: 'equipment',
          },
        },
      ],
      is_show: false,
    },
    {
      title: 'Наши услуги',
      links: [
        {
          label: 'Терапия',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Гигиена',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Имплантация',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Хирургия',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Ортодонтия',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Отбеливание зубов',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Протезирование',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Обезболивание',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Цены на услуги',
          route: {
            name: 'services-therapy',
          },
        },
      ],
      is_show: false,
    },
    {
      title: 'В журнале',
      links: [
        {
          label: 'Терапия',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Гигиена',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Имплантация',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Хирургия',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Ортодонтия',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Отбеливание зубов',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Протезирование',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Обезболивание',
          route: {
            name: 'services-therapy',
          },
        },
        {
          label: 'Цены на услуги',
          route: {
            name: 'services-therapy',
          },
        },
      ],
      is_show: false,
    },
  ]

  public updateAll(index: number) {
    this.fastLinks.forEach((item) => (item.is_show = false))
    this.fastLinks[index].is_show = true
  }
}
</script>

<style lang="scss" module>
.footer {
  margin-bottom: 144px;
  margin-top: 144px;
  @include container;

  &__fastlinks {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    grid-gap: 40px;
    border-bottom: 2px solid $color-gray-4;
    padding-bottom: 64px;

    &-nested {
      margin-top: 32px;

      &-text {
        @include font-p-regular-160;
        color: $color-gray-72;
        margin-bottom: 12px;
      }

      &-link {
        @include font-lead-regular-130;
        margin-bottom: 12px;
        text-decoration: none;
        color: $color-primary-100;
      }
    }
  }

  &__contacts {
    max-width: 456px;
    width: 100%;

    &-title {
      @include font-h6-medium;
      margin: 0;
      margin-bottom: 28px;
      color: $color-gray-100;
    }

    &-description {
      @include font-p-regular-130;
      color: $color-gray-72;
      margin-bottom: 28px;
    }

    &-input {
      max-width: 360px;
    }

    &-agreement {
      @include font-small-regular;
      color: $color-gray-64;
      vertical-align: middle;
      margin-top: 16px;
      display: block;
    }

    &-submit--mini {
      height: 17px;
      width: 17px;
      fill: $color-primary-100;
      margin: -4px 0;
    }
  }

  &__rights {
    display: flex;
    justify-content: space-between;
    padding: 32px 0;

    &-link {
      @include font-p-regular-160;
      text-decoration: none;
      color: $color-gray-64;
    }
  }

  @include media-breakpoint-down('lg') {
    margin-bottom: 96px;
    margin-top: 96px;

    &__rights {
      flex-direction: column;
    }

    &__fastlinks {
      padding-bottom: 32px;
    }
  }

  @include media-breakpoint-down('md') {
    flex-direction: column;
    margin-bottom: 80px;
    margin-top: 80px;

    &__fastlinks {
      grid-template-columns: 1fr;
      padding-bottom: 48px;
    }
  }

  @include media-breakpoint-down('sm') {
    margin-bottom: 75px;
    margin-top: 75px;
  }
}
</style>
