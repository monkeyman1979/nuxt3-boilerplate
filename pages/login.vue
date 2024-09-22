<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
      <LoginForm v-if="showLogin" @toggle-form="toggleForm" @login-success="onAuthSuccess" />
      <AccountCreationForm v-else @toggle-form="toggleForm" @signup-success="onAuthSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import AccountCreationForm from '@/components/AccountCreationForm.vue'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const showLogin = ref(true)
const error = ref('')

const updateFormBasedOnRoute = () => {
  const mode = route.query.mode
  if (mode === 'signup') {
    showLogin.value = false
  } else if (mode === 'login') {
    showLogin.value = true
  }
}

onMounted(() => {
  updateFormBasedOnRoute()
})

watch(() => userStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated && userStore.fetchAttempted) {
    router.push('/dashboard')
  }
}, { immediate: true })

watch(() => route.query.mode, () => {
  updateFormBasedOnRoute()
})

const toggleForm = () => {
  showLogin.value = !showLogin.value
  error.value = '' // Clear any existing errors when toggling forms
}

const onAuthSuccess = () => {
  userStore.fetchUser() // Refresh user data after successful login/signup
}

// Handle authentication errors
watch(() => userStore.user, (user) => {
  if (user === null && userStore.fetchAttempted) {
    error.value = 'Authentication failed. Please try again.'
  } else {
    error.value = ''
  }
})
</script>