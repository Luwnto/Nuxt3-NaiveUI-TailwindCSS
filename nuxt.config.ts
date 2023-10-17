// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  runtimeConfig: {
    // apiSecret 只能在服务器端上访问
    apiSecret: '',
    // public 命名空间中定义的，在服务器端和客户端都可以普遍访问
    public: { baseURL: process.env.NUXT_PUBLIC_API_BASE }
  },
  devtools: { enabled: false },
  srcDir: 'src/',
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores', 'api']
  },
  app: {
    head: {
      // app.name
      title: 'FeTips - 前端贴士',
      // titleTemplate: '%s - Nuxt 3 Awesome Starter',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=0.3, maximum-scale=1' },
        { name: 'keywords', content: 'FeTips、前端贴士' },
        { name: 'description', content: 'FeTips，前端贴士' }
      ]
      // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production' ?
        ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer'] :
        ['@juggle/resize-observer', 'fsevents']
  },
  vite: {
    plugins: [
      Components({
        // Automatically register all components in the `components` directory
        resolvers: [NaiveUiResolver()]
      })
    ],

    /*
     * ssr: {
     *   noExternal: ['moment', 'naive-ui', '@juggle/resize-observer', '@css-render/vue3-ssr'],
     * },
     */
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development' ?
          ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone'] :
          []
    },
    css: { preprocessorOptions: { scss: { additionalData: '@import "~/assets/styles/main.scss";' } } }
  }
})
