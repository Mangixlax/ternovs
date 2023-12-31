<template>
  <section :class="$style['callback']">
    <div :class="$style['callback__grid']">
      <div :class="$style['callback__grid-container']">
        <h2>Запись на прием</h2>
        <span>
          Вы можете записаться на прием по телефону или оставить заявку,
          консультант проверит свободное время и перезвонит вам.
        </span>
        <ui-form-input
          placeholder="Ваш номер телефона *"
          :class="$style['callback__grid-input']"
          v-model="form.phone"
          v-mask="'+7 (###) ###-##-##'"
        />
        <ui-form-dropdown
          v-model="dropdownControlSelected"
          :controls="dropdownControls"
          label="Приём"
        />
        <div :class="$style['callback__grid-agreement']">
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
        <ui-form-button :loading="isLoading" @click="onSubmit">
          Записаться на прием
        </ui-form-button>
      </div>
      <div :class="$style['callback__grid-decore']">
        <img
          :src="
            $img('/layout/callback-decore.png', {
              format: 'webp',
            })
          "
          alt="Стоматологическая клиника"
          :class="$style['callback__grid-clinic']"
        />
        <img
          :src="
            $img('/layout/diamond.png', {
              format: 'webp',
            })
          "
          alt="diamond"
          :class="$style['callback__grid-diamond']"
          ref="rellax"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

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

export default defineComponent({
  name: 'LayoutCallback',
  components: {
    UiFormGroup,
    UiFormInput,
    UiFormDropdown,
    UiFormCheckbox,
    UiFormButton,
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
  data() {
    return {
      form: <Form>{
        phone: '',
        visit: '',
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
      isLoading: false,
    }
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
.callback {
  width: 100%;
  padding: 40px 0 80px 0;

  &__grid {
    @include grid-container;
    grid-row-gap: 32px;

    &-container {
      grid-column: 1 / 5;
      grid-row: 2 / 2;

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
    }

    &-input {
      margin-bottom: 20px;
    }

    &-agreement {
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

    &-decore {
      grid-column: 2 / 5;
      grid-row: 1 / 1;
      position: relative;
      height: fit-content;
      align-self: center;
    }

    &-clinic {
      width: 100%;
      height: auto;
    }

    &-diamond {
      position: absolute;
      left: 0;
      top: 70px;
      left: -96px;
      height: 128px;
      width: auto;
    }
  }

  @include media-breakpoint-up('md') {
    &__grid {
      &-container {
        grid-column: 1 / 5;
        grid-row: initial;
      }
      &-decore {
        align-content: center;
        grid-column: 6 / 9;
        grid-row: initial;
      }
    }
  }

  @include media-breakpoint-up('lg') {
    padding: 72px 0 96px 0;

    &__grid {
      &-container {
        grid-column: 2 / 6;
      }
      &-decore {
        grid-column: 7 / 10;
      }
    }
  }

  @include media-breakpoint-up('xl') {
    padding: 72px 0 144px 0;

    &__grid {
      &-container {
        grid-column: 2 / 6;
      }
      &-decore {
        grid-column: 8 / 12;
      }
    }
  }
}
</style>
