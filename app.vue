<template>
  <div>
    <nav class="bg-gray-800 text-white p-4">
      <ul class="flex space-x-4">
        <li><NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink></li>
        <li><NuxtLink to="/signup" class="hover:text-gray-300">Sign Up</NuxtLink></li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
