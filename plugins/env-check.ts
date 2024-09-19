// plugins/env-check.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  if (config.public.supabaseUrl === 'https://example.supabase.co' || 
      config.public.supabaseKey === 'example-key') {
    console.warn('WARNING: You are using placeholder Supabase credentials. Please set up your .env file with actual Supabase URL and key.')
  }
  
  // Add similar checks for other important environment variables
})