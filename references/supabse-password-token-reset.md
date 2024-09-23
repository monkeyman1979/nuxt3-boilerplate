# Supabase Password Reset Instructions for Nuxt 3

This guide will walk you through implementing and troubleshooting the password reset functionality using Supabase in a Nuxt 3 project.

## Setup

1. Ensure your Nuxt 3 project is set up with Supabase integration.

2. Verify your `.env` file contains the correct Supabase credentials:

   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

3. In your Supabase project settings, enable the password reset functionality and set the reset password URL to point to your application's reset password page (e.g., `https://yourdomain.com/reset-password`).

## Implementation

### 1. Create a Reset Password Page

Create a new file `pages/reset-password.vue` with the following content:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabaseClient } from '#imports'

const route = useRoute()
const supabase = useSupabaseClient()
const newPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const resetToken = ref('')

onMounted(() => {
  resetToken.value = route.query.token
  if (!resetToken.value) {
    errorMessage.value = 'No reset token provided. Please check your reset password link.'
  }
})

async function resetPassword() {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value
    }, {
      auth: {
        accessToken: resetToken.value,
      }
    })

    if (error) throw error
    successMessage.value = 'Password reset successful. You can now log in with your new password.'
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div>
    <h1>Reset Password</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <form @submit.prevent="resetPassword" v-if="!successMessage">
      <input v-model="newPassword" type="password" placeholder="New Password" required>
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>
```

### 2. Implement Password Reset Request

In your login or forgot password page, add a function to request a password reset:

```vue
<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const email = ref('')
const message = ref('')

async function requestPasswordReset() {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'https://yourdomain.com/reset-password',
    })
    if (error) throw error
    message.value = 'Check your email for the password reset link.'
  } catch (error) {
    message.value = error.message
  }
}
</script>

<template>
  <form @submit.prevent="requestPasswordReset">
    <input v-model="email" type="email" placeholder="Your email" required>
    <button type="submit">Request Password Reset</button>
  </form>
  <p>{{ message }}</p>
</template>
```

## Troubleshooting

If you encounter the "No reset token provided" error:

1. **Check the URL**: Ensure the reset password email link includes the token as a query parameter:
   ```
   https://yourdomain.com/reset-password?token=RESET_TOKEN_HERE
   ```

2. **Verify Supabase Settings**: In your Supabase project:
   - Confirm the password reset functionality is enabled.
   - Check that the reset password URL is correctly set.

3. **Email Template**: If using a custom email template in Supabase, ensure it includes the `{{ .ConfirmationURL }}` variable.

4. **Debug Token Capture**: In the `reset-password.vue` file, add a console log to check the captured token:
   ```javascript
   onMounted(() => {
     console.log('Route query:', route.query)
     resetToken.value = route.query.token
     // ... rest of the code
   })
   ```

5. **Check Supabase Integration**: Verify that your Nuxt application is correctly integrated with Supabase. You can test this by attempting other Supabase operations.

6. **Token Expiration**: Supabase reset tokens typically expire after 24 hours. Ensure you're using the link within this timeframe.

If issues persist, review your Supabase project settings and confirm your application's authentication flow is correctly set up.

## Best Practices

- Always handle errors gracefully and provide clear feedback to users.
- Use environment variables for Supabase credentials.
- Implement proper validation for the new password (e.g., minimum length, complexity).
- Consider adding a password confirmation field to prevent typos.
- Use HTTPS for all authentication-related requests.

By following these instructions and best practices, you should be able to implement a robust password reset functionality in your Nuxt 3 application using Supabase.