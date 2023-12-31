<template>
  <footer :class="$style['footer']">
    <common-bread-crumbs />
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
            tag="address"
          >
            <template>
              <span :class="$style['footer__row-text']">
                Вы можете записаться на прием по телефону:
              </span>
              <a
                href="tel:+79253595999"
                :class="$style['footer__row-link--green']"
              >
                8 (925) 359-59-99
              </a>
              <a
                href="mailto:info@ternovs.dental"
                :class="$style['footer__row-link--green-small']"
              >
                info@ternovs.dental
              </a>
              <span :class="$style['footer__row-text']">
                Ежедневно с 10:00 до 21:00
              </span>
              <span :class="$style['footer__row-text']">
                Московская область, г. Клин, ул. Чайковского, д. 105, к. 2, пом. 3
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
          <ui-form-input-submit />
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
import { defineComponent } from '@nuxtjs/composition-api'
import { fastLinks } from '@/types/components/footer'

import CommonBreadCrumbs from '@/components/Common/CommonBreadCrumbs.vue'
import BaseFastLinks from '@/components/Base/BaseFastLinks/BaseFastLinks.vue'
import UiFormInputSubmit from '@/components/Ui/Form/UiFormInputSubmit.vue'

export default defineComponent({
  name: 'BaseFooter',
  components: {
    CommonBreadCrumbs,
    BaseFastLinks,
    UiFormInputSubmit,
  },
  data() {
    return {
      fastLinks: [
        {
          title: 'О клинике',
          links: [
            {
              label: 'Наша команда',
              route: {
                name: 'doktora',
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
                name: 'oborudovanie-kliniki',
              },
            },
          ],
        },
        {
          title: 'Наши услуги',
          links: [],
        },
        {
          title: 'В журнале',
          links: [],
        },
      ],
    }
  },
  computed: {
    servicesLinks() {
      return this.$store.getters['getCategoriesList'].map((item: any) => {
        return {
          label: item.short_name,
          route: {
            name: 'uslugi-category',
            params: {
              category: item.slug,
            },
          },
        }
      })
    },
    journalLinks() {
      return this.$store.getters['getJournalCategoriesList'].map(
        (item: any) => {
          return {
            label: item.title,
            route: {
              name: 'zhurnal-category',
              params: {
                category: item.slug,
              },
            },
          }
        }
      )
    },
  },
  mounted() {
    this.fastLinks[1].links = this.servicesLinks
    this.fastLinks[2].links = this.journalLinks
  },
})
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

        &-small {
          @include font-p-regular-160;
          text-decoration: none;
          margin-bottom: 12px;
          color: $color-primary-100;
        }
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
