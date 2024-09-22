<template>
  <div>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <p class="text-lg font-semibold">Loading...</p>
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await userStore.fetchUser()
  } catch (error) {
    console.error('Error during initial authentication check:', error)
    // You might want to show an error message to the user here
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
/* You can add any global styles here if needed */
</style>
