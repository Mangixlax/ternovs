<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-callback']">
      <div :class="$style['modal-callback__title']"> {{ text.title }} </div>
      <div :class="$style['modal-callback__description']">
        {{ text.description }}
      </div>
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'

@Component({
  components: {
    ModalWrapperSimple,
  },
})
export default class ModalFinishText extends Vue {
  @Prop({ type: String, required: true })
  name!: string
  @Prop({ type: Object, default: () => {} })
  text!: object
}
</script>

<style lang="scss" module>
.modal-callback {
  max-width: 400px;
  width: 100%;
  padding: 0 24px 26px;

  &__title {
    @include font-h2-regular
  }

  &__description {
    @include font-p-regular;
    margin: 24px 0 16px 0;
  }
}
</style>
