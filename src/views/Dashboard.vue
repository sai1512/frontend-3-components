<template>
  <section>
    <h2>Student Dashboard</h2>

    <SearchBar @search="studentsStore.searchTerm = $event" />

    <div class="actions-row">
      <button type="button" class="toggle-button" @click="showAddForm = !showAddForm">
        {{ showAddForm ? 'Hide Add Student Form' : 'Add New Student' }}
      </button>
    </div>

    <div v-if="showAddForm" class="form-panel">
      <AddStudentForm :courses="coursesStore.courses" @student-added="handleStudentAdded" />
    </div>

    <div v-if="studentsStore.isLoading" class="state-message">Loading students...</div>
    <div v-else-if="studentsStore.filteredStudents.length === 0" class="state-message">No students found.</div>
    <div v-else class="card-grid">
      <StudentCard
        v-for="student in studentsStore.filteredStudents"
        :key="student.id"
        :student="student"
        @delete="handleDelete"
        @update="handleUpdateStudent"
        @view="goToStudent"
      />
    </div>
  </section>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import AddStudentForm from '../components/AddStudentForm.vue'
import StudentCard from '../components/StudentCard.vue'
import { useStudentsStore } from '../stores/students'
import { useCoursesStore } from '../stores/courses'

export default {
  components: {
    SearchBar,
    AddStudentForm,
    StudentCard
  },

  data() {
    return {
      studentsStore: useStudentsStore(),
      coursesStore: useCoursesStore(),
      showAddForm: false
    }
  },

  methods: {
    async handleStudentAdded(studentData) {
      await this.studentsStore.addStudent(studentData)
      this.showAddForm = false
    },

    async handleDelete(id) {
      await this.studentsStore.deleteStudent(id)
    },

    async handleUpdateStudent(updatedStudent) {
      await this.studentsStore.updateStudent(updatedStudent.id, updatedStudent)
    },

    goToStudent(id) {
      this.$router.push(`/students/${id}`)
    }
  },

  mounted() {
    this.studentsStore.loadStudents()
    this.coursesStore.loadCourses()
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 16px;
  color: #0f172a;
}

.actions-row {
  margin: 12px 0;
}

.toggle-button {
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: #ffffff;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
}

.toggle-button:hover {
  background: #0056b3;
}

.form-panel {
  margin-bottom: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.state-message {
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #475569;
  background: #f8fafc;
}

/* ═══ Responsive ═══ */
@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .toggle-button {
    width: 100%;
  }

  h2 {
    font-size: 18px;
  }
}
</style>
