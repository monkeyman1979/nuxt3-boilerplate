<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="isCheckingToken" class="text-center">
          <p>Verifying reset token...</p>
        </div>
        <Form v-else-if="isValidResetState" :validation-schema="schema" v-slot="{ errors }" @submit="handleResetPassword">
          <FormField name="password" v-slot="{ field }">
            <FormItem class="mb-4">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="password"
                  placeholder="Enter your new password"
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
          <p class="text-red-600">Invalid or expired reset token. Please request a new password reset.</p>
          <Button @click="goToLogin" class="mt-4">Go to Login</Button>
        </div>
        <div v-if="message" :class="['mt-4 p-2 rounded', messageClass]">
          {{ message }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form } from 'vee-validate'
import type { SubmissionHandler } from 'vee-validate'
import * as yup from 'yup'
import { useSupabaseClient, useRouter, useRoute } from '#imports'

const isLoading = ref(false)
const isCheckingToken = ref(true)
const isValidResetState = ref(false)
const message = ref('')
const messageType = ref('')
const resetToken = ref('')

const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()

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

onMounted(async () => {
  try {
    // Extract the reset token from the URL
    const token = route.query.token as string
    if (!token) {
      throw new Error('No reset token provided')
    }
    resetToken.value = token

    // Verify the reset token
    const { error } = await supabase.auth.verifyOtp({ token, type: 'recovery', email: '' })
    if (error) throw error

    isValidResetState.value = true
  } catch (error) {
    console.error('Error verifying reset token:', error)
    isValidResetState.value = false
  } finally {
    isCheckingToken.value = false
  }
})

const handleResetPassword: SubmissionHandler = async (values) => {
  isLoading.value = true
  message.value = ''

  try {
    const { password } = values as ResetPasswordForm
    const { error } = await supabase.auth.updateUser({ 
      password: password
    })

    if (error) throw error

    message.value = 'Password reset successful. Redirecting to login page...'
    messageType.value = 'success'

    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error: any) {
    console.error('Error in handleResetPassword:', error)
    message.value = `Error: ${error.message || 'An unexpected error occurred'}`
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>