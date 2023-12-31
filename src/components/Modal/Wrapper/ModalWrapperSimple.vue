<template>
  <modal
    v-slot="{ params, close }"
    v-bind="{ ...$attrs, ...$props }"
    v-on="$listeners"
    :classes="$style['modal-container']"
    :content-class="{
      [$style['modal-content']]: true,
      [$style['modal-content--full-size']]: fullSize,
    }"
  >
    <div :class="$style['modal__close']" @click="close">
      <svg-icon name="multiplication-edit"></svg-icon>
    </div>
    <div :class="$style['modal__header']">
      <slot name="header"></slot>
    </div>
    <perfect-scrollbar :class="$style['modal__body']">
      <slot :params="params" :close="close"></slot>
    </perfect-scrollbar>
    <div v-if="$slots.actions" :class="$style['modal__action']">
      <slot name="actions">
        <!--ui-form-button(-->
        <!--  variant="primary"-->
        <!--  @click="close"-->
        <!--) Сохранить-->
        <!--ui-form-button(-->
        <!--  variant="default"-->
        <!--  border-->
        <!--  @click="closeAllModals"-->
        <!--) Очистить-->
      </slot>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'
import PerfectScrollbar from '~/components/Common/PerfectScrollbar.vue'

export default defineComponent({
  name: 'ModalWrapperSimple',
  components: {
    PerfectScrollbar,
    UiFormButton,
  },
  props: {
    fullSize: { type: Boolean, default: false },
    name: { type: String, default: '' },
  },
  watch: {
    $route() {
      this.$modal.hideAll()
    },
  },
  methods: {
    closeAllModals() {
      this.$modal.hideAll()
    },
  },
})
</script>

<style lang="scss" module>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background: $color-white-100;
  margin: 0 28px;
  max-height: calc(100vh - 64px);

  @media (max-width: 768px) {
    margin: 32px 28px;
    place-self: flex-end;
  }

  @media (max-width: 359px) {
    margin: 0;
    height: 100%;
    max-height: 100vh;
  }

  &--full-size {
    width: 100%;
    height: 100%;
    border-radius: 0;
    max-height: none;
    margin: 0;
  }
}

.modal__header {
  position: sticky;
  top: 0;
  height: 86px;
  padding: 32px 24px 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.modal__body {
  flex-grow: 1;
  margin-bottom: 8px;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 20px 0;
  margin: 0 24px;
  border-top: 1px solid $color-gray-4;
  position: sticky;
  bottom: 0;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
}

.modal__close {
  position: absolute;
  top: 32px;
  right: 24px;
  border: none;
  border-radius: 7px;
  width: 30px;
  height: 30px;
  padding: 0;
  z-index: 1;
  cursor: pointer;

  & span,
  & svg {
    width: 30px;
    height: 30px;
    fill: $color-primary-100;
  }
}
</style>
