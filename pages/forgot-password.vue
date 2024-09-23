<template>
  <div class="container mx-auto px-4 py-8">
    <Card class="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form :validation-schema="schema" v-slot="{ errors }" @submit="handleSubmit">
          <FormField name="email" v-slot="{ field }">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input v-bind="field" type="email" placeholder="Enter your email" />
              </FormControl>
              <FormMessage>{{ errors.email }}</FormMessage>
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full mt-4" :disabled="isLoading">
            {{ isLoading ? 'Sending Reset Email...' : 'Send Reset Email' }}
          </Button>
        </Form>
        <div v-if="message" :class="['mt-4 p-2 rounded', messageClass]">
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

const handleSubmit: SubmissionHandler = async (values) => {
  isLoading.value = true
  message.value = ''
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email as string, {
      redirectTo: `${config.public.supabaseUrl}/auth/v1/verify?redirect_to=${window.location.origin}/reset-password`,
    })
    if (error) throw error
    messageType.value = 'success'
    message.value = 'Password reset email sent. Please check your inbox.'
  } catch (error: any) {
    console.error('Error sending reset email:', error)
    messageType.value = 'error'
    message.value = `Error: ${error.message || 'An unexpected error occurred'}`
  } finally {
    isLoading.value = false
  }
}
</script>