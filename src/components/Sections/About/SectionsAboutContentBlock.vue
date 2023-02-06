<template>
  <div :class="$style['our_team']">
    <div :class="$style['our_team__grid']">
      <div :class="$style['our_team__grid-container']">
        <div :class="$style['our_team__grid-container--text']">
          <h2>{{ block.title }}</h2>
          <p v-for="(paragraph, index) in block.subtitle" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <img
          :src="$img(`/sections/about/photos/${block.image?.src}`)"
          :alt="block.image?.embed"
        />
        <span> {{ block.image?.embed }} </span>
        <div :class="$style['our_team__grid-container']">
          <div
            :class="$style['our_team__grid-container--text']"
            v-if="block.text"
          >
            <h2>{{ block.text?.title }}</h2>
            <p v-for="(paragraph, index) in block.text?.subtitle" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AboutContentBlock } from '~/types/models'

@Component
export default class SectionsAboutOurTeam extends Vue {
  @Prop({ type: Object, default: () => {} }) block!: AboutContentBlock
}
</script>

<style lang="scss" module>
.our_team {
  &__grid {
    @include grid-container;

    &-container {
      grid-column: 1 / 5;
      display: flex;
      flex-direction: column;

      &--text {
        padding: 40px 0;

        > h2 {
          @include font-h2-medium;
          margin: 0;
          margin-bottom: 24px;
          color: $color-gray-100;
        }

        > p {
          @include font-lead-regular-160;
          margin: 0;
          color: $color-gray-88;

          & + p {
            margin-top: 8px;
          }
        }
      }

      > img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      > span {
        @include font-lead-regular-160;
        padding: 24px 0;
        color: $color-gray-64;
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
        grid-column: 1 / 11;

        &--text {
          padding: 48px 96px;
        }

        > span {
          @include font-lead-regular-160;
          padding: 24px 96px;
          color: $color-gray-64;
        }
      }
    }
  }

  @include media-breakpoint-up('xl') {
    &__grid {
      &-container {
        grid-column: 1 / 13;

        &--text {
          padding: 72 px 96px;

          > h1 {
            margin-bottom: 32px;
          }
        }
      }
    }
  }
}
</style>
