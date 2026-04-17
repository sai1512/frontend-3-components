<template>
  <section>
    <h2>Login</h2>
    <!-- TODO: show error message if loginError is not empty -->
    <!-- TODO: form with @submit.prevent that calls submit() -->
    <!-- TODO: v-model inputs for username and password -->
    <!-- TODO: submit button -->
    <p v-if="loginError" class="error">{{ loginError }}</p>
    <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="Username" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
  </section>
</template>

<script>
export default {
  emits: ['login'],

  data() {
    return {
      // TODO: local form state — username, password, loginError
      username: '',
      password: '',
      loginError: ''
    }
  },

  methods: {
    // TODO: submit()
    // Emit 'login' with { username: this.username, password: this.password }
    // The parent (App.vue) handles the actual API call
    handleLogin() {
      this.$emit('login', { username: this.username, password: this.password });
    }
  }
}
</script>

<style scoped>
/* TODO: style the form, inputs, button, error message */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
}

</style>
