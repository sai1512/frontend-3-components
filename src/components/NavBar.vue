<template>
  <header>
    <nav>
      <h1>Student Dashboard</h1>

      <div v-if="authStore.isLoggedIn" class="nav-links">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/courses">Courses</router-link>
      </div>

      <div v-if="authStore.isLoggedIn" class="user-actions">
        <span>Welcome, {{ authStore.username }}!</span>
        <button class="logout-button" @click="handleLogout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  },

  methods: {
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
header {
  background-color: #007bff;
}

nav {
  max-width: 900px;
  margin: 0 auto;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav h1 {
  color: #e2e8f0;
  font-size: 20px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #dbeafe;
  text-decoration: none;
  font-weight: 600;
}

.nav-links a.router-link-active {
  color: #ffffff;
  text-decoration: underline;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #eff6ff;
}

.logout-button {
    background-color: #ffffff;
    color: #2f4f74;
    border: none;
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
}

.logout-button:hover {
    background-color: #e8f0fb;
}
</style>
