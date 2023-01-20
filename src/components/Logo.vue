<template>
  <nuxt-link
    :to="{ name: 'index' }"
    :class="$style['link']"
    title="Ternovs"
  >
    <svg-icon name="logo" :class="$style['logo']"></svg-icon>
    <svg-icon name="logo-text" :class="$style['text']"></svg-icon>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Logo extends Vue {}
</script>

<style lang="scss" module>
.link {
  display: flex;
  text-decoration: none;
  align-items: center;
  height: 100%;
}

.logo {
  width: 28px;
  height: 26px;
  fill: $color-blue-100;
  margin-right: 8px;

  @media (max-width: 800px) {
    margin-right: 0;
  }
}

.text {
  height: 28px;
  width: 164px;
  fill: $color-black-100;

  @media (max-width: 800px) {
    display: none;
  }
}
</style>
