<template>
  <div class="container mx-auto px-4 py-8">
    <Card class="max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-4 p-4 rounded bg-yellow-100 text-yellow-800">
          Warning: You are about to reset your password. This action cannot be undone.
        </div>
        <Form :validation-schema="schema" @submit="handleSubmit">
          <FormField name="email" v-slot="{ field, errors }">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  v-bind="field" 
                  type="email" 
                  placeholder="Enter your email" 
                  class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage>{{ getErrorMessage(errors, 'email') }}</FormMessage>
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full mt-4 bg-[#1e293b] text-white hover:bg-[#2d3748]" :disabled="isLoading">
            {{ isLoading ? 'Sending Reset Email...' : 'Send Reset Email' }}
          </Button>
        </Form>
        <div v-if="message" :class="['mt-4 p-4 rounded text-sm', messageClass]">
          {{ message }}
        </div>
        <div class="mt-6 text-center">
          <NuxtLink to="/login" class="text-blue-600 hover:underline">Back to Login</NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSupabaseClient, useRuntimeConfig } from '#imports'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form } from 'vee-validate'
import type { SubmissionHandler } from 'vee-validate'
import * as yup from 'yup'

const supabase = useSupabaseClient()
const config = useRuntimeConfig()

const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const messageClass = computed(() => {
  return messageType.value === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
})

const getErrorMessage = (errors: unknown, field: string): string => {
  if (typeof errors === 'object' && errors !== null && field in errors) {
    const fieldErrors = errors[field as keyof typeof errors]
    return Array.isArray(fieldErrors) ? fieldErrors[0] : String(fieldErrors)
  }
  return ''
}

const handleSubmit: SubmissionHandler = async (values, { resetForm }) => {
  isLoading.value = true
  message.value = ''
  try {
    const email = values.email as string
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    if (error) throw error
    
    messageType.value = 'success'
    message.value = 'Password reset email sent. Please check your inbox.'
    resetForm()
  } catch (error: any) {
    messageType.value = 'error'
    message.value = `Error: ${error.message || 'An unexpected error occurred'}`
  } finally {
    isLoading.value = false
  }
}
</script>