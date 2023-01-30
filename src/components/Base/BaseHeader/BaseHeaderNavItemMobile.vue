<template>
  <li
    :class="{
      [$style['dropdown']]: true,
      [$style['open']]: isShowList,
    }"
    @click="item.list?.length ? onToggle() : null"
  >
    <div :class="$style['dropdown__control']">
      <div
        :is="item.list?.length ? 'div' : 'nuxt-link'"
        :to="item.route"
        :class="$style['dropdown__control-label']"
      >
        {{ item.label }}
      </div>
      <svg-icon name="dropdown-menu" v-if="item.list?.length" />
    </div>
    <div
      :style="{ height: listHeight }"
      v-if="item.list?.length"
      :class="$style['dropdown__wrapper']"
    >
      <ul ref="list">
        <li v-for="(link, index) in item.list" :key="index">
          <nuxt-link :to="link.route">
            {{ link.label }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseHeaderNavItemMobile extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: Object
  @Prop({ type: Boolean, default: false }) isOpen!: boolean

  public isShowList: boolean = false
  public isOverFlow: boolean = false
  public listHeight: string = '0px'

  onToggle() {
    if (!this.isShowList) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    this.listHeight = (this as any).$refs.list.clientHeight + 'px'
    this.isShowList = true
  }

  close() {
    this.listHeight = '0px'
    this.isShowList = false
  }

  public calculateDropdownHeight() {
    this.listHeight = (this as any).$refs.list.clientHeight + 'px'
  }

  mounted() {
    if (this.isOpen) {
      this.open()
    }
    window.addEventListener('resize', this.calculateDropdownHeight)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.calculateDropdownHeight)
  }
}
</script>

<style lang="scss" module>
.dropdown {
  width: 100%;
  padding: 0 12px;

  & + & {
    padding-top: 12px;
    border-top: 2px solid $color-primary-8;
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-label {
      @include font-p-medium-160;
      padding-top: 6px;
      color: $color-gray-100;
      text-decoration: none;
    }

    svg {
      height: 16px;
      width: 16px;
      fill: $color-gray-100;
      margin-left: 4px;
      transition: transform 0.3s ease;

      .open & {
        transform: rotate(180deg);
      }
    }
  }

  > ul {
    position: absolute;
    padding-top: 8px;
    top: 100%;
    list-style: none;
    display: none;

    > li {
      a {
        @include font-p-medium-160;
        text-decoration: none;
        color: $color-gray-100;
        padding-top: 4px;
      }

      & + li {
        margin-top: 4px;
      }
    }
  }

  &__wrapper {
    overflow: hidden;
    transition: height 0.3s ease;

    > ul {
      list-style: none;
      padding-top: 8px;

      > li {
        a {
          @include font-p-medium-160;
          color: $color-gray-100;
          text-decoration: none;
        }

        & + li {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
