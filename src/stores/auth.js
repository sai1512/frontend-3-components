import { defineStore } from 'pinia'

const API_URL = 'http://localhost:8000/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    username: localStorage.getItem('username') || ''
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async login(username, password) {
      try {
        const response = await fetch(`${API_URL}/token/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        if (!response.ok) {
          return false
        }

        const data = await response.json()
        this.token = data.access || ''
        this.username = username

        localStorage.setItem('access_token', this.token)
        localStorage.setItem('username', this.username)

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    logout() {
      this.token = ''
      this.username = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
    }
  }
})
