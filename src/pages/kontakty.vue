<template>
  <main :class="$style['about']">
    <div :class="$style['about__grid']">
      <div :class="$style['about__grid-container']">
        <h1>Контакты клиники</h1>
        <span>
          Вы можете записаться на прием по телефону
          <a href="tel:+79253595999">8 925 359-59-99</a> или
          <a href="tel:+79199705999">8 919 970-59-99</a> ежедневно,
          понедельник-суббота с 9:00 до 19:00, воскресенье с 10:00 до 17:00.
          <br />Или оставить заявку, консультант проверит свободное время и
          перезвонит вам.
          <!-- <br />Онлайн-запись доступна в мессенджерах -->
          <!-- <a href="#">Telegram</a>, <a href="#">Whatsapp</a> и
          <a href="#">Instagram*</a>. -->
        </span>
      </div>
    </div>
    <layout-callback />
    <layout-address />
    <sections-contacts-about />
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { getHead } from '~/lib/utils'

import LayoutCallback from '@/components/Layout/LayoutCallback.vue'
import LayoutAddress from '@/components/Layout/LayoutAddress.vue'
import SectionsContactsAbout from '@/components/Sections/Contacts/SectionsContactsAbout.vue'

export default defineComponent({
  name: 'ContactsPage',
  components: {
    LayoutCallback,
    LayoutAddress,
    SectionsContactsAbout,
  },
  head() {
    return getHead({
      title: `Авторская стоматология Терновых - О нашей компании | Ternovs.ru`,
      description: `Узнайте больше о нашей компании и о том, как мы помогаем нашим пациентам достичь здоровых и красивых улыбок.`,
      route: this.$route,
    })
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
        name: 'Контакты',
        route: {
          name: 'contacts',
        },
      },
    ])
  },
})
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

      > span {
        @include font-lead-regular-160;
        color: $color-gray-64;

        > a {
          text-decoration: none;
          color: $color-primary-100;
        }

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
      &-container {
        padding: 96px 0 24px;
        grid-column: 1 / 11;

        > h1 {
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
      }
    }
  }
}
</style>
