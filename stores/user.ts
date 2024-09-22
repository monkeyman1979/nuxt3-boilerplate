import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
    logout() {
      // TODO: Implement actual logout logic (e.g., clear token from localStorage, call API)
      this.clearUser()
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
})