<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form v-if="hasResetToken" :validation-schema="schema" v-slot="{ errors }" @submit="handleResetPassword">
          <FormField name="password" v-slot="{ field }">
            <FormItem class="mb-4">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="password"
                  placeholder="Enter your new password"
                  autocomplete="new-password"
                />
              </FormControl>
              <FormMessage>{{ errors.password }}</FormMessage>
            </FormItem>
          </FormField>
          <FormField name="confirmPassword" v-slot="{ field }">
            <FormItem class="mb-4">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="password"
                  placeholder="Confirm your new password"
                  autocomplete="new-password"
                />
              </FormControl>
              <FormMessage>{{ errors.confirmPassword }}</FormMessage>
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full mt-6" :disabled="isLoading">
            {{ isLoading ? 'Resetting Password...' : 'Reset Password' }}
          </Button>
        </Form>
        <div v-else class="text-center">
          <p class="text-red-600">No reset token provided. Please request a new password reset.</p>
          <Button @click="goToForgotPassword" class="mt-4">Request New Password Reset</Button>
          <Button @click="goToLogin" class="mt-2">Go to Login</Button>
        </div>
        <div v-if="message" :class="['mt-4 p-2 rounded', messageClass]">
          {{ message }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form } from 'vee-validate'
import type { SubmissionHandler } from 'vee-validate'
import * as yup from 'yup'
import { useSupabaseClient, useRouter, useRoute } from '#imports'

const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()

const hasResetToken = computed(() => !!route.query.code)

const messageClass = computed(() => {
  return messageType.value === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  password: yup.string().required('New password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
})

const handleResetPassword: SubmissionHandler = async (values) => {
  isLoading.value = true
  message.value = ''

  try {
    const { password } = values as ResetPasswordForm
    console.log('Resetting password...')
    
    const { error } = await supabase.auth.updateUser({ 
      password: password,
    })

    if (error) throw error

    console.log('Password reset successful')
    message.value = 'Password reset successful. You can now log in with your new password.'
    messageType.value = 'success'

    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error: any) {
    console.error('Error resetting password:', error)
    message.value = `Error: ${error.message || 'An unexpected error occurred'}`
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToForgotPassword = () => {
  router.push('/forgot-password')
}
</script>