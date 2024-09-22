<template>
  <div>
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">My App</NuxtLink>
        <div>
          <NuxtLink v-if="!userStore.isAuthenticated" to="/login?mode=login" class="mr-4">Login</NuxtLink>
          <NuxtLink v-if="!userStore.isAuthenticated" to="/login?mode=signup" class="mr-4">Sign up</NuxtLink>
          <button v-else @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Log out</button>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  navigateTo('/login')
}
</script>