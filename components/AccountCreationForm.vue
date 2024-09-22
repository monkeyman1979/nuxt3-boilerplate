<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Create an Account</CardTitle>
      <CardDescription>Sign up for a new account</CardDescription>
    </CardHeader>
    <CardContent>
      <Form :validation-schema="schema" v-slot="{ errors }" @submit="handleSubmit">
        <FormField name="email" v-slot="{ field }">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="email"
                placeholder="Enter your email"
              />
            </FormControl>
            <FormMessage>{{ errors.email }}</FormMessage>
          </FormItem>
        </FormField>
        <FormField name="password" v-slot="{ field }">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="password"
                placeholder="Enter your password"
              />
            </FormControl>
            <FormMessage>{{ errors.password }}</FormMessage>
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full mt-4" :disabled="isLoading">
          {{ isLoading ? 'Signing up...' : 'Sign Up' }}
        </Button>
      </Form>
      <div v-if="message" :class="['mt-4 p-2 rounded', messageClass]">
        {{ message }}
      </div>
      <div class="mt-4 text-center">
        <a href="#" @click.prevent="$emit('toggleForm')" class="text-blue-600 hover:underline">Have an account? Login</a>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form } from 'vee-validate'
import type { GenericObject } from 'vee-validate'
import * as yup from 'yup'
import { useSupabaseClient } from '#imports'

const emit = defineEmits(['toggleForm', 'signup-success'])

const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const userStore = useUserStore()
const supabase = useSupabaseClient()

const messageClass = computed(() => {
  return messageType.value === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
})

const handleSubmit = async (values: GenericObject, { resetForm }: { resetForm: () => void }) => {
  const email = values.email as string
  const password = values.password as string

  isLoading.value = true
  message.value = ''
  try {
    console.log('Attempting to sign up with email:', email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw error
    }

    if (data.user) {
      console.log('Sign up successful.')
      messageType.value = 'success'
      message.value = 'Sign up successful! Please check your email for verification instructions.'
      resetForm()
      emit('signup-success')
    } else {
      throw new Error('User data is undefined after sign up')
    }
  } catch (error: any) {
    console.error('Error in handleSubmit:', error)
    messageType.value = 'error'
    if (error.message.includes('User already registered')) {
      message.value = 'This email is already registered. Please try logging in instead.'
    } else if (error.message.includes('Password should be at least 6 characters')) {
      message.value = 'Password should be at least 6 characters long.'
    } else {
      message.value = `Error: ${error.message || 'An unexpected error occurred'}`
    }
  } finally {
    isLoading.value = false
  }
}
</script>