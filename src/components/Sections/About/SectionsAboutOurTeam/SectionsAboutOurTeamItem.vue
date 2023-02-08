<template>
  <div :class="$style['our_team__item']">
    <img
      :src="$img(`/sections/about/employees/${item.folder}/avatar.png`)"
      :alt="`Сотрудник компании - ${item.name}`"
    />
    <h3>{{ item.name }}</h3>
    <span>{{ item.position }}</span>
    <div :class="$style['our_team__item-link']">
      <span>Немного о враче</span>
      <svg-icon :name="'back-arrow'" />
    </div>
    <nuxt-link
      :to="{
        name: 'about-our-team-employee',
        params: {
          employee: item.folder + '-' + (Number($vnode.key) + 1),
        },
      }"
    >
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Employee } from '@/types/models/employee'

@Component
export default class SectionsReviewsItem extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: Employee
}
</script>

<style lang="scss" module>
.our_team__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  pointer-events: all;
  position: relative;

  > img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-bottom: 24px;
  }

  > h3 {
    @include font-h6-medium;
    margin: 0;
    margin-bottom: 16px;
    color: $color-gray-100;
  }

  > span {
    @include font-p-regular-160;
    margin-bottom: 16px;
    color: $color-gray-100;
  }

  &-link {
    @include font-p-medium-160;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $color-gray-100;

    span {
      margin-top: 5px;
      color: $color-gray-100;
    }

    svg {
      height: 30px;
      width: 30px;
      fill: $color-primary-100;
    }
  }

  & > a {
    position: absolute;
    inset: 0;
  }

  @include media-breakpoint-up('lg') {
    padding: 24px;

    &:hover {
      background-color: $color-gray-4;
    }

    > img {
      height: 120px;
      width: 120px;
      margin-bottom: 26px;
    }
  }

  @include media-breakpoint-up('xl') {
    > img {
      height: 160px;
      width: 160px;
      margin-bottom: 32px;
    }
  }
}
</style>
