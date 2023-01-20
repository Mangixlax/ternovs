<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-callback-afk']">
      <div :class="$style['modal-callback-afk__title']">
        Свяжитесь с нами, чтобы<br />узнать ещё больше!
      </div>
      <div :class="$style['modal-callback-afk__description']">
        Операторы и консультанты работают 24/7, чтобы помочь вам сделать
        правильный выбор.
      </div>
      <!--common-phone-number-render(-->
      <!--  is-button-->
      <!--  variant="primary-light"-->
      <!--  font-variant="size-14-medium"-->
      <!--  full-size-->
      <!--  text-variant="light"-->
      <!--  phone="8 (961) 191-11-16"-->
      <!--)-->
      <ui-form-button
        @click="onShowModalCallback"
        variant="info"
        full-size
        :class="$style['modal-callback-afk__button-modal']"
      >
        Заказать обратный звонок
      </ui-form-button>
      <div :class="$style['modal-callback-afk__chat']">
        <span v-html="'или '"></span>написать в чат
        <svg-icon name="jivo-small"></svg-icon>
      </div>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'
// import CommonPhoneNumberRender from '~/components/Common/CommonPhoneNumberRender.vue'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'

@Component({
  components: {
    ModalWrapperSimple,
    // CommonPhoneNumberRender,
    UiFormButton,
  },
})
export default class ModalContentCallbackAfk extends Vue {
  /**
   * Unique modal name
   */
  @Prop({ type: String, required: true }) name!: string

  public onShowModalCallback() {
    this.$modal.show({
      component: () =>
        import('~/components/Modal/Wrapper/ModalWrapperSimple.vue'),
      on: {
        'before-open': () => {
          // Hide this modal before opening a new modal
          this.$modal.hide(this.name)
        },
      },
      slots: {
        default: {
          component: () =>
            import(
              '~/components/Modal/Content/Callback/ModalContentCallback.vue'
            ),
        },
      },
    })
  }
}
</script>

<style lang="scss" module>
.modal-callback-afk {
  max-width: 352px;
  width: 100%;
  text-align: center;

  &__title {
    @include size-20-semi-bold;
  }

  &__description {
    @include size-14-regular;
    margin: 24px 0;
  }

  &__button-modal {
    margin-top: 16px;
  }

  &__chat {
    margin-top: 24px;
    margin-bottom: 40px;
    @include size-13-medium;
    color: $color-black-100;

    & > span {
      color: $color-black-48;
    }

    & > svg {
      width: 17px;
      height: 16px;
      margin-left: 4px;
      vertical-align: bottom;
    }
  }
}
</style>
