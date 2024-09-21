import { defineStore } from 'pinia'
import { User } from '@supabase/supabase-js'

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
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
})