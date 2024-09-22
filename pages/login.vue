<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
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
  if (userStore.isAuthenticated) {
    router.push('/dashboard')
  }
})

watch(() => route.query.mode, () => {
  updateFormBasedOnRoute()
})

const toggleForm = () => {
  showLogin.value = !showLogin.value
}

const onAuthSuccess = () => {
  router.push('/dashboard')
}
</script>