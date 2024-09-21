import { defineNuxtPlugin } from '#app'
import { defineRule } from 'vee-validate'
import { required, email, min, max } from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  // Add more rules as needed
})