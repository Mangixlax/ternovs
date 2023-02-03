<template>
  <div :class="$style['our_team__item']">
    <img
      :src="$img(`/sections/our_team/employees/${item.avatar}.png`)"
      alt="Автор отзыва"
      :class="$style['our_team__item-avata']"
    />
    <h3>{{ item.name }}</h3>
    <nuxt-link :to="item.route" :class="$style['our_team__item-link']">
      <span>К услугам</span>
      <svg-icon :name="'back-arrow'" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SectionsReviewsItem extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: object
}
</script>

<style lang="scss" module>
.our_team__item {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-avatar {

  }
}
</style>
