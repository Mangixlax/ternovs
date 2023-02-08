<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-callback']">
      <h2>Запись на прием</h2>
      <span>
        Вы можете записаться на прием по телефону или оставить заявку,
        консультант проверит свободное время и перезвонит вам.
      </span>
      <ui-form-input
        placeholder="Ваш номер телефона *"
        :class="$style['modal-callback__input']"
        v-model="form.phone"
        v-mask="'+7 (###) ###-##-##'"
      />
      <ui-form-dropdown
        v-model="dropdownControlSelected"
        :controls="dropdownControls"
        label="Приём"
      />
      <div :class="$style['modal-callback__agreement']">
        <ui-form-group tag="label" :variant="'horizontal'">
          <ui-form-checkbox
            type="checkbox"
            v-model="$v.form.agree_collect_data.$model"
            :checked="$v.form.agree_collect_data.$model"
            :valid="!$v.form.agree_collect_data.$error"
          />
          <span>
            Я подтверждаю и даю свое согласие на обработку моих персональных
            данных
          </span>
        </ui-form-group>
      </div>
      <ui-form-button @click="onSubmit" :loading="isLoading"> Записаться на прием </ui-form-button>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { mask } from 'vue-the-mask'
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'
import ModalWrapperSimple from '@/components/Modal/Wrapper/ModalWrapperSimple.vue'
import UiFormGroup from '@/components/Ui/Form/UiFormGroup.vue'
import UiFormInput from '@/components/Ui/Form/UiFormInput.vue'
import UiFormDropdown from '@/components/Ui/Form/UiFormDropdown.vue'
import UiFormCheckbox from '@/components/Ui/Form/UiFormCheckbox.vue'
import UiFormButton from '@/components/Ui/Form/UiFormButton.vue'

interface DropdownItem {
  label: string
  value: string
}

interface Form {
  phone: string
  visit: string
  agree_collect_data: boolean | string
}

@Component({
  components: {
    UiFormGroup,
    UiFormInput,
    UiFormDropdown,
    UiFormCheckbox,
    UiFormButton,
    ModalWrapperSimple,
  },
  mixins: [validationMixin],
  directives: { mask },
  validations: {
    form: {
      phone: {
        required,
        minLength: minLength(18),
      },
      visit: {},
      agree_collect_data: {
        isChecked: (value: boolean) => value,
      },
    },
  },
  inheritAttrs: false,
})
export default class ModalContentCallback extends Vue {
  @Prop({ type: String, required: true })
  name!: string

  public isLoading: boolean = false
  
  public form: Form = {
    phone: '',
    visit: '',
    agree_collect_data: true,
  }

  public dropdownControls: DropdownItem[] = [
    {
      label: 'Первичный',
      value: '1',
    },
    {
      label: 'Вторичный',
      value: '2',
    },
  ]

  public dropdownControlSelected: DropdownItem | null = this.dropdownControls[0]

  get isValidForm() {
    return this.$v.$invalid && !this.isAgree
  }

  public async onSubmit() {
    
    if (this.isLoading || !this.isValidForm) return

    this.isLoading = true

    this.$axios
      .$post('')
      .then(() => {
        this.showSuccessModal()
        this.isLoading = false
      })
      .catch(() => {
        this.showSuccessModal()
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
  display: flex;
  flex-direction: column;

  > h2 {
    @include font-h2-medium;
    margin: 0;
    margin-bottom: 32px;
  }

  > span {
    @include font-lead-regular-160;
    display: block;
    margin-bottom: 54px;
    color: $color-gray-88;
  }

  &__input {
    margin-bottom: 20px;
  }

  &__agreement {
    display: flex;
    margin-top: 20px;
    margin-bottom: 32px;

    span {
      @include font-p-medium-130;
      padding: 8px;
      color: $color-gray-64;
      cursor: pointer;
    }
  }
}
</style>
