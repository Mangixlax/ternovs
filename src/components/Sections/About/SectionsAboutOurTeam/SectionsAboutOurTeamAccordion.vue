<template>
  <section :class="$style['accordion']">
    <div :class="$style['accordion__grid']">
      <div :class="$style['accordion__grid-container']">
        <h2>Образование и повышение квалификации</h2>
        <span>
          {{ accordion.text }}
        </span>
        <base-accordions
          :list="accordion.list"
          :class="$style['accordion-container']"
        >
        </base-accordions>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { EmployeeAccordion } from '@/types/models/employee'
import BaseAccordions from '@/components/Base/BaseAccordion/BaseAccordions.vue'
import BaseAccordionTabs from '@/components/Base/BaseAccordion/BaseAccordionTabs.vue'

@Component({
  components: { BaseAccordions, BaseAccordionTabs },
})
export default class SectionsAboutOurTeamAccordion extends Vue {
  @Prop({ type: Object, default: () => {} }) accordion!: EmployeeAccordion
}
</script>

<style lang="scss" module>
.accordion {
  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 6;
      padding: 40px 0;

      > h2 {
        @include font-h2-medium;
        margin: 0;
        margin-bottom: 48px;
      }

      > span {
        @include font-lead-regular-160;
        color: $color-gray-88;
        margin-bottom: 48px;
        display: block;
      }
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        padding: 48px 0;
        grid-column: 1 / 9;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    &__grid {
      &-container {
        padding: 72px 0;
        grid-column: 2 / 10;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 2 / 12;
      }
    }
  }
}
</style>
