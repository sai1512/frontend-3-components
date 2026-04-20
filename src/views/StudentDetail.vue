<template>
  <section>
    <button type="button" class="back-button" @click="$router.back()">Back</button>

    <div v-if="isLoading" class="state-message">Loading student...</div>
    <div v-else-if="!student" class="state-message">Student not found.</div>

    <article v-else class="detail-card">
      <h2>{{ student.name }}</h2>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Grade:</strong> {{ student.grade }}</p>
      <p><strong>Course:</strong> {{ courseLabel }}</p>
    </article>
  </section>
</template>

<script>
import { useStudentsStore } from '../stores/students'

export default {
  data() {
    return {
      studentsStore: useStudentsStore(),
      student: null,
      isLoading: false
    }
  },

  computed: {
    courseLabel() {
      if (!this.student) {
        return 'N/A'
      }

      if (typeof this.student.course === 'object' && this.student.course !== null) {
        return this.student.course.name || 'N/A'
      }

      return this.student.course || 'N/A'
    }
  },

  methods: {
    async loadStudent() {
      this.isLoading = true
      const routeId = Number(this.$route.params.id)

      const fromStore = this.studentsStore.students.find((item) => item.id === routeId)
      if (fromStore) {
        this.student = fromStore
        this.isLoading = false
        return
      }

      this.student = await this.studentsStore.loadStudentById(routeId)
      this.isLoading = false
    }
  },

  mounted() {
    this.loadStudent()
  }
}
</script>

<style scoped>
.back-button {
  margin-bottom: 16px;
  border: none;
  border-radius: 8px;
  background: #334155;
  color: #ffffff;
  padding: 10px 14px;
  cursor: pointer;
}

.back-button:hover {
  background: #1e293b;
}

.detail-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  padding: 20px;
}

.detail-card h2 {
  margin-bottom: 10px;
}

.state-message {
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #475569;
  background: #f8fafc;
}
</style>
