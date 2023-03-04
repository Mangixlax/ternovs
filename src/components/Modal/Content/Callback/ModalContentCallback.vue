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
      <ui-form-button @click="onSubmit" :loading="isLoading">
        Записаться на прием
      </ui-form-button>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Form } from '@/types/models/Form'

import { mask } from 'vue-the-mask'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

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

export default defineComponent({
  name: 'ModalContentCallback',
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
      agree_collect_data: {
        isChecked: (value: boolean) => value,
      },
    },
  },
  props: {
    name: { type: String, required: true },
  },
  inheritAttrs: false,
  data() {
    return {
      isLoading: <boolean>false,
      form: <Form>{
        phone: '',
        agree_collect_data: true,
      },
      dropdownControls: <DropdownItem[]>[
        {
          label: 'Первичный',
          value: '1',
        },
        {
          label: 'Вторичный',
          value: '2',
        },
      ],
      dropdownControlSelected: <DropdownItem>{
        label: 'Первичный',
        value: '1',
      },
    }
  },
  computed: {
    isFormInvalid(): boolean {
      return this.$v.$invalid && !this.form.agree_collect_data
    },
  },
  methods: {
    onSubmit() {
      if (this.isLoading || this.isFormInvalid) return

      this.isLoading = true

      this.$axios
        .$post('/api/v1/forms/simple-form', {
          page: window.location.href,
          ...this.form,
          visit: this.dropdownControlSelected.value,
        })
        .then(() => {
          this.showFinishModal({
            title: 'Заявка на обратный звонок отправлена!',
            description: 'Наш менеджер свяжится с Вами в ближайшее время.',
          })
          this.isLoading = false
        })
        .catch(() => {
          this.showFinishModal({
            title: 'Произошла ошибка',
            description: 'Что-то пошло не так, попробуйте пожалуйста позже.',
          })
          this.isLoading = false
        })
    },
    showFinishModal(text: { title: string; description: string }) {
      this.$modal.show({
        bind: {
          name: 'CallbackSuccess',
          title: text.title,
          description: text.description,
        },
        on: {
          'before-open': () => {
            // Hide this modal before opening a new modal
            this.$modal.hide(this.name)
          },
        },
        component: () =>
          import(
            '~/components/Modal/Content/Callback/ModalContentCallbackFinish.vue'
          ),
      })
    },
  },
})
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
