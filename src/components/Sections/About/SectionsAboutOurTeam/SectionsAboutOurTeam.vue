<template>
  <div :class="$style['our_team']">
    <div :class="$style['our_team__grid']">
      <div :class="$style['our_team__grid-container']">
        <h2>Наша команда</h2>
        <span>
          Однако опорой клиники являются её собственные профессиональные
          стоматологи с колоссальным стажем работы.
          <br />
          Здесь Вам помогут снова
          обрести крепкие зубы и ослепительную улыбку, а также почувствовать
          радость и облегчение от получения других сопутствующих оздоровительных
          и реставрационных услуг.
          <br />
          Миссия нашей команды — больше здоровых
          красивых улыбок!
        </span>
        <div :class="$style['our_team__grid-items']">
          <sections-our_team-item
            v-for="(item, index) in our_team"
            :key="index"
            :item="item"
          />
        </div>
        <ui-form-button variant="gray">Показать больше</ui-form-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SectionsReviewsItem from '@/components/Sections/Reviews/SectionsReviewsItem.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'

interface review {
  avatar: string
  name: string
  date: string
  platform: {
    logo: string
    label: string
    stars: string
    link: string
  }
  title: string
  text: string
}

@Component({
  components: {
    SectionsReviewsItem,
    UiFormButton,
  },
})
export default class SectionsAboutOurTeam extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: object

  public our_team: review[] = [
    {
      id: 1,
      avatar: 'employee-1',
      name: 'Новиков Тимур Вадимович',
      position: 'Хирург-имплантолог',
    },
    {
      avatar: 'employee-2',
      name: 'Марина Юдина',
      date: '',
      platform: {
        logo: 'google',
        label: 'Google',
        stars: '5',
        link: '',
      },
      title: 'Врачи с большой буквы, профессионалы своего дела.',
      text: 'Замечательная стоматология! Врачи с большой буквы, профессионалы своего дела, всегда с большой заботой и вниманием к каждому пациенту. Рекомендую всем своим друзьям и коллегам, не задумываясь.',
    },
    {
      avatar: 'employee-3',
      name: 'Cергей Дорофеев',
      date: '18 сентября 2021',
      platform: {
        logo: 'zoon',
        label: 'Zoon',
        stars: '4',
        link: '',
      },
      title:
        'Отличная клиника реально высокого уровня с современным оборудованием.',
      text: 'Хочу выразить огромную благодарность всему персоналу клиники Этна-Дент за высокопрофессиональное и качественное обслуживание. Отличная клиника реально высокого уровня с современным оборудованием, материалами и передовыми технологиями в лечении и протезировании.',
    },
    {
      avatar: 'employee-4',
      name: 'Елена',
      date: '13 сентября 2022',
      platform: {
        logo: 'google',
        label: 'Google',
        stars: '5',
        link: '',
      },
      title: 'Профессиональное и дущевное отношение',
      text: 'Волей случая, точнее, дочь уговорила заняться зубами, попал в стоматологическую клинику Этна Дент, ул. Б Каменщики д.6, все было выполнено на высшем уровне, сделал два импланта, мостик из трех зубов, 4 коронки, появилась голивудская улыбка, чего не наблюдалось с 1905 года, огромное спасибо Юрию Кудинову, Мартиросу Кочканяну, Бичахчану Роберту, всему обслуживающему персоналу, отношение очень профессиональное и душевное, ещё раз спасибо всем.',
    },
    {
      avatar: 'employee-5',
      name: 'Сергей Михалицкий',
      date: '10 сентября 2022',
      platform: {
        logo: 'prodoctorov',
        label: 'ProDoctorov',
        stars: '5',
        link: '',
      },
      title: 'Врач объясняет понятным языком',
      text: 'Стоматологей довольен! Лечу зубы только здесь, столько клиник прошел... Нравится отношение к пациентам, качество выполненных работ, делают всё на совесть, столько уже зубов мне переделали за другими докторами и тем самым спасли зубы от удаления!!!',
    },
  ]
}
</script>

<style lang="scss" module>
.our_team {
  width: 100%;
  padding: 80px 0 40px;

  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;

      > h1 {
        @include font-h1-medium;
        margin: 0;
        margin-bottom: 24px;
        color: $color-gray-100;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-88;
      }

      > button {
        margin: 0 auto;
      }
    }

    &-items {
      margin-top: 56px;
      margin-bottom: 16px;
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
    padding: 96px 0 48px;

    &__grid {
      &-container {
        padding: 0 72px;

        grid-column: 1 / 11;

        > h1 {
          margin-bottom: 32px;
        }

        &-items {
          margin-bottom: 32px;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 144px 0 72px;

    &__grid {
      &-container {
        padding: initial;
        grid-column: 2 / 12;

        > span {
          max-width: 744px;
          display: block;
        }
      }

      &-items {
        margin-top: 96px;
      }
    }
  }
}
</style>
