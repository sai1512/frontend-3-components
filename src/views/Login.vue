<template>
  <section class="login-view">
    <LoginForm @login="handleLogin" />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </section>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import { useAuthStore } from '../stores/auth'

export default {
  components: {
    LoginForm
  },

  data() {
    return {
      errorMessage: ''
    }
  },

  methods: {
    async handleLogin(credentials) {
      const authStore = useAuthStore()
      const success = await authStore.login(credentials.username, credentials.password)

      if (success) {
        this.errorMessage = ''
        this.$router.push('/')
      } else {
        this.errorMessage = 'Invalid username or password.'
      }
    }
  }
}
</script>

<style scoped>
.login-view {
  max-width: 420px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
}

.error-message {
  margin-top: 12px;
  color: #dc2626;
  font-size: 14px;
}
</style>
