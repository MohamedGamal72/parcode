require('dotenv').config({ path: '../.env' })
// get .env variables
const ifDev = process.env.APP_ENV === 'dev'

let proxies = {};
for (let i = 0; i < 800; i++) {
  let title = `/ar/${i}/api`;
  proxies[title] = { target: ifDev ? 'http://localhost:8000' : '/' };
}

export default {
  mode: 'spa',
  // buildDir: 'build', // .nuxt folder with all files
  dev: process.env.NODE_ENV !== 'production',
  env: {
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    COMPANY_ID: process.env.COMPANY_ID
  },
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'googlebot', content: 'noindex' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        mobileAppIOS: true,
      },
      { name: 'HandheldFriendly', content: 'true' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },

      // 'https://fonts.googleapis.com/earlyaccess/droidarabicnaskh.css',
      // 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
      // 'https://fonts.googleapis.com/earlyaccess/notokufiarabic.css'

      // { rel: 'manifest', href: '' }
      // يمكن احتاجن لتظبيط الايقونات على ايفون
      // { rel: "apple-touch-startup-image", href: "launch-1125x2436.png", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" },
      // { rel: "apple-touch-startup-image", href: "launch-750x1334.png", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" },
      // { rel: "apple-touch-startup-image", href: "launch-1242x2208.png", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" },
      // { rel: "apple-touch-startup-image", href: "launch-640x1136.png", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/loading.vue',
  /*
   ** Global CSS
   */
  css: [{ src: '@/assets/scss/app.scss' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/sw', ssr: false }, //
    // { src: '~/plugins/vuex-persist', ssr: false }, // مهم تفعيل التخزين التلقائي للستايت
    { src: '~/plugins/vuetify', ssr: false },
    { src: '~/plugins/global-functions', ssr: false },
    { src: '~/plugins/import', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/tiptap', ssr: false },
    { src: '~/plugins/chartist', ssr: false },
    { src: '~/plugins/google-analytics.js', ssr: false },
    { src: '~/store/api/index.js', ssr: false },
    { src: '~/plugins/lodash.js', ssr: false },
   // { src: '~/plugins/datatable.js', ssr: false },
  ],
  icon: {
    // Icon options
    // iconSrc : '[srcDir]/[staticDir]/icon.png',
    sizes: [64, 120, 144, 152, 192, 384, 512],
    targetDir: 'icons',
  },
  manifest: {
    name: process.env.COMPANY_NAME,
    lang: 'ar',
    short_name: process.env.COMPANY_NAME,
    background_color: '#fafafa',
    start_url: '/ar/security/login?standalone=true',
    scope: '/',
    display: 'standalone', // standalone, browser
    prefer_related_applications: true,
    related_applications: [
      {
        platform: 'play',
        id: 'money.transfer.test',
      },
    ],
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/google-analytics',
    // '@nuxtjs/recaptcha',
    ['nuxt-i18n', {
      locales: [
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        },
        {
          name: 'arabic',
          code: 'ar',
          iso: 'ar-AR',
          file: 'ar-AR.js'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ar'
    }],
  ],
  // recaptcha: {
  //   siteKey: process.env.recaptchaSiteKey,
  //   hideBadge: true,
  //   version: 3,
  // },
  // proxy: proxies,
  workbox: {
    // Workbox options
    // offline : true
    offlinePage: '/index.html',
    // runtimeCaching: [
    //   {
    //     urlPattern: 'https://my-cdn.com/posts/.*',
    //     strategyOptions: {
    //       cacheName: 'our-cache',
    //       cacheExpiration: {
    //         maxEntries: 10,
    //         maxAgeSeconds: 300
    //       }
    //     }
    //   }
    // ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // متغير يتم تعريفه في البرنامج
    // baseURL: process.env.APP_ENV === 'prod' ? '/' : process.env.MAILER_URL , // development
    // proxyHeaders: false,
    // credentials: false,
    // crossDomain: false
  },
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    optionsPath: './plugins/vuetify.js',
    treeShake: true,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // vendor: [
    //     'vue-awesome-notifications'
    // ],
    // publicPath: 'files/', // اسم المجلد الذي ستخذن به الموارد
    extend (config, ctx) {},
  },
  generate: {
    dir: '../public', // أسم المجلد المرات استخراج الملفات به
    // publicPath: '/build/',
    // outputPath: '/build/',
    // buildDir: 'public/'
  },
  router: {
    base: '/', // تغير رابط مكان الموارد
    middleware: ['auth'],
  },
  ignoreOptions: {
    ignorecase: false
  }
}
