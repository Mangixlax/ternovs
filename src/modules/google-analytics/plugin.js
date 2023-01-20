import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default async (ctx, inject) => {
  let GoogleAnalytics = {
    // eslint-disable-next-line no-undef
    event: () => {},
    // eslint-disable-next-line no-undef
    ecommerce: () => {},
    // eslint-disable-next-line no-undef
    set: () => {},
    // eslint-disable-next-line no-undef
    page: () => {},
    // eslint-disable-next-line no-undef
    query: () => {},
    // eslint-disable-next-line no-undef
    screenview: () => {},
    // eslint-disable-next-line no-undef
    time: () => {},
    // eslint-disable-next-line no-undef
    require: () => {},
    // eslint-disable-next-line no-undef
    exception: () => {},
    // eslint-disable-next-line no-undef
    social: () => {},
  }

  if (!ctx.store.state.isBot) {
    const runtimeConfig = (ctx.$config && ctx.$config.googleAnalytics) || {}
    const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>')
    const options = { ...moduleOptions, ...runtimeConfig }

    if (typeof options.asyncID === 'function') {
      options.id = await options.asyncID(ctx)
    }

    Vue.use(VueAnalytics, { ...{ router: ctx.app.router }, ...options })

    ctx.$ga = Vue.$ga
    inject('ga', Vue.$ga)
  } else {
    ctx.$ga = GoogleAnalytics
    inject('ga', GoogleAnalytics)
  }
}
