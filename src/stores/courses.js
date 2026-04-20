import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

const API_URL = 'http://localhost:8000/api'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    isLoading: false
  }),

  actions: {
    async loadCourses() {
      const authStore = useAuthStore()
      this.isLoading = true

      try {
        const response = await fetch(`${API_URL}/courses/`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to load courses')
        }

        const data = await response.json()
        this.courses = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : [])
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
