# Supabase Forgot Password Flow

This document outlines the typical forgot password flow when using Supabase with a Nuxt 3 application.

## Overview

1. User clicks "Forgot Password" on login form
2. User enters email on forgot password page
3. Application sends reset password email via Supabase
4. User clicks reset link in email
5. User lands on reset password page
6. User enters new password
7. Application updates password via Supabase
8. User is redirected to login or automatically authenticated

## Detailed Flow

### 1. Forgot Password Link

- Add a "Forgot Password" link to your login form
- Link should navigate to a dedicated forgot password page

### 2. Forgot Password Page

- Create a new page component (e.g., `pages/forgot-password.vue`)
- Include a form with an email input field

### 3. Sending Reset Email

- Use Supabase's `auth.resetPasswordForEmail()` method
- Example:

```javascript
try {
  await supabase.auth.resetPasswordForEmail(email)
  // Show success message
} catch (error) {
  // Handle error
}
```

### 4. Reset Password Link

- Supabase sends an email with a password reset link
- Link includes a special token in the URL

### 5. Reset Password Page

- Create a new page component (e.g., `pages/reset-password.vue`)
- This page should be accessible without full authentication
- Extract the token from the URL

### 6. New Password Form

- Include a form with fields for the new password (and confirmation)
- Implement client-side validation for password strength, match, etc.

### 7. Updating Password

- Use Supabase's `auth.updateUser()` method with the token
- Example:

```javascript
try {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  if (error) throw error
  // Password updated successfully
} catch (error) {
  // Handle error
}
```

### 8. Completion

- After successful password reset, either:
  - Automatically log the user in, or
  - Redirect to the login page with a success message

## Implementation Steps

1. Create `pages/forgot-password.vue`
2. Create `pages/reset-password.vue`
3. Implement Supabase auth methods in your Nuxt app
4. Add error handling and success messages
5. Test the flow thoroughly

## Security Considerations

- Ensure reset tokens have a short expiration time
- Implement rate limiting on password reset requests
- Use HTTPS for all authentication-related requests
- Follow best practices for password strength and storage

Remember to consult the official Supabase documentation for the most up-to-date API methods and best practices.