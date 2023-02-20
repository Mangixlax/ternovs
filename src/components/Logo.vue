<template>
  <div
    itemscope
    itemtype="http://schema.org/Organization"
    :class="$style['logo']"
  >
    <nuxt-link
      :to="{ name: 'index' }"
      title="Ternovs"
      itemprop="logo"
      :class="$style['logo__link']"
    >
      <svg-icon name="logo/emblem" :class="$style['logo__link-emblem']" />
      <svg-icon name="logo/name" :class="$style['logo__link-naming']" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Logo',
})
</script>

<style lang="scss" module>
.logo {
  padding-top: 4px;

  &__link {
    display: flex;
    align-items: center;

    &-emblem {
      width: 62px;
      height: 42px;
      margin-right: 8px;
    }

    &-naming {
      width: 148px;
      height: 39px;
    }
  }
}
</style>
