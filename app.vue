<template>
  <div>
    <nav class="bg-gray-800 text-white p-4">
      <ul class="flex items-center space-x-4">
        <li><NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink></li>
        <li class="ml-auto">
          <NuxtLink :to="{ path: '/login', query: { mode: 'signup' } }" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/login', query: { mode: 'login' } }" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Login
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
