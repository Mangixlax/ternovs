<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-callback-success']">
      <div :class="$style['modal-callback-success__title']">
        Заявка на обратный звонок отправлена!
      </div>
      <div :class="$style['modal-callback-success__description']">
        Наш менеджер свяжится с Вами в ближайшее время.
      </div>
      <ui-form-button
        variant="info"
        font-variant="size-14-medium"
        full-size
        @click="onClose"
      >
        Хорошо
      </ui-form-button>
      <common-timer-text
        seconds="20"
        :on-finished="onClose"
        :class="$style['modal-callback-success__timer']"
      >
        <template v-slot="{ now }">
          <span v-if="now">
            Данное окно закроется через
            <b>{{ now }}</b>
            сек.
          </span>
        </template>
      </common-timer-text>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'
import CommonTimerText from '~/components/Common/CommonTimerText.vue'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'

export default defineComponent({
  name: 'ModalContentCallbackSuccess',
  components: {
    ModalWrapperSimple,
    CommonTimerText,
    UiFormButton,
  },
  props: {
    name: { type: String, required: true },
    dateTime: { type: Object, default: () => ({}) },
  },
  methods: {
    onClose() {
      this.$modal.hide(this.name)
    },
  },
})
</script>

<style lang="scss" module>
.modal-callback-success {
  max-width: 400px;
  width: 100%;
  padding: 0 24px;

  &__title {
    @include font-h6-regular;
  }

  &__description {
    @include font-p-regular-160;
    margin: 24px 0;
  }

  &__button-modal {
    margin-top: 16px;
  }

  &__timer {
    text-align: center;
    margin: 24px 0 32px;
    @include font-lead-regular-130;
    color: $color-gray-56;

    b {
      font-weight: normal;
      margin: 0 4px;
      color: $color-gray-80;
    }
  }
}
</style>
