// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@vueuse/nuxt'
  ],
  supabase: {
    // Add a conditional check here
    url: process.env.SUPABASE_URL || 'https://example.supabase.co',
    key: process.env.SUPABASE_KEY || 'example-key',
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || 'https://example.supabase.co',
      supabaseKey: process.env.SUPABASE_KEY || 'example-key',
    }
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})