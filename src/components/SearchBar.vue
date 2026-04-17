<template>
  <!-- TODO: an input with v-model that emits the search term when it changes -->
  <!-- Hint: use @input="$emit('search', searchTerm)" -->
  <div class="search-bar">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search students..."
      @input="$emit('search', searchTerm)"
    />
  </div>

</template>

<script>
export default {
  emits: ['search'],

  data() {
    return {
      // TODO: local searchTerm
      searchTerm: ''
    }
  }
}
</script>

<style scoped>
/* TODO: style the search input */
.search-bar input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.search-bar input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
