<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Sign in to your account</CardDescription>
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
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </Button>
      </Form>
      <div v-if="message" :class="['mt-4 p-2 rounded', messageClass]">
        {{ message }}
      </div>
      <div class="mt-4 text-center">
        <a href="#" @click.prevent="$emit('toggleForm')" class="text-blue-600 hover:underline">Don't have an account? Sign up</a>
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

const emit = defineEmits(['toggleForm', 'login-success'])

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
  password: yup.string().required('Password is required'),
})

const handleSubmit = async (values: GenericObject, { resetForm }: { resetForm: () => void }) => {
  const email = values.email as string
  const password = values.password as string

  isLoading.value = true
  message.value = ''
  try {
    console.log('Attempting to sign in with email:', email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    if (data.user) {
      console.log('Sign in successful.')
      messageType.value = 'success'
      message.value = 'Sign in successful! Redirecting to dashboard...'
      resetForm()
      emit('login-success')
    } else {
      throw new Error('User data is undefined after sign in')
    }
  } catch (error: any) {
    console.error('Error in handleSubmit:', error)
    messageType.value = 'error'
    if (error.message === 'Invalid login credentials') {
      message.value = 'Invalid email or password. Please try again.'
    } else {
      message.value = `Error: ${error.message || 'An unexpected error occurred'}`
    }
  } finally {
    isLoading.value = false
  }
}
</script>