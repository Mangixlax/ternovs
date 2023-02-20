<template>
  <main :class="$style['about']">
    <div :class="$style['about__grid']">
      <div :class="$style['about__grid-container']">
        <h1>Контакты клиники</h1>
        <span>
          Вы можете записаться на прием по телефону
          <a href="tel:+79611911116">8 961 191-11-16</a> или
          <a href="tel:+79038777200">8 903 877-72-00</a> ежедневно с 10:00 до
          21:00, или оставить заявку, консультант проверит свободное время и
          перезвонит вам.<br />Онлайн-запись доступна в мессенджерах
          <a href="#">Telegram</a>, <a href="#">Whatsapp</a> и
          <a href="#">Instagram*</a>.
        </span>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContactsPage',
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
