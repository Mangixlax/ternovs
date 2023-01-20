import Vue, { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

function validate(binding: DirectiveBinding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isPopup(popupItem: HTMLElement, elements: HTMLElement[]) {
  if (!popupItem || !elements)
    return false

  for (let i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true
      }
      if (elements[i].contains(popupItem)) {
        return false
      }
    } catch(e) {
      return false
    }
  }

  return false
}

function isServer(vNode: VNode) {
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer
}

Vue.directive('click-outside', {
  bind: function (el: HTMLElement, binding: DirectiveBinding, vNode: VNode) {
    if (!validate(binding)) return

    // Define Handler and cache it on the element
    function handler(e: any) {
      if (!vNode.context) return

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      let elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)

      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return

      // @ts-ignore
      el.__vueClickOutside__.callback(e)
    }

    // add Event Listeners
    // @ts-ignore
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    }
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    !isServer(vNode) && document.addEventListener(clickHandler, handler)
  },

  update: function (el: HTMLElement, binding: DirectiveBinding) {
    // @ts-ignore
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value
  },

  unbind: function (el: HTMLElement, binding: DirectiveBinding, vNode: VNode) {
    // Remove Event Listeners
    const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    // @ts-ignore
    !isServer(vNode) && el.__vueClickOutside__ && document.removeEventListener(clickHandler, el.__vueClickOutside__.handler)
    // @ts-ignore
    delete el.__vueClickOutside__
  },
})
