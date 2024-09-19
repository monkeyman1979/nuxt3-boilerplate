import { loadStripe } from '@stripe/stripe-js'

export default defineNuxtPlugin(async () => {
  const stripe = await loadStripe('your_publishable_key')
  return {
    provide: {
      stripe
    }
  }
})