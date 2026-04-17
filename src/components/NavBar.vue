<template>
  <!-- TODO: build the nav bar -->
  <!-- Show the app title -->
  <!-- When logged in: show username and a logout button -->
  <!-- The logout button should emit 'logout' when clicked -->
  <header>
    <nav>
      <h1>Student Dashboard</h1>
      <!-- TODO: logged-in section here -->
      <div v-if="isLoggedIn">
        <span>Welcome, {{ username }}!</span>
        <button class="logout-button" @click="$emit('logout')">Logout</button>
      </div>

    </nav>
  </header>
</template>

<script>
export default {
  props: {
    // TODO: define props for username (String) and isLoggedIn (Boolean)
    username: String,
    isLoggedIn: Boolean
  },

  emits: ['logout']
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

/* TODO: add styles for the username display and logout button */
</style>
