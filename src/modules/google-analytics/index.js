import { resolve } from 'path'

export default function (moduleOptions) {
  const options = {
    dev: this.options.dev,
    debug: {
      sendHitTask: this.options.dev ? undefined : true,
    },
    ...(moduleOptions || {}),
    ...(this.options.googleAnalytics || {}),
  }

  if (options.debug.sendHitTask === undefined) {
    options.debug.sendHitTask = false
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    mode: 'client',
    fileName: 'google-analytics.js',
    options,
  })
}
