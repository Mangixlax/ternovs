import { Module } from '@nuxt/types'
import { resolve } from 'path'
import { JivositeOptions } from '~/modules/jivosite/types'

/**
 * @TODO Added debug events
 * @TODO Added functional for detect bots and disable Jivosite if bot is detected
 */

const defaultOptions: JivositeOptions = {
  url: '',
  debug: false,
  ignoreBot: false,
}

const JivositeModule: Module<JivositeOptions> = function (
  moduleOptions: JivositeOptions
) {
  const options = {
    ...(defaultOptions || {}),
    ...(moduleOptions || {}),
    ...(this.options.jivosite || {}),
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.ts'),
    mode: 'client',
    options,
  })
}

export default JivositeModule
