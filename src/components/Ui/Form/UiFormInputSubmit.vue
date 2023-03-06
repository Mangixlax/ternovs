<template>
  <div :class="$style['input']">
    <input
      v-model="form.phone"
      v-mask="'+7 (###) ###-##-##'"
      :class="$style['input__instance']"
      placeholder="Номер телефона"
    />
    <span :class="$style['input__submit']">
      <loader v-if="isLoading" />
      <svg-icon v-else name="form/submit" @click="onSubmit()" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Form } from '@/types/models/Form'

import Loader from '@/components/Common/Loader.vue'

import { mask } from 'vue-the-mask'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default defineComponent({
  name: 'UiFormInputSubmit',
  components: {
    Loader,
  },
  mixins: [validationMixin],
  directives: { mask },
  validations: {
    form: {
      phone: {
        required,
        minLength: minLength(18),
      },
    },
  },
  props: {
    value: { type: String, default: '' },
    tag: { type: String, default: 'input' },
  },
  data() {
    return {
      form: <Form>{
        phone: '',
        agree_collect_data: true,
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
.input {
  width: 100%;
  display: flex;
  border-radius: 90px;
  transition: background-color 0.25s ease;
  outline: 2px solid $color-gray-6;
  align-items: center;

  &__instance {
    padding: 11px 0 7px 20px;
    @include font-p-regular-160;
    color: $color-gray-72;
    width: 100%;
    border: none;
  }

  &:focus-within {
    background-color: $color-white-100;
    outline: 2px solid $color-primary-100;
  }

  &__submit {
    height: 34px;
    max-width: 34px;
    width: 100%;
    margin-right: 5px;
    cursor: pointer;
    position: relative;
    background: $color-primary-100;
    border-radius: 50%;
    display: flex;

    svg {
      height: 34px;
      width: 34px;
      fill: $color-primary-100;
    }
  }
}
</style>
