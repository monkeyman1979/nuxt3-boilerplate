<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
    <div v-if="!userStore.fetchAttempted">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="userStore.isAuthenticated">
      <p>You are now authenticated. This is your personal dashboard.</p>
      <p>Email: {{ userStore.user?.email }}</p>
      <!-- Add more user information as needed -->
    </div>
    <div v-else>
      <p>You are not authenticated. Redirecting to login...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const error = ref('')

watch(() => userStore.isAuthenticated, (isAuthenticated) => {
  if (!isAuthenticated && userStore.fetchAttempted) {
    router.push('/login')
  }
}, { immediate: true })

// Handle any errors that might occur during the authentication process
watch(() => userStore.user, (user) => {
  if (user === null && userStore.fetchAttempted) {
    error.value = 'Failed to fetch user data. Please try logging in again.'
  } else {
    error.value = ''
  }
})
</script>