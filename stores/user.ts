import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { useSupabaseClient } from '#imports'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    fetchAttempted: false,
  }),
  actions: {
    async fetchUser() {
      const supabase = useSupabaseClient()
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          if (error.name === 'AuthSessionMissingError') {
            console.log('No active session')
          } else {
            console.error('Error fetching user:', error)
          }
          this.clearUser()
        } else {
          this.setUser(data.user)
        }
      } catch (e) {
        console.error('Unexpected error:', e)
        this.clearUser()
      } finally {
        this.fetchAttempted = true
      }
    },
    setUser(user: User | null) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
    async logout() {
      const supabase = useSupabaseClient()
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error during logout:', error)
      }
      this.clearUser()
    },
  },
  getters: {
    isAuthenticated: (state) => state.fetchAttempted && !!state.user,
  },
})