<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-callback']">
      <div :class="$style['modal-callback__title']">Контакты застройщика</div>
      <div :class="$style['modal-callback__description']">
        Операторы и консультанты работают 24/7, чтобы помочь вам сделать
        правильный выбор.
      </div>
      <a
        :class="$style['modal-callback__phone']"
        :href="phone | phoneFormat('tel:+7$2$3$4$5')"
      >
        {{ phone | phoneFormat('8 $2 $3 $4 $5') }}
      </a>
      <div :class="$style['modal-callback__developer']">
        Застройщик:
        <nuxt-link
          :to="{
            name: 'companies-type-company',
            params: { type: 'developers', company: developer.slug },
          }"
          :title="`Застройщик - ${developer.name}`"
          :class="$style['modal-callback__developer-link']"
        >
          {{ developer.name }}
        </nuxt-link>
      </div>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { phoneFormat } from '~/filters/phone-format'

import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'

@Component({
  components: {
    ModalWrapperSimple,
  },
  filters: {
    phoneFormat: phoneFormat,
  },
})
export default class ModalContentShowPhone extends Vue {
  @Prop({ type: String, required: true })
  name!: string
  @Prop({ type: String, default: '' })
  phone!: string
  @Prop({ type: Object, default: () => {} })
  developer!: object
}
</script>

<style lang="scss" module>
.modal-callback {
  max-width: 400px;
  width: 100%;
  padding: 0 24px 26px;

  &__title {
    @include size-20-semi-bold;
  }

  &__description {
    @include size-14-regular;
    margin: 24px 0 16px 0;
  }

  &__phone {
    @include font-h4-regular;
    color: $color-black-100;
    text-decoration: none;
  }

  &__developer {
    @include size-14-medium;
    margin-bottom: 8px;
    margin-top: 12px;

    &-link {
      color: $color-blue-88;
      text-decoration: none;
    }
  }
}
</style>
