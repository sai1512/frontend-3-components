<template>
  <section class="not-found-view">
    <h2>404 - Page Not Found</h2>
    <p>The page you requested does not exist.</p>
    <router-link class="back-link" to="/">Go to Dashboard</router-link>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.not-found-view {
  max-width: 560px;
  margin: 40px auto;
  padding: 22px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  text-align: center;
}

h2 {
  margin-bottom: 10px;
  color: #0f172a;
}

p {
  margin-bottom: 16px;
  color: #475569;
}

.back-link {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  background: #007bff;
  color: #ffffff;
}

.back-link:hover {
  background: #0056b3;
}
</style>