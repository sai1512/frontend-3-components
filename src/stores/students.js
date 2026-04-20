import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

const API_URL = 'http://localhost:8000/api'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    isLoading: false,
    searchTerm: ''
  }),

  getters: {
    filteredStudents() {
      if (!this.searchTerm) {
        return this.students
      }

      const term = this.searchTerm.toLowerCase()
      return this.students.filter((student) =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      )
    }
  },

  actions: {
    async loadStudents() {
      const authStore = useAuthStore()
      this.isLoading = true

      try {
        const response = await fetch(`${API_URL}/students/`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        if (response.status === 401) {
            alert("Unauthorized or token expired. Please login again.");
            // redirect to login page by calling the auth store's logout method
            authStore.logout();
        }

        if (!response.ok) {
          throw new Error('Failed to load students')
        }

        const data = await response.json()
        this.students = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : [])
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async addStudent(studentData) {
      const authStore = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/students/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`
          },
          body: JSON.stringify(studentData)
        })

        if (response.status === 401) {
            alert("Unauthorized or token expired. Please login again.");
            // redirect to login page by calling the auth store's logout method
            authStore.logout();
        }

        if (!response.ok) {
          throw new Error('Failed to add student')
        }

        await this.loadStudents()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    async deleteStudent(id) {
      const authStore = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/students/${id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        if (response.status === 401) {
            alert("Unauthorized or token expired. Please login again.");
          
            // redirect to login page by calling the auth store's logout method
            authStore.logout();
        }

        if (!response.ok) {
          throw new Error('Failed to delete student')
        }

        this.students = this.students.filter((student) => student.id !== id)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    async updateStudent(id, updatedStudent) {
      const authStore = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/students/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`
          },
          body: JSON.stringify(updatedStudent)
        })

        if (response.status === 401) {
            alert("Unauthorized or token expired. Please login again.");
            
            // redirect to login page by calling the auth store's logout method
            authStore.logout();
        }

        if (!response.ok) {
          throw new Error('Failed to update student')
        }

        const savedStudent = await response.json()
        this.students = this.students.map((student) =>
          student.id === savedStudent.id ? savedStudent : student
        )

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    async loadStudentById(id) {
      const authStore = useAuthStore()

      try {
        const response = await fetch(`${API_URL}/students/${id}/`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        if (response.status === 401) {
            alert("Unauthorized or token expired. Please login again.");
            
            // redirect to login page by calling the auth store's logout method
            authStore.logout();
        }

        if (!response.ok) {
          return null
        }

        return await response.json()
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }
})
