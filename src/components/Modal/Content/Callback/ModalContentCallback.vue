<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-callback']">
      <div :class="$style['modal-callback__title']">
        Мы знаем всё про новострой Москвы и области!
      </div>
      <div :class="$style['modal-callback__description']">
        Оставьте свой номер телефона, и наш специалист свяжется с вами в
        ближайшее время.
      </div>
      <ui-form-group tag="label" for="callback-phone">
        <ui-form-label tag="div">Номер телефона *</ui-form-label>
        <ui-form-input
          v-model="callbackPhone"
          id="callback-phone"
          placeholder="+7"
          v-mask="'+7 (###) ###-##-##'"
        ></ui-form-input>
      </ui-form-group>
      <ui-form-group tag="label" for="callback-time">
        <ui-form-label tag="div">
          Удобное время звонка (по Москве)
        </ui-form-label>
        <ui-form-dropdown-radio-list-rows
          ref="callbackDateTime"
          v-model="callbackDateTimeValues"
          :controls="callbackDateTimeControls"
          label="Выберите день и время"
          :container-classes="$style['modal-callback__datetime-container']"
          :button-classes="$style['modal-callback__datetime-button']"
        />
      </ui-form-group>
      <ui-form-button
        variant="primary"
        font-variant="size-14-medium"
        full-size
        :disabled="!isValidForm"
        :class="$style['modal-callback__submit']"
        @click="onSubmit"
        :loading="isLoading"
      >
        Ожидаю звонка
      </ui-form-button>
      <div :class="$style['modal-callback__agreement']">
        <base-checkbox
          id="callback__agree"
          :checked="isAgree"
          @click="isAgree = !isAgree"
          :checkbox-classes="$style['modal-callback__agreement-checkbox']"
        >
          <template v-slot:label>
            <div :class="$style['modal-callback__agreement-label']">
              По нажатию на кнопку
              <ui-badge
                small="small"
                tag="span"
                :class="$style['modal-callback__agreement-label-badge']"
              >
                Ожидаю звонка
              </ui-badge>
              даю свое согласие на обработку персональных данных и принимаю
              условия соглашения
            </div>
          </template>
        </base-checkbox>
      </div>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import UiFormLabel from '~/components/Ui/Form/UiFormLabel.vue'
import UiFormInput from '~/components/Ui/Form/UiFormInput.vue'
import UiFormGroup from '~/components/Ui/Form/UiFormGroup.vue'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'
import BaseCheckbox from '~/components/Base/BaseCheckbox/BaseCheckbox.vue'
import UiBadge from '~/components/Ui/Badge/UiBadge.vue'
import UiFormDropdownRadioListRows, {
  DropdownRadioListRowItems,
  DropdownRadioListValue,
} from '~/components/Ui/Form/UiFormDropdownRadioListRows.vue'
import { mask } from 'vue-the-mask'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'

@Component({
  components: {
    ModalWrapperSimple,
    UiFormDropdownRadioListRows,
    UiFormGroup,
    UiFormInput,
    UiFormLabel,
    UiFormButton,
    BaseCheckbox,
    UiBadge,
  },
  directives: { mask },
  inheritAttrs: false,
})
export default class ModalContentCallback extends Vue {
  @Prop({ type: String, required: true })
  name!: string

  public isAgree: boolean = false
  public isLoading: boolean = false

  public callbackPhone: string = ''
  public callbackDateTimeValues: DropdownRadioListValue = {}

  public callbackDateTimeControls: DropdownRadioListRowItems = {
    day: [
      {
        label: 'Сегодня',
        value: 'Сегодня',
      },
      {
        label: 'Завтра',
        value: 'Завтра',
      },
      {
        label: 'Послезавтра',
        value: 'Послезавтра',
      },
    ],
    time: [
      {
        label: '10<sup>:00</sup> – 13<sup>:00</sup>',
        value: '10:00 – 13:00',
      },
      {
        label: '13<sup>:00</sup> – 16<sup>:00</sup>',
        value: '13:00 – 16:00',
      },
      {
        label: '16<sup>:00</sup> – 19<sup>:00</sup>',
        value: '16:00 – 19:00',
      },
    ],
  }

  get isValidForm() {
    return (
      this.callbackPhone.length === 18 &&
      Object.keys(this.callbackDateTimeValues).every(
        (key: string) => this.callbackDateTimeValues[key] !== ''
      ) &&
      this.isAgree
    )
  }

  public async onSubmit() {
    if (this.isLoading || !this.isValidForm) return

    this.isLoading = true

    this.$axios
      .$post('/api/v1/feedback/common', {
        phone: this.callbackPhone,
        page: window.location.href,
        ...this.callbackDateTimeValues,
      })
      .then(() => {
        this.showSuccessModal()
        this.isLoading = false
      })
      .catch(() => {
        this.isLoading = false
      })
  }

  public showSuccessModal() {
    this.$modal.show({
      bind: {
        name: 'CallbackSuccess',
        dateTime: this.callbackDateTimeValues,
        phone: this.callbackPhone,
      },
      on: {
        'before-open': () => {
          // Hide this modal before opening a new modal
          this.$modal.hide(this.name)
        },
      },
      component: () =>
        import(
          '~/components/Modal/Content/Callback/ModalContentCallbackSuccess.vue'
        ),
    })
  }
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
    margin: 24px 0;
  }

  &__submit {
    margin-top: 20px;
  }

  &__agreement {
    display: flex;
    margin-top: 24px;

    &-checkbox {
      margin-top: 2px;
    }

    &-label {
      @include size-11-medium;
      color: $color-black-56;
      white-space: normal;
      line-height: 24px;

      &-badge {
        margin: 0 6px;
      }
    }
  }

  &__datetime-container,
  &__datetime-button {
    border-radius: 9px;
  }
}
</style>
