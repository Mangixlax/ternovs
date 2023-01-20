import { Middleware } from '@nuxt/types'

const RobotsDetectorMiddleware: Middleware = ({ app, store, isHMR, req }) => {
  if (isHMR) {
    // Ignore if script retrieved from HMR
    return
  }

  if (process.server) {
    if (req.headers !== undefined) {
      if (Object.keys(req.headers).includes('user-agent')) {
        const userAgent = req.headers['user-agent']
        const userAgentLowerCase = String(userAgent).toLowerCase()

        let botDetected = false

        const botNames = ['lighthouse', 'gtmetrix', 'bot', 'yslow', 'pagespeed']

        botNames.forEach((name) => {
          if (userAgentLowerCase.includes(name)) {
            botDetected = true
          }
        })

        store.state.isBot = botDetected

        if (botDetected) {
          // @ts-ignore
          app.head.script = []
          // @ts-ignore
          app.head.link = []
          // @ts-ignore
          app.head.htmlAttrs = Object.assign({}, app.head.htmlAttrs, {
            bot: 'true',
          })
        }
      }
    }
  }
}

export default RobotsDetectorMiddleware
