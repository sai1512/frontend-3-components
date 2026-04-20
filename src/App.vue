<template>
  <div class="app">
    <NavBar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
}

@media (max-width: 640px) {
  main {
    padding: 20px;
  }
}
</style>
