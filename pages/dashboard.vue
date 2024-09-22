<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
    <p>You are now authenticated. This is your personal dashboard.</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// Redirect if not authenticated
if (!userStore.isAuthenticated) {
  navigateTo('/login')
}
</script>