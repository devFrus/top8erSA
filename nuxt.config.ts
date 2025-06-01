// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['nuxt-svgo', '@nuxtjs/device'],
  app: {
    head: {
      title: 'Top8SA',
      viewport: 'width=1024',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },]
    }
  }
})