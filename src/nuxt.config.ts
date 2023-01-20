import webpack from 'webpack'
import { NuxtConfig } from '@nuxt/types'
import { NuxtOptionsRender } from '@nuxt/types/config/render'
import { NuxtOptionsBuild } from '@nuxt/types/config/build'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
import getScopedName from './lib/getScopedName'

const isDev = process.env.NODE_ENV === 'development'
const time = new Date().valueOf()

export default <NuxtConfig>{
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'server',

  /**
   * Nuxt server
   * See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
   */
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    APP_ENV: process.env.APP_ENV,
    CDN_PATH: process.env.CDN_PATH,
    CDN_REALTY_PATH: process.env.CDN_REALTY_PATH,
    API_URL_FIXED: process.env.API_URL_FIXED,
  },

  head: {
    title: 'Ternovs',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8', hid: 'charset' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
        hid: 'http-equiv',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no',
        hid: 'viewport',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
        hid: 'format-detection',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
        hid: 'apple-mobile-web-app-capable',
      },
      {
        name: 'dmca-site-verification',
        content: 'amc2UXZNN2I2VVlPWkI2WEZ3c2QvbGlMQS9TdXhaZWNTcmJ2R3BGS1oybz01',
      },
    ],
    link: [
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      },
    ],
    script: [
      {
        type: 'text/javascript',
        async: true,
        src: 'https://app.avodata.ru/px/pixel.js?token=88008c32371a962d391ce491fb9ab82f',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/scss/theme.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/modal/index.ts', mode: 'client' },
    { src: '~directives/vue-sticky-directive.js', mode: 'client' },
    { src: '~directives/vue-input-autowidth.js', mode: 'client' },
    { src: '~directives/vue-click-outside.ts', mode: 'client' },
    { src: '~plugins/vue-slider-component.js', mode: 'client' },
    { src: '~plugins/vue-form-slider.js', mode: 'client' },
    { src: '~plugins/vue-cool-lightbox', mode: 'client' },
    { src: '~/plugins/yandex-map.js',  mode: 'client' },
    '~plugins/vuelidate',
    '~plugins/slider-swiper',
    '~plugins/jsonld',
    '~plugins/axios',
    '~plugins/vue-fragment',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],

  /**
   * Loading config
   */
  loading: {
    color: '#0066FF',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  styleResources: {
    scss: ['~/scss/_mixins.scss', '~/scss/_colors.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-precompress',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxt/image',
    '@nuxtjs/recaptcha',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache',
    'vue-scrollto/nuxt',
    '~modules/jivosite',
    '~modules/yandex-metrika/index.js',
    '~modules/google-analytics/index.js',
    '@nuxtjs/dayjs',
  ],

  yandexMetrika: {
    id: '88006014',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    debug: isDev,
  },

  googleAnalytics: {
    id: 'UA-128049596-1',
    checkDuplicatedScript: true,
    autoTracking: {
      screenview: true,
      pageviewOnLoad: true,
      page: true,
      transformQueryString: false,
    },
    dev: isDev,
  },

  jivosite: {
    url: process.env.JIVOSITE_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
      name: 'Ternovs',
      short_name: 'Ternovs',
      description: '',
      theme_color: '#0066FF',
      start_url: '/',
      display: 'browser',
      background_color: '#FFF',
    },
    workbox: false,
    icon: {
      sizes: [16, 32, 64, 120, 144, 152, 192, 384, 512],
    },
  },

  render: <NuxtOptionsRender>{
    http2: {
      push: !isDev,
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      },
    },
  },

  router: {
    prefetchLinks: false,
    trailingSlash: true,
  },

  redirect: [
    { from: '^(\\/(?!\\_(ipx|nuxt))[^\\?]*[^\\/])(\\?.*)?$', to: '$1/$2' },
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://nginx:8080',
  },

  svgSprite: {
    publicPath: '/_nuxt/',
  },

  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    version: 2,
  },

  image: {
    dir: 'assets/images',
    domains: [process.env.BASE_URL, process.env.CDN_PATH],
    alias: {
      s1: process.env.BASE_URL,
      s3: [
        process.env.CDN_PATH,
        process.env.APP_ENV,
        process.env.CDN_REALTY_PATH,
        'original',
      ].join('/'),
      st3: [process.env.CDN_PATH, process.env.APP_ENV, 'app/public'].join('/'),
      media: [process.env.CDN_PATH, process.env.APP_ENV, 'media'].join('/'),
    },
  },

  dayjs: {
    locales: ['ru'],
    defaultLocale: 'ru',
    defaultTimeZone: 'Europe/Moscow',
    plugins: ['utc', 'timezone'],
  },

  /*
   ** Build configuration
   ** See https://go.nuxtjs.dev/config-build
   */
  build: <NuxtOptionsBuild>{
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },

    babel: {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },

    publicPath: process.env.PUBLIC_PATH || '/_nuxt/',

    extractCSS: false,

    loaders: {
      cssModules: {
        modules: isDev
          ? {
              localIdentName: '[local]_[hash:hex:8]',
            }
          : {
              // @ts-ignore
              getLocalIdent: (
                context: webpack.loader.LoaderContext,
                localIdentName: string,
                localName: string
              ) => getScopedName(localName, context.resourcePath),
            },
      },
    },

    html: {
      minify: {
        collapseWhitespace: false,
      },
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      },
    },

    filenames: {
      app: ({ isDev }) =>
        isDev ? '[name].js' : 'js/' + time + '.[contenthash].js',
      chunk: ({ isDev }) =>
        isDev ? '[name].js' : 'js/' + time + '.[contenthash].js',
      css: ({ isDev }) =>
        isDev ? '[name].css' : 'css/' + time + '.[contenthash].css',
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/' + time + '.[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev
          ? '[path][name].[ext]'
          : 'fonts/' + time + '.[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev
          ? '[path][name].[ext]'
          : 'videos/' + time + '.[contenthash:7].[ext]',
    },

    cache: true,
  },
}
