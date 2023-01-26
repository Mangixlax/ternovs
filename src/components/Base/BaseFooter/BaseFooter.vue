<template>
  <footer :class="$style['footer']">
    <div :class="$style['footer__row']">
      <base-fast-links
        :title="item.title"
        :list="item.links"
        v-for="(item, index) in fastLinks"
        :key="index"
      >
        <template v-slot:link-0>
          <base-fast-links
            title="Контакты"
            :class="$style['footer__row-fastlink']"
          >
            <template>
              <span :class="$style['footer__row-text']">
                Вы можете записаться на прием по телефону:
              </span>
              <a
                href="tel:+79153525899"
                :class="$style['footer__row-link--green']"
              >
                8(915) 352-58-99
              </a>
              <a
                href="mailto:info@ternovs.dental"
                :class="$style['footer__row-link--green']"
              >
                info@ternovs.dental
              </a>
              <span :class="$style['footer__row-text']">
                Ежедневно с 10:00 до 21:00
              </span>
              <span :class="$style['footer__row-text']">
                Московская область, г. Клин, ул. Чайковского, д. 105, к. 2,пом.3
              </span>
            </template>
          </base-fast-links>
        </template>
      </base-fast-links>
      <div :class="$style['footer__row-contacts']">
        <h3 :class="$style['footer__row-title']">Остались вопросы?</h3>
        <div :class="$style['footer__row-description']">
          Мы всегда готовы ответить на все ваши вопросы. Хотите узнать стоимость
          услуг? Или вас интересует время и качество работы? Может быть, Вам
          необходимо записаться на прием? На все вопросы ответит консультант
          нашей клиники!
        </div>
        <div :class="$style['footer__row-input']">
          <ui-form-input-submit placeholder="Номер телефона" />
        </div>
        <div :class="$style['footer__row-agreement']">
          Нажимая кнопку «<svg-icon name="form/submit" />», я подтверждаю и даю
          свое согласие на обработку моих персональных данных
        </div>
      </div>
    </div>
    <div :class="$style['footer__row--flex']">
      <nuxt-link
        :to="{
          name: 'policy',
        }"
        :class="$style['footer__row-link']"
      >
        ООО «Авторской стоматологии Терновых» 2022 © Лицензия № ЛО-44-63-213627
        от 11.11.2021 г.
      </nuxt-link>
      <nuxt-link
        :class="$style['footer__row-link']"
        :to="{
          name: 'policy',
        }"
      >
        Политика конфиденциальности
      </nuxt-link>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseFastLinks from '@/components/Base/BaseFastLinks/BaseFastLinks.vue'
import UiFormInputSubmit from '@/components/Ui/Form/UiFormInputSubmit.vue'
import { Location } from 'vue-router/types/router'

interface fastLinks {
  title: string
  links: fastLink[]
}

interface fastLink {
  label: string
  route: Location
}

@Component({
  components: {
    BaseFastLinks,
    UiFormInputSubmit,
  },
})
export default class BaseFooter extends Vue {
  public fastLinks: fastLinks[] = [
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
    },
  ]
}
</script>

<style lang="scss" module>
.footer {
  @include container;
  padding-bottom: 144px;
  padding-top: 144px;

  &__row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    grid-gap: 40px;
    border-bottom: 2px solid $color-gray-4;
    padding-bottom: 64px;

    &--flex {
      display: flex;
      justify-content: space-between;
      padding: 32px 0;
    }

    &-text {
      @include font-p-regular-160;
      color: $color-gray-72;
      margin-bottom: 12px;
    }

    &-link {
      @include font-p-regular-160;
      color: $color-gray-64;
      text-decoration: none;

      &--green {
        @include font-lead-regular-130;
        margin-bottom: 12px;
        color: $color-primary-100;
        text-decoration: none;
      }
    }

    &-fastlink {
      margin-top: 28px;
    }

    &-title {
      @include font-h6-medium;
      margin: 0;
      margin-bottom: 28px;
      color: $color-gray-100;
    }

    &-description {
      @include font-p-regular-160;
      color: $color-gray-72;
      margin-bottom: 28px;
    }

    &-input {
      max-width: 360px;
    }

    &-contacts {
      max-width: 456px;
      width: 100%;
    }

    &-agreement {
      @include font-small-regular;
      color: $color-gray-64;
      vertical-align: middle;
      margin-top: 16px;
      display: block;
      max-width: 360px;

      svg {
        height: 17px;
        width: 17px;
        fill: $color-primary-100;
        margin: -4px 2px;
      }
    }
  }

  @include media-breakpoint-down('lg') {
    padding-bottom: 96px;
    padding-top: 96px;

    &__row--flex {
      flex-direction: column;
    }

    &__row {
      padding-bottom: 32px;

      &-link {
        & + & {
          margin-top: 8px;
        }
      }
    }
  }

  @include media-breakpoint-down('md') {
    flex-direction: column;
    padding-bottom: 80px;
    padding-top: 80px;

    &__row {
      grid-template-columns: 1fr;
      padding-bottom: 48px;

      &-title {
        margin-bottom: 20px;
      }

      &-description {
        margin-bottom: 20px;
      }

      &--flex {
        padding: 24px 0;
      }
    }
  }

  @include media-breakpoint-down('sm') {
    padding-bottom: 75px;
    padding-top: 75px;
  }
}
</style>
