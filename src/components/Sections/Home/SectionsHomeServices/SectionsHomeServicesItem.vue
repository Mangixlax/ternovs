<template>
  <div :class="$style['services__item']">
    <div :class="$style['services__item-icon']">
      <svg-icon :name="item.icon" />
    </div>
    <div :class="$style['services__item-title']">{{ item.title }}</div>
    <div :class="$style['services__item-text']">{{ item.text }}</div>
    <nuxt-link :to="item.route" :class="$style['services__item-link']">
      <span>К услугам</span>
      <svg-icon :name="'back-arrow'" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SectionsHomeServicesItem extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: object
}
</script>

<style lang="scss" module>
.services__item {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-icon {
    padding: 19px 17px 23px 17px;
    border-radius: 0 0 100px 100px;
    background: $color-white-100;
    width: fit-content;
    height: fit-content;
    margin-bottom: 16px;
    display: flex;

    svg {
      height: 30px;
      width: 30px;
      fill: $color-primary-100;
    }
  }

  &-title {
    @include font-h6-medium;
    color: $color-gray-100;
    margin-bottom: 16px;
  }

  &-text {
    @include font-p-regular-160;
    color: $color-gray-100;
    margin-bottom: 16px;
  }

  &-link {
    @include font-p-medium-160;
    display: flex;
    align-items: center;
    text-decoration: none;

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
}
</style>
