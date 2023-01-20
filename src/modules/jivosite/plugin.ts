import { Context, Plugin } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import {
  JivositeCallbackEventNames,
  JivositeOptions,
} from '~/modules/jivosite/types'

const JivositePlugin: Plugin = (context: Context, inject: Inject) => {
  const runtimeConfig = (context.$config && context.$config.jivosite) || {}
  const moduleOptions: JivositeOptions = JSON.parse(
    '<%= JSON.stringify(options) %>'
  )

  Object.assign(moduleOptions, runtimeConfig)

  const initialize = () => {
    if (
      !context.store.state.isBot &&
      !ready &&
      window.jivo_api === undefined &&
      moduleOptions.url !== ''
    ) {
      try {
        const jivo = document.createElement('script')
        jivo.async = true
        jivo.src = moduleOptions.url
        const head = document.querySelector('head')
        head && head.appendChild(jivo)
      } catch (err) {
        console.warn('[Jivosite] Failed to initialize JivoSite')
      }
    }
  }

  let ready: boolean = false

  context.app.router!.onReady(() => {
    initialize()
    // Mark when the router has completed the initial navigation.
    ready = true
  })

  const callbackFunction = (
    callback: Function = (...args: any) => {},
    eventName: JivositeCallbackEventNames
  ) => {
    if (typeof callback === 'function') {
      window[eventName] = function () {
        callback(...arguments)
      }
    }
  }

  /**
   * @TODO Update types
   */
  context.$jivo_api = {
    instance() {
      return window.jivo_api
    },
    jivo_onLoadCallback: (callback) => {
      callbackFunction(callback, 'jivo_onLoadCallback')
    },
    jivo_onOpen: (callback) => {
      callbackFunction(callback, 'jivo_onOpen')
    },
    jivo_onMessageSent: (callback) => {
      callbackFunction(callback, 'jivo_onMessageSent')
    },
    jivo_onAccept: (callback) => {
      callbackFunction(callback, 'jivo_onAccept')
    },
    jivo_onClose: (callback) => {
      callbackFunction(callback, 'jivo_onClose')
    },
    jivo_onIntroduction: (callback) => {
      callbackFunction(callback, 'jivo_onIntroduction')
    },
    jivo_onResizeCallback: (callback) => {
      callbackFunction(callback, 'jivo_onResizeCallback')
    },
    jivo_onCallStart: (callback) => {
      callbackFunction(callback, 'jivo_onCallStart')
    },
    jivo_onCallEnd: (callback) => {
      callbackFunction(callback, 'jivo_onCallEnd')
    },
    jivo_onChangeState: (callback) => {
      callbackFunction(callback, 'jivo_onChangeState')
    },
  }

  inject('jivo_api', context.$jivo_api)
}

export default JivositePlugin
